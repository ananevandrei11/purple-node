const EventEmmiter = require("events");
const myEventEmmiter = new EventEmmiter();

let seconds = "";
let minutes = "";
let hours = "";
const args = process.argv.slice(2);

function parseArg(timeArgs) {
  let time = 0;
  for (let i = 0; i < timeArgs.length; i += 1) {
    const timeFromArgs = timeArgs[i].slice(0, timeArgs[i].length - 1);
    if (timeArgs[i].includes("h")) {
      time += timeFromArgs * 60 * 60 * 1000;
    } else if (timeArgs[i].includes("m")) {
      time += timeFromArgs * 60 * 1000;
    } else if (timeArgs[i].includes("s")) {
      time += timeFromArgs * 1000;
    }
  }
  return time;
}
const timerSize = parseArg(args);

myEventEmmiter.on("end", () => console.log("Timer is finished"));

if (timerSize > 0) {
  const timerId = setTimeout(() => {
    myEventEmmiter.emit('end');
    clearTimeout(timerId);
  }, timerSize);
}
