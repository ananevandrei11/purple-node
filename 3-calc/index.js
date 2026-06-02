let nodePath = process.argv[0];
let appPath = process.argv[1];

let firstNum = process.argv[2];
let secondNum = process.argv[3];
let operation = process.argv[4];

let res = 0;
switch (operation) {
  case 'add':
  case '+': {
    const { add } = require('./add');
    res = add(firstNum, secondNum);
    break;
  }
  case 'multiply':
  case '*': {
    const { multiply } = require('./multiply');
    res = multiply(firstNum, secondNum);
    break;
  }
  case 'subtraction':
  case '-': {
    const { subtraction } = require('./subtraction');
    res = subtraction(firstNum, secondNum);
    break;
  }
  case 'division':
  case '/': {
    const { division } = require('./division');
    res = division(firstNum, secondNum);
    break;
  }
  default:
    console.log('Неизвестная операция:', operation);
}

console.log(res);