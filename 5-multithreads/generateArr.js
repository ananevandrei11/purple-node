const { parentPort, workerData } = require("worker_threads");

function generatedArr({ length, start }) {
  const generatedArr = Array.from({ length }, (_, i) => start + i);
  return generatedArr;
}

parentPort.postMessage(generatedArr(workerData));
