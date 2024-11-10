// allSelector
const msgElm = document.querySelector('#msg');
const inputAmountElm = document.querySelector('#inputAmount');
const fromCurrencyElm = document.querySelector('#fromCurrency');
const toCurrencyElm = document.querySelector('#toCurrency');
const currentRateElm = document.querySelector('#currentRate');
const convertBtnElm = document.querySelector('#convertBtn');

let amount = 1;
inputAmountElm.value = amount;

// fetch api
fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json')
.then((res)=>res.json())
.then((data)=>{
    displayData(data)
})
// hide message
function hideMsg(){
    msgElm.textContent = '';
}
// show Message
function showMessage(msg, action='danger'){
    const textMsg = `<div class="alert text-center fw-bold text-danger alert-${action}" role="alert">${msg}</div>`;
    msgElm.insertAdjacentHTML('afterbegin', textMsg);
    setTimeout(() => {
        hideMsg();
    }, 2000);
}
function reloadTime(){
    setTimeout(() => {
  window.location.reload();

    }, 5000);
}

// convert currency 
function convertCurrency(fromCurrencyValue, toCurrencyValue, amountValue){
    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrencyValue}.json`)
    .then((res)=> res.json())
    .then((data)=>{
        const rate = data[fromCurrencyValue][toCurrencyValue];
        const convertAmount = (rate * amountValue).toFixed(2);
        const showAmount = `${amountValue} ${fromCurrencyValue.toUpperCase()} = ${convertAmount} ${toCurrencyValue.toUpperCase()}`;
        currentRateElm.innerHTML = showAmount;
    })
}

// display data
function displayData(data){
    for(let currency in data){
        const option = `<option value="${currency}">${currency.toUpperCase()}</option>`;
        fromCurrencyElm.innerHTML += option;
        toCurrencyElm.innerHTML += option;
    }
 // convert btn add eventlistener
 convertBtnElm.addEventListener('click',()=>{
       // select value
       const amountValue = inputAmountElm.value;
       const fromCurrencyValue = fromCurrencyElm.value;
       const toCurrencyValue = toCurrencyElm.value;
       if(fromCurrencyValue != toCurrencyValue){
           convertCurrency(fromCurrencyValue, toCurrencyValue, amountValue);
       }
       else{
           showMessage('Please Chose Different Currency !',)
       }
       reloadTime();
 })
}