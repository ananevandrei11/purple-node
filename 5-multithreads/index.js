const path = require("path");
const perf_hooks = require("perf_hooks");
const { Worker } = require("worker_threads");
const { cpus } = require('os');

const mapPerfomance = new Map([['generator', 0], ['remainder', 0], ['mainWithouThreads', 0]]);
const performanceObserver = new perf_hooks.PerformanceObserver(
  (items, observer) => {
    for (const entry of items.getEntries()) {
      if (mapPerfomance.has(entry.name)) {
        const prev = mapPerfomance.get(entry.name);
        mapPerfomance.set(entry.name, prev + entry.duration);
      }
    }
  },
);
performanceObserver.observe({
  entryTypes: ["measure"],
});

function generator({ length, start }) {
  return new Promise((resolve, reject) => {
    performance.mark("generator start");
    const worker = new Worker(path.join(__dirname, "generateArr.js"), {
      workerData: {
        length,
        start,
      },
    });

    worker.on("message", (res) => {
      performance.mark("generator end");
      performance.measure("generator", "generator start", "generator end");
      resolve(res);
    });

    worker.on("error", (err) => {
      reject(err);
    });
  });
}

function remainder(arr) {
  return new Promise((resolve, reject) => {
    performance.mark("remainder start");
    const worker = new Worker(path.join(__dirname, "remainderToThree.js"), {
      workerData: arr,
    });

    worker.on("message", (res) => {
      performance.mark("remainder end");
      performance.measure("remainder", "remainder start", "remainder end");
      resolve(res);
    });

    worker.on("error", (err) => {
      reject(err);
    });
  });
}

function mainWithouThreads(length) {
  performance.mark("mainWithouThreads start");
  const generatedArr = Array.from({ length }, (_, i) => 0 + i);
  const remaindedArr = generatedArr.filter((i) => i % 3 === 0);
  console.log("RESULT WITHOUT THREADS: ", remaindedArr.length);
  performance.mark("mainWithouThreads end");
  performance.measure("mainWithouThreads", "mainWithouThreads start", "mainWithouThreads end");
}

const threadesSize = cpus().length;
async function main(length) {
  try {
    const partsOfArray = [];
    const partsLength = Math.floor(length / threadesSize);
    const partsOfRemains = length % threadesSize;
    for (let i = 0; i < threadesSize; i += 1) {
      partsOfArray.push({
        length:
          i + 1 === threadesSize ? partsLength + partsOfRemains : partsLength,
        start: partsLength * i,
      });
    }
    const arrays = await Promise.all(partsOfArray.map((i) => generator(i)));
    const arraysRemainders = await Promise.all(arrays.map((i) => remainder(i)));
    const result = arraysRemainders.reduce((acc, i) => (acc += i.length), 0);
    console.log("RESULT: ", result);
  } catch (error) {
    console.log("WoW Error", error);
  } finally {
    console.log(mapPerfomance);
    setImmediate(() => performanceObserver.disconnect());
  }
}

mainWithouThreads(300000);
main(300000);
