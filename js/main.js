let input1 = document.querySelector(".inputSection1 input");
let input2 = document.querySelector(".inputSection2 input");

// buttons from currency
let fromButtons = document.querySelectorAll(".fromButtons li");

// buttons to currency
let toButtons = document.querySelectorAll(".toButtons li");

// first info
let fromInfo = document.querySelector(".inputSection1 span");

// second info
let toInfo = document.querySelector(".inputSection2 span");

// alert message selection
let alert = document.querySelector(".alert");

// dropdown menu activate btn selection
let menuBtn = document.querySelector(".menuBtn");

// dropdown menu area selection
let dropDownMenu = document.querySelector(".sidebar");

// dropdown menu close btn selection
let closeDropDown = document.querySelector(".close");

// dropdown menu activation event
menuBtn.addEventListener("click", (e) => {
  e.target.style.display = "none";
  dropDownMenu.style.left = 0;
});

// dropdown menu deactivation event
closeDropDown.addEventListener("click", () => {
  menuBtn.style.display = "block";
  dropDownMenu.style.left = -100 + "%";
});


let currencyFROM = "RUB";
let currencyTO = "USD";

currencyFrom();

fromButtons.forEach((item) => {
    item.addEventListener("click", (e) => {
      fromButtons.forEach((item) => {
        item.classList.remove("selected");
      });
      currencyFROM = e.target.innerHTML;
      e.target.classList.add("selected");

      if(currencyFROM === currencyTO){
        input2.value = input1.value;
        fromInfo.innerHTML = `1 ${currencyFROM} = 1 ${currencyTO}`;
        toInfo.innerHTML = `1 ${currencyFROM} = 1 ${currencyTO}`;
      }else {
        currencyFrom();
        currencyTo();
      }

    });
});

toButtons.forEach((item) => {
    item.addEventListener("click", (e) => {
      toButtons.forEach((item) => {
        item.classList.remove("selected");
      });
      currencyTO = e.target.innerHTML;
      if(currencyFROM === currencyTO){
        input2.value = input1.value;
        fromInfo.innerHTML = `1 ${currencyFROM} = 1 ${currencyTO}`;
        toInfo.innerHTML = `1 ${currencyFROM} = 1 ${currencyTO}`;
      }else {
        currencyFrom();
        currencyTo();
      }

      e.target.classList.add("selected");
    });
});


function currencyFrom() {
  fetch(
    `https://api.exchangerate.host/latest?base=${currencyFROM}&symbols=${currencyTO}`
  )
    .then((res) => res.json())
    .then((data) => {
        fromInfo.innerHTML = `1 ${currencyFROM} = ${data.rates[currencyTO]} ${currencyTO}`;
        if (isNaN(input1.value)) {
          input2.value = "";
          alert.style.display = "block";
        } else {
          input2.value = (input1.value * data.rates[currencyTO]).toFixed(2);
          alert.style.display = "none";

        }

        input1.addEventListener("keyup", (e) => {
          input1.value = e.target.value;
          input1.value = input1.value.split(",").join(".");
          
          if (isNaN(input1.value)) {
            input2.value = "";
            alert.style.display = "block";
          } else {
            if(currencyFROM === currencyTO){
              input2.value = input1.value;
              fromInfo.innerHTML = `1 ${currencyFROM} = 1 ${currencyTO}`;
              toInfo.innerHTML = `1 ${currencyFROM} = 1 ${currencyTO}`;
            }else {
              
              input2.value = (input1.value * data.rates[currencyTO]).toFixed(2);
              alert.style.display = "none";
            }

          }
        });
    })
    .catch(error =>{
      console.log(`An error has occurred: ${error.message}`);
    })
}


function currencyTo() {
  fetch(
    `https://api.exchangerate.host/latest?base=${currencyTO}&symbols=${currencyFROM}`
  )
    .then((res) => res.json())
    .then((data) => {
      toInfo.innerHTML = `1 ${currencyTO} = ${data.rates[currencyFROM]} ${currencyFROM}`;

      input2.addEventListener("keyup", (e) => {
        input2.value = e.target.value;
        input2.value = input2.value.split(",").join(".");

        if (isNaN(input2.value)) {
          input1.value = "";
          alert.style.display = "block";
        } else {
          if(currencyFROM === currencyTO) {
            input1.value = input2.value;
            fromInfo.innerHTML = `1 ${currencyFROM} = 1 ${currencyTO}`;
            toInfo.innerHTML = `1 ${currencyFROM} = 1 ${currencyTO}`;
          }else {
            input1.value = (input2.value * data.rates[currencyFROM]).toFixed(2);
            alert.style.display = "none";
          }
        }
      });
    })
    .catch(error =>{
      console.log(`An error has occurred: ${error.message}`);
    })
}

fetch(
  `https://api.exchangerate.host/latest?base=${currencyTO}&symbols=${currencyFROM}`
)
  .then((res) => res.json())
  .then((data) => {
      fromInfo.innerHTML = `1 ${currencyTO} = ${data.rates[currencyFROM]} ${currencyFROM}`;
      if (isNaN(input2.value)) {
        input1.value = "";
        alert.style.display = "block";
      } else {
        input1.value = (input2.value * data.rates[currencyFROM]).toFixed(2);
        alert.style.display = "none";
      }

      input2.addEventListener("keyup", (e) => {
        input2.value = e.target.value;
        input2.value = input2.value.split(",").join(".");

        if (isNaN(input2.value)) {
          input1.value = "";
          alert.style.display = "block";
        } else {
          if(currencyFROM === currencyTO) {
            input1.value = input2.value;
            fromInfo.innerHTML = `1 ${currencyFROM} = 1 ${currencyTO}`;
            toInfo.innerHTML = `1 ${currencyFROM} = 1 ${currencyTO}`;
          }else {
            input1.value = (input2.value * data.rates[currencyFROM]).toFixed(2);
            alert.style.display = "none";
          }
        }
    });
  })
  .catch(error =>{
    console.log(`An error has occurred: ${error.message}`);
  })
