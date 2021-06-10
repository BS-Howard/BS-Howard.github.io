const loadAllBtn = document.querySelector("#loadAll");
const removeAllBtn = document.querySelector("#removeAll");
const plusOneBtn = document.querySelector("#plusOne");
const removeOneBtn = document.querySelector("#removeOne");
const timerBtn = document.querySelector("#timer");
const stopTimerBtn = document.querySelector("#stopTimer");
const container = document.querySelector("#container");

let intervalId;
let count = 1;

loadAllBtn.addEventListener("click", () => {
  for (count; count < 898; count++) {
    let pokemonImg = document.createElement("img");
    if (count < 100) {
      count = count.toString().padStart(3, "0");
    }
    pokemonImg.setAttribute(
      "src",
      `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${count}.png`
    );
    container.appendChild(pokemonImg);
  }
  RemoveEachImg();
});

removeAllBtn.addEventListener("click", () => {
  let pokemonImg = document.querySelectorAll("#container img");
  pokemonImg.forEach((x) => {
    container.removeChild(x);
  });
  count = 1;
});

plusOneBtn.addEventListener("click", () => {
  RemoveEachImg();
  let pokemonImg = document.createElement("img");
  if (count < 100) {
    count = count.toString().padStart(3, "0");
  }
  pokemonImg.setAttribute(
    "src",
    `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${count}.png`
  );
  container.appendChild(pokemonImg);
  count++;
});

removeOneBtn.addEventListener("click", () => {
  let pokemonImg = document.querySelectorAll("#container img");
  container.removeChild(pokemonImg[pokemonImg.length - 1]);
  count--;
});

timerBtn.addEventListener("click", () => {
  set();
});

stopTimerBtn.addEventListener("click", () => {
  clearInterval(intervalId);
});

function set() {
  intervalId = setInterval(() => {
    let pokemonImg = document.createElement("img");
    if (count < 100) {
      count = count.toString().padStart(3, "0");
    }
    pokemonImg.setAttribute(
      "src",
      `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${count}.png`
    );
    container.appendChild(pokemonImg);
    count++;
  }, 1000);
}

function RemoveEachImg() {
var eachImg = container.children
  if (eachImg.length == 0) {
    return;
  } else {
    for (let item of eachImg) {
      item.addEventListener("click", () => {
        container.removeChild(item);
      });
    }
  }
}
