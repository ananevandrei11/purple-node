const EventEmmiter = require("events");
const myEventEmmiter = new EventEmmiter();

let nodePath = process.argv[0];
let appPath = process.argv[1];
let firstNum = process.argv[2];
let secondNum = process.argv[3];
let operation = process.argv[4];

myEventEmmiter.addListener('add', (a,b) => {
  console.log(a+b);
});

myEventEmmiter.addListener('subtraction', (a,b) => {
  console.log(a-b);
});

myEventEmmiter.addListener('multiply', (a,b) => {
  console.log(a*b);
});

myEventEmmiter.addListener('division', (a,b) => {
  console.log(a/b);
});

let res = 0;
const a = Number(firstNum);
const b = Number(secondNum);

switch (operation) {
  case 'add':
  case '+': {
    myEventEmmiter.emit('add', a, b);
    break;
  }
  case 'multiply':
  case '*': {
    myEventEmmiter.emit('multiply', a, b);
    break;
  }
  case 'subtraction':
  case '-': {
    myEventEmmiter.emit('subtraction', a, b);
    break;
  }
  case 'division':
  case '/': {
    myEventEmmiter.emit('division', a, b);
    break;
  }
  default:
    console.log('Неизвестная операция:', operation);
}

