"use strict";

var merchandise__value = document.querySelector('#merchandise__value');
var transaction_type = document.querySelector('#transaction_type');
var merchandise__type = document.querySelector('#merchandise__type');
var extract = [];
var sale = [];
var buy = [];
var result = 0;

var createExtract = function createExtract(transaction_type, merchandise__type, merchandise__value) {
  /* criar o elemento div, adicionar uma classe à ele, criar o que será mostrado no html 
     e por fim criar os elementos.*/
  var item = document.createElement('div');
  item.classList.add('table__merchandise');
  item.innerHTML = "\n    <div id=\"table__merchandise__operador\">".concat(transaction_type, "</div>\n    <div>").concat(merchandise__type, "</div>\n    <div class=\"header__value\" id=\"header__value\">").concat(merchandise__value, "</div>\n   ");
  document.querySelector('#table__section').appendChild(item);
}; // Mascara para validar o input de valor, restringindo o uso de letras e adicionando casas decimais


var validNamber = function validNamber(e) {
  e.preventDefault();
  merchandise__value.value = merchandise__value.value.replace(/[^0-9]+/g, '');

  if (merchandise__value.value.length <= 2) {
    merchandise__value.value = ('000' + merchandise__value.value).substring(-3);
  }

  merchandise__value.value = merchandise__value.value.replace(/([0-9]{2})$/g, ".$1");
  merchandise__value.value = parseFloat(merchandise__value.value).toLocaleString();
};

document.querySelector('#merchandise__value').addEventListener('keyup', validNamber, false); // para não repetir os mesmos valores quando atualizar a página

var clearExtract = function clearExtract() {
  var clear = document.querySelector('#table__section');

  while (clear.firstChild) {
    clear.removeChild(clear.lastChild);
  }
}; //Renderiza se o financeiro gerou Lucro ou Prejuízo


var renderBalance = function renderBalance(result) {
  var balance = '';

  if (result === 0) {
    balance = '';
  }

  if (result > 0) {
    balance = 'Lucro';
  }

  if (result < 0) {
    balance = 'Prejuízo';
  }

  document.querySelector('#table__result').innerHTML = '[' + balance + ']';
}; // Renderizar os reslutados de soma e subtração, chegando ao valor total do extrato


var renderResult = function renderResult() {
  var sum = sale.reduce(function (previousValue, currentValue) {
    return previousValue + currentValue;
  }, 0);
  var sub = buy.reduce(function (previousValue, currentValue) {
    return previousValue + currentValue;
  }, 0);
  result = sum - sub;
  document.querySelector('#footer__value').innerHTML = 'R$' + result; //Chamar a função que vai atualizar o resultado

  renderBalance(result); //salvar os dados do extrato em localstorage

  clearFields();
}; //limpar os campos dos inputs após clicar no botão adicionar Transação


var clearFields = function clearFields() {
  document.querySelector('#transaction_type').value = '';
  document.querySelector('#merchandise__value').value = '';
  document.querySelector('#merchandise__type').value = '';
}; // Renderizar o extrato, gerando tantos quantos elementos(div), estiverem dentro da const Extratotiverem


var renderExtract = function renderExtract() {
  clearExtract();
  extract.forEach(function (item) {
    return createExtract(item.type, item.merchandise, item.price);
  });
  renderResult();
}; // Cadastrar os dados colhidos nos inputs 


var addTransaction = function addTransaction(e) {
  e.preventDefault();

  if (!merchandise__type.value || !merchandise__value.value || !transaction_type) {
    alert('Preencha os campos corretamente');
  }

  if (transaction_type.value === "+") {
    sale.push(+merchandise__value.value);
  } else {
    buy.push(+merchandise__value.value);
  }

  extract.push({
    type: transaction_type.value,
    merchandise: merchandise__type.value,
    price: merchandise__value.value
  });
  document.querySelector('#table__messagem').style.display = 'none';
  renderExtract();
};

document.querySelector('#add_transaction').addEventListener('click', addTransaction, false);
renderExtract();