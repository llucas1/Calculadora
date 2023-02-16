// mostra a expressão
const divOperation = document.querySelector("#expressao");
//Div que mostra valor do resultado da operacão
const divResult = document.querySelector("#currentValue");
//valor inicial da calculadora
let initialValue = "0";
let currentValue = 0;
let currentOperation = "";
let lastOperation;

//Verifica se a tecla que foi clicada é um número ou simbolo
function checkElement(e) {
  if (isNaN(e)) {
    checkOperation(e);
  } else {
    handleNumber(e);
  }

  //adiciona a expressao à div expressao
  divOperation.innerHTML = `
   ${currentOperation}
    `;

  //adiciona o resultado / numero clicado na div resultado
  divResult.innerHTML = `
    ${initialValue}
  `;
}

//verifica qual a operação
function checkOperation(e) {
  switch (e) {
    case "C":
      initialValue = "0";
      currentValue = 0;
      break;
    case "CE":
      initialValue = "0";
      currentValue = 0;
      currentOperation = "";
      break;
    case "+":
    case "-":
    case "X":
    case "/":
    case "%":
      checkOperator(e);
      break;
    case "=":
      doEquals(e);
      break;
    case ",":
      doFloat(e);
    default:
      break;
  }
}

//Entrega o valor final das ultimas operações
function doEquals(e) {
  if (lastOperation === null) {
    return;
  }
  doMath(parseFloat(initialValue));
  lastOperation = null;
  currentOperation += initialValue + "" + e;
  initialValue = currentValue;
  currentValue = 0;
}

//verifica o operador e inclui na expressão atual
function checkOperator(e) {
  if (initialValue === "0") {
    return;
  }

  let num = parseFloat(initialValue);

  if (currentValue === 0) {
    currentValue = num;
    currentOperation = initialValue + "" + e;
  } else {
    doMath(num);
    currentOperation = initialValue + "" + e;
  }

  lastOperation = e;
  initialValue = "0";
}

//adiciona um ponto flutuante no numero ao clicar na virgula
function doFloat(e) {
  if (initialValue.includes(".")) {
    return;
  }
  initialValue += ".";
}

//realiza as operações matemáticas de acordo com o simbolo
function doMath(num) {
  if (lastOperation === "+") {
    currentValue += num;
  } else if (lastOperation === "-") {
    currentValue -= num;
  } else if (lastOperation === "X") {
    currentValue *= num;
  } else if (lastOperation === "/") {
    currentValue /= num;
  } else if (lastOperation === "%") {
    currentValue = (currentValue * num) / 100;
  }
}

//Adiciona um novo numero ao numero inicial
function handleNumber(n) {
  if (initialValue === "0") {
    initialValue = n;
  } else {
    initialValue += n;
  }
}

function calculator() {
  document.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      element = e.target.innerText;
      checkElement(element);
    });
  });
}

calculator();
