"use strict";

/*limpar todos os dados ao clicar no campo limpar dados, 
  exibir mensagem de confirmação e recarregar a pagina*/
var clearData = function clearData() {
  if (window.confirm("Você realmente deseja limpar todos os dados?")) {
    localStorage.clear('extract', extract);
    location.reload();
  }
};

document.querySelector('#nav__link').addEventListener('click', clearData, false); // Fechar a aba menu

var closeMenu = function closeMenu() {
  document.querySelector('#nav__menu').style.display = 'none';
  location.reload();
};

document.querySelector('#nave__close').addEventListener('click', closeMenu, false); //Abrir a aba Menu

var openMenu = function openMenu() {
  document.querySelector('#nav__menu').style.display = 'flex';
};

document.querySelector('#nav__collapse').addEventListener('click', openMenu, false); // pegar valores no localStorage

localStorage.getItem('extract') != null ? extract = JSON.parse(localStorage.getItem('extract')) : '';
localStorage.getItem('result') != null ? result = JSON.parse(localStorage.getItem('result')) : '';

var uploadDatas = function uploadDatas() {
  var merchandise__value = document.querySelector('#merchandise__value');
  var transaction_type = document.querySelector('#transaction_type');
  var merchandise__type = document.querySelector('#merchandise__type');
  var extract = [];
  var sale;
  var buy;
  var balance; // não posso criar a variavel result aqui pq senão quebra tudo, afinal ela já está sendo atribuida ao chamar o get Item lá no começo do código
  //let result=0

  localStorage.getItem('result') == null ? result = JSON.parse(localStorage.getItem('result')) : ''; //limpar os campos dos inputs após clicar no botão adicionar Transação

  var clearFields = function clearFields() {
    document.querySelector('#transaction_type').value = '';
    document.querySelector('#merchandise__value').value = '';
    document.querySelector('#merchandise__type').value = '';
  }; //Renderiza se o financeiro gerou Lucro ou Prejuízo


  var renderBalance = function renderBalance() {
    localStorage.getItem(result);
    result > 0 ? balance = '[Lucro]' : balance = '[Prejuízo]';
    localStorage.setItem('balance', JSON.stringify(balance));
    document.querySelector('#table__result').innerHTML = balance;
    clearFields();
  };
  /*criar o elemento div, adicionar uma classe à ele, 
  criar o que será mostrado no html e por fim criar os elementos.*/


  var createExtract = function createExtract(transaction_type, merchandise__type, merchandise__value) {
    //document.querySelector('#table__message').style.display = "none"
    //document.querySelector('#table').style.display = "block"
    var item = document.createElement('div');
    item.classList.add('table__merchandise');
    item.innerHTML = "\n      <div id=\"table__merchandise__operador\">\n        ".concat(transaction_type, "\n      </div>\n      <div>\n        ").concat(merchandise__type, "\n      </div>\n      <div class=\"header__value\" id=\"header__value\">\n        ").concat(merchandise__value, "\n      </div>\n      ");
    document.querySelector('#table__section').appendChild(item);
    renderBalance();
  }; //Percorrer o array extrato e mandar 


  var renderExtract = function renderExtract() {
    clearExtract();
    extract.map(function (item) {
      createExtract(item.type, item.merchandise, item.price);
    });
  }; // para não repetir os mesmos valores quando atualizar a página


  var clearExtract = function clearExtract() {
    var clear = document.querySelector('#table__section');

    while (clear.firstChild) {
      clear.removeChild(clear.lastChild);
    }
  };

  var addTransaction = function addTransaction(e) {
    e.preventDefault();
    if (!merchandise__type.value || !merchandise__value.value || !transaction_type.value) alert('Preencha os campos corretamente');
    extract.push({
      type: transaction_type.value,
      merchandise: merchandise__type.value,
      price: +merchandise__value.value
    });
    localStorage.getItem(result);

    if (transaction_type.value === "+") {
      sale = +merchandise__value.value;
      result += sale;
      document.querySelector('#footer__value').innerHTML = 'R$' + result;
    } else {
      buy = +merchandise__value.value;
      result -= buy;
      document.querySelector('#footer__value').innerHTML = 'R$' + result;
    }

    localStorage.setItem('result', JSON.stringify(result));
    localStorage.setItem('extract', JSON.stringify(extract));
    renderExtract();
  };

  document.querySelector('#add_transaction').addEventListener('click', addTransaction, false);
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

  document.querySelector('#merchandise__value').addEventListener('keyup', validNamber, false);
  /*criar o elemento div, adicionar uma classe à ele, 
  criar o que será mostrado no html e por fim criar os elementos.*/

  if (localStorage.length == 0) {
    document.querySelector('#table__message').style.display = "flex";
    document.querySelector('#table').style.display = "none";
  } else {
    localStorage.getItem(result);
    document.querySelector('#table__message').style.display = "none";
    document.querySelector('#table').style.display = "block";
    document.querySelector('#footer__value').innerHTML = 'R$' + result;
    localStorage.getItem(balance);
    document.querySelector('#table__result').innerHTML = balance;
    extract = JSON.parse(localStorage.getItem('extract'));
    extract.map(function (item) {
      createExtract(item.type, item.merchandise, item.price);
    });
  }
};

uploadDatas();