const { parentPort, workerData } = require('worker_threads');

function remainderToThree(arr) {
  const remaindedArr = arr.filter(i => i % 3 === 0);
  return remaindedArr;
}

parentPort.postMessage(remainderToThree(workerData));