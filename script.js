
const apiKey = "aab8723c47a54e92f2b870b1";

const containerEl = document.querySelector(".container");
const amountEl = document.querySelector(".amount");
const changeValue = document.getElementById('change-value');
const selectEls = document.querySelectorAll(".select");
const optionEls = document.querySelectorAll("option");
const labelEl = document.querySelector(".label h2");
const modeEl = document.querySelector(".label .mode");
const hoverEl = document.querySelector(".hover");
const convertBtn = document.querySelector(".convert-btn");
const convertFrom = document.querySelector("#select-1");
const convertTo = document.querySelector("#select-2");
const showRate = document.querySelector(".show-rate");

changeValue.addEventListener('click', () => {
  let tempFrom = convertFrom.value;
  convertFrom.value = convertTo.value;
  convertTo.value = tempFrom;
  fetchData();
})

convertBtn.addEventListener("click", () => {
    fetchData();
});

window.addEventListener("load", fetchData);

function fetchData() {
    showRate.innerHTML = "Getting rate...";
    optionsTo = convertTo.value;
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${convertFrom.value}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let exchangeRate = data.conversion_rates;
            const totalExchangeRate =
                amountEl.value * exchangeRate[convertTo.value].toFixed(5);
            showRate.innerHTML = `${amountEl.value} ${convertFrom.value} = ${totalExchangeRate} ${convertTo.value}`;

        })
        .catch((err) => {
            console.log(err);
        });
}


modeEl.addEventListener("click", (e) => {
    containerEl.classList.toggle("active");
    labelEl.classList.toggle("active");
    modeEl.classList.toggle("active");
    hoverEl.classList.toggle("active");
    selectEls.forEach((selectEl) => {
        selectEl.classList.toggle("active");
    });
    optionEls.forEach((optionEl) => {
        optionEl.classList.toggle("active");
    });
    if (hoverEl.classList.contains("active")) {
        hoverEl.textContent = "Light";
    } else {
        hoverEl.textContent = "Dark";
    }
});
