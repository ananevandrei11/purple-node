const EventEmmiter = require("events");
const { add } = require("./add");
const { subtraction } = require("./subtraction");
const { division } = require("./division");
const { multiply } = require("./multiply");

const myEventEmmiter = new EventEmmiter();

let nodePath = process.argv[0];
let appPath = process.argv[1];
let firstNum = process.argv[2];
let secondNum = process.argv[3];
let operation = process.argv[4];

myEventEmmiter.addListener('result', (res) => console.log(res));

myEventEmmiter.addListener("add", (a, b) => {
  const res = add(a,b);
  myEventEmmiter.emit('result', res);
});

myEventEmmiter.addListener("subtraction", (a, b) => {
  const res = subtraction(a,b);
  myEventEmmiter.emit('result', res);
});

myEventEmmiter.addListener("multiply", (a, b) => {
  const res = multiply(a,b);
  myEventEmmiter.emit('result', res);
});

myEventEmmiter.addListener("division", (a, b) => {
  const res = division(a,b);
  myEventEmmiter.emit('result', res);
});

switch (operation) {
  case 'add':
  case '+': {
    myEventEmmiter.emit('add', firstNum, secondNum);
    break;
  }
  case 'multiply':
  case '*': {
    myEventEmmiter.emit('multiply', firstNum, secondNum);
    break;
  }
  case 'subtraction':
  case '-': {
    myEventEmmiter.emit('subtraction', firstNum, secondNum);
    break;
  }
  case 'division':
  case '/': {
    myEventEmmiter.emit('division', firstNum, secondNum);
    break;
  }
  default:
    myEventEmmiter.emit('result', `Неизвестная операция: ${operation}`);
}
