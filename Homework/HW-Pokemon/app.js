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
    slideOut(pokemonImg, "slide");
  }
  RemoveEachImg();
});

removeAllBtn.addEventListener("click", () => {
  let pokemonImg = document.querySelectorAll("#container img");
  pokemonImg.forEach((x) => {
    slideOut(x, "slideOut");
    x.addEventListener("animationend", () => {
      container.removeChild(x);
    });
  });
  count = 1;
});

plusOneBtn.addEventListener("click", () => {
  if (count < 1) {
    count = 1;
  }
  let pokemonImg = document.createElement("img");
  if (count < 100) {
    count = count.toString().padStart(3, "0");
  }
  pokemonImg.setAttribute(
    "src",
    `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${count}.png`
  );
  container.appendChild(pokemonImg);
  slideOut(pokemonImg, "slide");
  RemoveEachImg();
  count++;
});

removeOneBtn.addEventListener("click", () => {
  if (count == 1) {
    return;
  } else {
    let pokemonImg = document.querySelectorAll("#container img");
    let lastChild = pokemonImg[pokemonImg.length - 1];
    slideOut(lastChild, "slideOut");
    lastChild.addEventListener("animationend", () => {
      container.removeChild(lastChild);
    });
    count--;
  }
});

timerBtn.addEventListener("click", () => {
  set();
});

stopTimerBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  RemoveEachImg();
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
  }, 500);
}

function RemoveEachImg() {
  var eachImg = document.querySelectorAll("#container img");
  if (eachImg.length == 0) {
    return;
  } else {
    eachImg.forEach((item) => {
      item.addEventListener("click", (e) => {
        slideOut(item, "slideOut");
        item.addEventListener("animationend", () => {
          item.remove();
        });
        count--;
      });
    });
  }
}

function slideOut(img, s) {
  img.style.animation = `${s} .3s`;
}
