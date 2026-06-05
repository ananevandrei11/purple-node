const path = require("path");
const perf_hooks = require("perf_hooks");
const { Worker } = require("worker_threads");

const performanceObserver = new perf_hooks.PerformanceObserver(
  (items, observer) => {
    for (const entry of items.getEntries()) {
      console.log(entry.name, entry.duration);
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

const threadesSize = 4;
async function main(length) {
  try {
    const partsOfArray = [];
    const partsLength = Math.floor(length / 4);
    const partsOfRemains = length % 2;
    for (let i = 0; i < threadesSize; i += 1) {
      partsOfArray.push({
        length: i+1 === threadesSize ? partsLength + partsOfRemains : partsLength,
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
    setImmediate(() => performanceObserver.disconnect());
  }
}

main(300000);
