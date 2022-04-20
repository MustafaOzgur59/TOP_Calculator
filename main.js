let op1 = "";
let op2 = "";
let operator = null;
let operatorChosen = false; //initially set to false
let result = 0;

let table = document.getElementById("table");
let table_buttons = [...document.querySelectorAll("td > button")];
let current = document.getElementById("current");
let last = document.getElementById("last");
let equalsBtn = document.getElementById("equals");
let acBtn = document.getElementById("ac");
let cBtn = document.getElementById("c");

cBtn.addEventListener("click", (e) => {
  if (current.textContent.length - 1 === 0) {
    current.innerText = "0";
  } else {
    current.innerText = current.innerText.slice(0, -1);
  }
  result = Number(current.innerText);
});

acBtn.addEventListener("click", (e) => {
  op1 = "";
  op2 = "";
  operatorChosen = false;
  current.innerText = "0";
  result = 0;
});

equalsBtn.addEventListener("click", (e) => {
  if (op1 !== "" && op2 !== "" && operator !== null) {
    result += operate(operator, op1, op2);
    current.innerText = result;
    if (operator === "!") {
      last.innerText = `${op1} ${operator} =`;
    } else {
      last.innerText = `${op1} ${operator} ${op2} =`;
    }
    op1 = "";
    op2 = "";
    operatorChosen = false;
  } else {
    current.innerText = result;
  }
  result = 0;
});

table_buttons.forEach((item) => {
  if ([...item.classList].includes("operator")) {
    item.addEventListener("click", operatorClick);
  } else if ([...item.classList].includes("operand")) {
    item.addEventListener("click", operandClick);
  }
});

function operate(operator, operand1, operand2) {
  operand1 = Number(operand1);
  operand2 = Number(operand2);
  switch (operator) {
    case "+":
      return add(operand1, operand2);
    case "−":
      return subtract(operand1, operand2);
    case "×":
      return multiply(operand1, operand2);
    case "÷":
      if (operand2 === 0) return null;
      else return divide(operand1, operand2);
    case "^":
      return power(operand1, operand2);
    case "!":
      return factorial(operand1, operand2);
    default:
      return null;
  }
}

function operandClick(e) {
  if (!operatorChosen) {
    op1 += e.target.innerText;
    console.log("Op1: ", op1);
  } else {
    op2 += e.target.innerText;
    console.log("Op2: ", op2);
  }
}

function operatorClick(e) {
  if (!operatorChosen && op1 !== "") {
    operator = e.target.innerText;
    operatorChosen = true;
    console.log("Operator: ", operator);
    last.innerText = `${op1} ${operator}`;
    if (operator === "!") {
      op2 = "0";
    }
  } else {
    console.log("Please choose op1 first");
  }
}

let add = (op1, op2) => {
  return op1 + op2;
};

let subtract = (op1, op2) => {
  return op1 - op2;
};

let multiply = (op1, op2) => {
  return op1 * op2;
};

let divide = (op1, op2) => {
  return op1 / op2;
};

let power = (op1, op2) => {
  let pow = 1;
  for (let i = 0; i < op2; i++) {
    pow *= op1;
  }
  return pow;
};

let factorial = (op1, op2) => {
  let fact = 1;
  for (let i = 1; i <= op1; i++) {
    fact *= i;
  }
  return fact;
};
