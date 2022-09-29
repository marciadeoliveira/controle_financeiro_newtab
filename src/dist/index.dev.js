"use strict";

var merchandise__value = document.querySelector('#merchandise__value');
var transaction_type = document.querySelector('#transaction_type');
var merchandise__type = document.querySelector('#merchandise__type');
var extract = [];
var sale = [];
var buy = [];
var result = 2;
var balance = 'a';
localStorage.getItem('extract') != null ? extract = JSON.parse(localStorage.getItem('extract')) : '';
/*criar o elemento div, adicionar uma classe à ele, 
criar o que será mostrado no html e por fim criar os elementos.*/

var createExtract = function createExtract(transaction_type, merchandise__type, merchandise__value) {
  document.querySelector('#table__message').style.display = "none";
  document.querySelector('#table').style.display = "block";
  var item = document.createElement('div');
  item.classList.add('table__merchandise');
  item.innerHTML = "\n    <div id=\"table__merchandise__operador\">\n      ".concat(transaction_type, "\n    </div>\n    <div>\n      ").concat(merchandise__type, "\n    </div>\n    <div class=\"header__value\" id=\"header__value\">\n      ").concat(merchandise__value, "\n    </div>\n    ");
  document.querySelector('#table__section').appendChild(item);
  renderResult();
};
/*Mascara para validar o input de valor, restringindo o 
  uso de letras e adicionando casas decimais*/


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
  if (result === 0) {
    balance = '';
  }

  if (result > 0) {
    balance = '[Lucro]';
  }

  if (result < 0) {
    balance = '[Prejuízo]';
  }

  localStorage.getItem(balance);
  document.querySelector('#table__result').innerHTML = balance;
  localStorage.setItem('extract', JSON.stringify(extract));
  localStorage.setItem("result", JSON.stringify(result));
  localStorage.setItem("balance", JSON.stringify(balance));
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

  renderBalance(result);
  clearFields();
}; //limpar os campos dos inputs após clicar no botão adicionar Transação


var clearFields = function clearFields() {
  document.querySelector('#transaction_type').value = '';
  document.querySelector('#merchandise__value').value = '';
  document.querySelector('#merchandise__type').value = '';
}; //Percorrer o array extrato e mandar 


var renderExtract = function renderExtract() {
  clearExtract();
  extract.map(function (item) {
    createExtract(item.type, item.merchandise, item.price);
  });
}; // Cadastrar os dados colhidos nos inputs 


var addTransaction = function addTransaction(e) {
  e.preventDefault();

  if (!merchandise__type.value || !merchandise__value.value || !transaction_type.value) {
    alert('Preencha os campos corretamente');
  } else {
    if (transaction_type.value === "+") {
      sale.push(+merchandise__value.value);
    } else {
      buy.push(+merchandise__value.value);
    }

    extract.push({
      type: transaction_type.value,
      merchandise: merchandise__type.value,
      price: +merchandise__value.value
    });
  }

  renderExtract();
};

document.querySelector('#add_transaction').addEventListener('click', addTransaction, false);

var uploadDatas = function uploadDatas() {
  if (localStorage.length == 0) {
    document.querySelector('#table__message').style.display = "flex";
    document.querySelector('#table').style.display = "none";
  }

  if (localStorage.length > 0) {
    extract.map(function (item) {
      createExtract(item.type, item.merchandise, item.price);
    });
  }
};

uploadDatas();