const merchandise__value = document.querySelector('#merchandise__value')
const transaction_type = document.querySelector('#transaction_type')
const merchandise__type = document.querySelector('#merchandise__type')
let extract = [] 
let sale = []
let buy = []
let result = 2
let balance ='a'
localStorage.getItem('extract') != null 
? extract = JSON.parse(localStorage.getItem('extract'))
:''

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
  renderResult()  
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

// para não repetir os mesmos valores quando atualizar a página
const clearExtract = () => {
  const clear = document.querySelector('#table__section')
  while(clear.firstChild) {
    clear.removeChild(clear.lastChild)
  }
}

//Renderiza se o financeiro gerou Lucro ou Prejuízo
const renderBalance = (result) => {
  if(result === 0) {
    balance = '' 
  } if(result > 0) {
    balance = '[Lucro]' 
  }if(result < 0) {
    balance = '[Prejuízo]' 
  }
  localStorage.getItem(balance)
  document.querySelector('#table__result').innerHTML = balance 
  localStorage.setItem('extract', JSON.stringify(extract)) 
  localStorage.setItem("result", JSON.stringify(result));
  localStorage.setItem("balance", JSON.stringify(balance));
} 
// Renderizar os reslutados de soma e subtração, chegando ao valor total do extrato
const renderResult = () => {
  const sum = sale.reduce((
    previousValue, currentValue
    ) => previousValue + currentValue,0
  )
  const sub = buy.reduce((
    previousValue, currentValue
    ) => previousValue + currentValue,0
  )
  result = sum-sub 
  document.querySelector('#footer__value').innerHTML = 'R$'+result

  //Chamar a função que vai atualizar o resultado
  renderBalance(result)
  clearFields()
}

//limpar os campos dos inputs após clicar no botão adicionar Transação
const clearFields = () => {
  document.querySelector('#transaction_type').value = ''
  document.querySelector('#merchandise__value').value = ''
  document.querySelector('#merchandise__type').value = ''
}
//Percorrer o array extrato e mandar 
const renderExtract = () => {
  clearExtract() 
  extract.map(item => {
    createExtract(item.type, item.merchandise, item.price)
  })
 }

 // Cadastrar os dados colhidos nos inputs 
const addTransaction = ( e ) => {
  e.preventDefault()
    if(
      !merchandise__type.value 
      || !merchandise__value.value 
      || !transaction_type.value
    ){  
      alert('Preencha os campos corretamente')
    }else {
      if(transaction_type.value === "+") {
        sale.push((+merchandise__value.value))
      } else{
          buy.push((+merchandise__value.value))
      }
      extract.push(
        { 
          type: transaction_type.value, 
          merchandise: merchandise__type.value,
          price: +merchandise__value.value,
        }
      )
    }
  renderExtract()
}
document.querySelector('#add_transaction')
.addEventListener('click',addTransaction,false)

const uploadDatas = () =>{
  if(localStorage.length == 0){
    document.querySelector('#table__message').style.display ="flex"
    document.querySelector('#table').style.display ="none"
  }
  if(localStorage.length > 0){
    extract.map(item => {
      createExtract(item.type, item.merchandise, item.price)
    })
 }
}
/*limpar todos os dados ao clicar no campo limpar dados, 
  exibir mensagem de confirmação e recarregar a pagina*/
const clearData = () => {
  if(window.confirm("Você realmente deseja limpar todos os dados?")) {
    localStorage.clear('extract', extract)
    localStorage.clear('extract', result)
    localStorage.clear('extract', balance)
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
uploadDatas()

//Abrir a aba Menu
const openMenu = () => {
  document.querySelector('#nav__menu').style.display = 'flex'
}  
document.querySelector('#nav__collapse')
.addEventListener('click', openMenu, false)

