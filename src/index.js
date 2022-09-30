const merchandise__value = document.querySelector('#merchandise__value')
const transaction_type = document.querySelector('#transaction_type')
const merchandise__type = document.querySelector('#merchandise__type')
let extract = []
let sale;
let buy;
let balance;
let result= 0

// pegar valores no localStorage
localStorage.getItem('extract') != null 
? extract = JSON.parse(localStorage.getItem('extract'))
:''

localStorage.getItem('result') != null 
? result = JSON.parse(localStorage.getItem('result'))
:''

//limpar os campos dos inputs após clicar no botão adicionar Transação
const clearFields = () => {
  document.querySelector('#transaction_type').value = ''
  document.querySelector('#merchandise__value').value = ''
  document.querySelector('#merchandise__type').value = ''
}

//Renderiza se o financeiro gerou Lucro ou Prejuízo
const renderBalance = ( )=> {
  result > 0 ? balance ='[Lucro]': balance = '[Prejuízo]'
  localStorage.setItem('balance', JSON.stringify(balance));
  document.querySelector('#table__result').innerHTML = balance 
  clearFields()
} 

 /*criar o elemento div, adicionar uma classe à ele, 
criar o que será mostrado no html e por fim criar os elementos.*/
const createExtract = (
  transaction_type, 
  merchandise__type, 
  merchandise__value
) => {
  document.querySelector('#table__message').style.display = "none"
  document.querySelector('#table').style.display = "block"

  const item = document.createElement('div')
  item.classList.add('table__merchandise')
  item.innerHTML =`
    <div id="table__merchandise__operador">
      ${transaction_type}
    </div>
    <div>
      ${merchandise__type}
    </div>
    <div class="header__value" id="header__value">
      ${merchandise__value}
    </div>
    `
  document.querySelector('#table__section').appendChild(item)
  renderBalance()  
}

//Percorrer o array extrato e mandar os itens, para o createExctract, gerar os elementos HTML
const renderExtract = () => {
  clearExtract() 
  extract.map(item => {
    createExtract(item.type, item.merchandise, item.price)
  })
}
   
// para não repetir os mesmos valores já listados quando atualizar a página
const clearExtract = () => {
  const clear = document.querySelector('#table__section')
  while(clear.firstChild) {
    clear.removeChild(clear.lastChild)
  }
}

/*Mascara para validar o input de valor, restringindo o 
uso de letras e adicionando casas decimais*/
const validNamber = (e) => {
  e.preventDefault()
  merchandise__value.value = merchandise__value.value
  .replace(/[^0-9]+/g,'')

  if(merchandise__value.value.length <= 2) {
    merchandise__value.value = ('000'+merchandise__value.value)
    .substring(-3)
  }
  merchandise__value.value = merchandise__value.value
  .replace(/([0-9]{2})$/g,".$1")
  merchandise__value.value = parseFloat(merchandise__value.value)
  .toLocaleString()
}
document.querySelector('#merchandise__value')
.addEventListener('keyup',validNamber,false)

/*Pegar os dados dos inputs adicionar nas variaveis e mandá-las para localStorage*/
const addTransaction = (e) => {
  e.preventDefault()
  if(
    !merchandise__type.value 
    || !merchandise__value.value 
    || !transaction_type.value
  ) 
  alert('Preencha os campos corretamente')
  extract.push(
    { 
      type: transaction_type.value, 
      merchandise: merchandise__type.value,
      price: +merchandise__value.value,
    }
  )
  if(transaction_type.value === "+") {
    sale = +merchandise__value.value
    result += sale
    document.querySelector('#footer__value').innerHTML = 'R$'+ result 
  } else{
    buy = +merchandise__value.value
    result -= buy
    document.querySelector('#footer__value').innerHTML = 'R$'+ result 
  }
  localStorage.setItem('result',JSON.stringify(result))
  localStorage.setItem('extract',JSON.stringify(extract))
  renderExtract()
}
document.querySelector('#add_transaction')
.addEventListener('click',addTransaction,false)


/*limpar todos os dados ao clicar no campo limpar dados, 
 exibir mensagem de confirmação e recarregar a pagina*/
const clearData = () => {
  if(window.confirm("Você deseja limpar todos os dados?")) {
    localStorage.clear('extract', extract)
    location. reload() 
  }
}
document.querySelector('#nav__link')
.addEventListener('click', clearData, false)

// Fechar a aba menu
const closeMenu= () => {
  document.querySelector('#nav__menu').style.display = 'none'
  location. reload() 
}
document.querySelector('#nave__close')
.addEventListener('click', closeMenu, false)

//Abrir a aba Menu
const openMenu = () => {
  document.querySelector('#nav__menu').style.display = 'flex'
}  
document.querySelector('#nav__collapse')
.addEventListener('click', openMenu, false)

/*Verifica se o local storage tem dados para serem recarregados, quando 
carregar a página*/
const uploadDatas = () => {
  if(localStorage.length == 0){
    document.querySelector('#table__message').style.display ="flex"
    document.querySelector('#table').style.display ="none"
  }else{
    document.querySelector('#table__message').style.display ="none"
    document.querySelector('#table').style.display ="block"

    document.querySelector('#footer__value').innerHTML = 'R$'+ result
    localStorage.getItem(balance)

    document.querySelector('#table__result').innerHTML = balance 

    extract.map(item => {
      createExtract(item.type, item.merchandise, item.price)
    })
  }
}
uploadDatas()