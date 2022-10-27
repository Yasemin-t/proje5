let selects = document.getElementById("myselect");
let unit = document.getElementById("unit");
let myinput = document.getElementById("myinput");
let temp = "";
let sum = "";
let amount = "";
let earning = "";
let Sat = "";
let coin = [];
let coins = [];

// toplam değeri getirme

function getTotal() {
  let piece = parseFloat(document.getElementById("piece").value);
  let unitPrice = parseFloat(document.getElementById("myinput").value);
  let total = piece * unitPrice;
  document.getElementById("total").value = total;
  amount = piece;
  sum = document.getElementById("total").value;
  earning = total - unitPrice;
}

// tablo oluşturma
function buy() {
  let div = `
        <td>${temp.asset_id_base}</td>
        <td>${temp.rate}</td>
         <td>${amount}</td>
         <td>${sum}</td>
        <td> <button id="button" type="button" class="btn btn-outline-info" onclick="buyCoin()">Sat</button></td>
    
        `;

  document.getElementById("tBody").innerHTML += div;
}

// API anlık değer alma
function mycoin() {
  console.log(selects.value);
  fetch(
    `https://rest.coinapi.io/v1/exchangerate/${selects.value}/USD?apikey= EFE8D81B-0D9C-458D-921B-77CAA0DDE712`
    // {
    //   method: "GET", // *GET, POST, PUT, DELETE, etc.
    //   mode: "no-cors", // no-cors, *cors, same-origin
    //   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //   credentials: "same-origin", // include, *same-origin, omit
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      temp = data;
      let b = `
         <label for="" type="text" class="input-group-text">${data.asset_id_base}</label>
        `;
      let a = `
      <span class="input-group-text">${data.rate}</span>
        `;
      unit.value = data.asset_id_base;
      myinput.value = data.rate;
    });
}
// MODAL
function buyCoin() {
  let modalShow = new bootstrap.Modal(document.getElementById("modalShow"), {
    keyboard: false,
  });
  modalShow.show();
}

function save() {
  let newAmount = parseFloat(document.getElementById("modalPiece").value);
  let newTotal = parseFloat(temp.rate) * parseFloat(newAmount);
  let newEarning = sum - newTotal;
  let table = `
   <td>${temp.asset_id_base}</td>
        <td>${temp.rate}</td>
         <td>${newAmount}</td>
         <td>${newTotal}</td>
         <td>${newEarning}</td>
  `;
  document.getElementById("twoBody").innerHTML += table;

  /**
   * önce parse'layıp verilerini çek
   * sonra oluşturduğun objeyi bu veri içerisine ekle
   * sonrasında tekrar localstorage'a setle
   */

  // local Storage

  let coinList = [
    {
      adi: temp.asset_id_base,
      fiyat: temp.rate,
      adet: newAmount,
      toplam: newTotal,
      kazanc: newEarning,
    },
  ];
  // localStorage.setItem("coinName", JSON.stringify(coinList));
  // let getStorage = JSON.parse(localStorage.getItem("coinName"));
  // console.log(getStorage);
  // let coinName = document.querySelector("#twoBody");
  // twoBody.innerHTML = JSON.parse(localStorage.getItem("coinName")).value;

  const list = JSON.parse(localStorage.getItem("coinList"));
  if (list === null) {
    coin.push(coinList);
    localStorage.setItem("coin", JSON.stringify(coin));
  } else {
    coinList = JSON.parse(localStorage.getItem("coinList"));
    coin.push(coinList);
    localStorage.setItem("coin", JSON.stringify(coinList));
  }
  console.log(localStorage);
}

window.onload = function () {
  coins =
    JSON.parse(localStorage.getItem("coins")) == undefined
      ? []
      : JSON.parse(localStorage.getItem("coins"));
  coins.array.forEach((val) => {
    let coinTable = `
   <td>${temp.asset_id_base}</td>
        <td>${temp.rate}</td>
         <td>${val.Amount}</td>
         <td>${val.Total}</td>
         <td>${val.Earning}</td>
  `;
    const tr = document.createElement("tr");
    tr.innerHTML = coinTable;
    document.getElementById("twoBody").appendChild(tr);
  });
};
