const loadAllBtn = document.querySelector("#loadAll");
const removeAllBtn = document.querySelector("#removeAll");
const plusOneBtn = document.querySelector("#plusOne");
const removeOneBtn = document.querySelector("#removeOne");
const timerBtn = document.querySelector("#timer");
const stopTimerBtn = document.querySelector("#stopTimer");
const container = document.querySelector("#container");
const orderAddBtn = document.querySelector("#orderAdd");

let intervalId;
let count = 1;
let record = [];

loadAllBtn.addEventListener("click", () => {
  for (count; count < 898; count++) {
    createImg();
  }
});

removeAllBtn.addEventListener("click", () => {
  let pokemonImg = document.querySelectorAll("#container img");
  pokemonImg.forEach((x) => {
    DoSlideOut(x);
  });
  count = 1;
});

plusOneBtn.addEventListener("click", () => {
  createImg();
  count++;
});

removeOneBtn.addEventListener("click", () => {
  if (count == 1) {
    return;
  } else {
    let pokemonImg = document.querySelectorAll("#container img");
    DoSlideOut(pokemonImg[pokemonImg.length - 1]);
    count--;
  }
});

timerBtn.addEventListener("click", () => {
  intervalId = setInterval(() => {
    createImg();
    count++;
  }, 500);
});

stopTimerBtn.addEventListener("click", () => {
  clearInterval(intervalId);
});

orderAddBtn.addEventListener("click", () => {
  if (record.length == 0) {
    return;
  }
  let pokemonImg = document.createElement("img");
  let num = record.shift();
  pokemonImg.setAttribute(
    "src",
    `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${num}.png`
  );
  slideOut(pokemonImg, "slide");
  pokemonImg.addEventListener("click", (e) => {
    slideOut(e.target, "slideOut");
    e.target.addEventListener("animationend", (event) => {
      removed(event.target);
    });
  });

  let bool = true;
  container.childNodes.forEach((item) => {
    let x = Number(item.getAttribute("src").substr(-7, 3));
    console.log(num, x);
    if (x > num && bool == true) {
      container.insertBefore(pokemonImg, item);
      bool = false;
    }
    if (bool = true && num > x) {
      container.appendChild(pokemonImg)
    }
  });
});

function createImg() {
  if (count > 898) {
    return;
  }
  let pokemonImg = document.createElement("img");
  if (count < 100) {
    count = count.toString().padStart(3, "0");
  }
  pokemonImg.setAttribute(
    "src",
    `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${count}.png`
  );
  slideOut(pokemonImg, "slide");
  pokemonImg.addEventListener("click", (e) => {
    slideOut(e.target, "slideOut");
    e.target.addEventListener("animationend", (event) => {
      removed(event.target);
    });
  });
  container.appendChild(pokemonImg);
}

function removed(img) {
  img.remove();
  recordNum(img);
  Doreset();
}

function DoSlideOut(x) {
  slideOut(x, "slideOut");
  x.addEventListener("animationend", () => {
    container.removeChild(x);
    Doreset();
  });
}

function Doreset() {
  if (container.children.length == 0) {
    count = 1;
  }
}

function slideOut(img, s) {
  img.style.animation = `${s} .3s`;
}

function recordNum(img) {
  str = img.src.substr(-7, 3);
  record.unshift(str);
}
