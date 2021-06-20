import { $c, $g } from "./modules/helpers.js";

var iPad = {
  name: "iPad Pro",
  pic: "pic/ipad-all.png",
  screen: [
    {
      name: "11 吋 iPad Pro",
      size: "11 吋顯示器",
      price: "NT$24,900 起",
      total: "24900",
    },
    {
      name: "12.9 吋 iPad Pro",
      size: "12.9 吋顯示器",
      price: "NT$34,900 起",
      total: "34900",
    },
  ],
  color: [
    {
      name: "太空灰色",
      colorValue: "#6e6e73",
      img: "pic/ipad-gray.png",
    },
    {
      name: "閃亮粉紅色",
      colorValue: "#fc3e63",
      img: "pic/ipad-pink.png",
    },
    {
      name: "宇宙銀色",
      colorValue: "#e8e8ed",
      img: "pic/ipad-silver.png",
    },
  ],
  spec: [
    { name: "128GB", total: "0" },
    { name: "256GB", total: "3100" },
    { name: "512GB", total: "9300" },
    { name: "1TB", total: "21700" },
    { name: "2TB", total: "34100" },
  ],
  wifi: [
    { name: "WI-FI", total: "0" },
    { name: "WI-FI + 行動網路", total: "5000" },
  ],
};

const tem = $g("#app");
let cloneTem = tem.content.cloneNode(true);
let stickyName = cloneTem.querySelector("#stickyName");
let stickyPrice = cloneTem.querySelector("#stickyPrice");
let totalPrice = cloneTem.querySelector(".total");
let mainPic = cloneTem.querySelector("#mainPic");
let size = cloneTem.querySelector(".size");
let sizedown = cloneTem.querySelector(".sizedown");
let color = cloneTem.querySelector(".color");
let colordown = cloneTem.querySelector(".colordown");
let spec = cloneTem.querySelector(".spec");
let specdown = cloneTem.querySelector(".specdown");
let wifi = cloneTem.querySelector(".wifi");
let wifidown = cloneTem.querySelector(".wifidown");
let calcArray = [size, spec, wifi];

window.addEventListener("load", () => {
  // sticky
  stickyName.innerText = iPad.name;

  pic_make(mainPic);

  size_make(size, sizedown, iPad);

  color_make(color, colordown, iPad);

  spec_make(spec, specdown, iPad);

  wifi_make(wifi, wifidown, iPad);

  document.body.append(cloneTem);
});

function pic_make(selector) {
  let img = $c("img");
  img.setAttribute("src", iPad.pic);
  selector.append(img);
}

function size_make(selector, child, object) {
  toggle(selector, child, "show");
  object.screen.forEach((x) => {
    let div = $c("div").cloneNode(true);
    div.setAttribute(
      "style",
      "padding: 1rem; border: 1px solid #000; margin: .5rem; border-radius: 10px; text-align: center;"
    );
    div.innerText = `${x.name}  ${x.price}`;
    child.append(div);
    div.addEventListener("click", () => {
      selector.childNodes[0].nodeValue = `${x.name}`;
      price_make(totalPrice, calcArray, iPad);
    });
  });
}

function color_make(selector, child, object) {
  toggle(selector, child, "show");
  object.color.forEach((x) => {
    let div = $c("div").cloneNode(true);
    div.setAttribute(
        "style",
        "padding: 1rem; border: 1px solid #000; margin: .5rem; border-radius: 10px; text-align: center;"
      );
    div.innerText = `${x.name}`;
    child.append(div);
    div.addEventListener("click", () => {
      selector.childNodes[0].nodeValue = `${x.name}`;
      mainPic.children[0].setAttribute("src", x.img);
    });
  });
}

function spec_make(selector, child, object) {
  toggle(selector, child, "show");
  object.spec.forEach((x) => {
    let div = $c("div").cloneNode(true);
    div.setAttribute(
        "style",
        "padding: 1rem; border: 1px solid #000; margin: .5rem; border-radius: 10px; text-align: center;"
      );
    div.innerText = `${x.name}`;
    child.append(div);
    div.addEventListener("click", () => {
      selector.childNodes[0].nodeValue = `${x.name}`;
      price_make(totalPrice, calcArray, iPad);
    });
  });
}

function wifi_make(selector, child, object) {
  toggle(selector, child, "show");
  object.wifi.forEach((x) => {
    let div = $c("div").cloneNode(true);
    div.setAttribute(
        "style",
        "padding: 1rem; border: 1px solid #000; margin: .5rem; border-radius: 10px; text-align: center;"
      );
    div.innerText = `${x.name}`;
    child.append(div);
    div.addEventListener("click", () => {
      selector.childNodes[0].nodeValue = `${x.name}`;
      price_make(totalPrice, calcArray, iPad);
    });
  });
}

function toggle(selector, child, classname) {
  selector.addEventListener("click", (e) => {
    child.classList.toggle(classname);
    child.addEventListener("animationend", () => {});
  });
}

function price_make(selector, array, object) {
  let price = 0;
  let arr = [...object.screen, ...object.spec, ...object.wifi];
  let newArr = arr.filter(
    (x) =>
      x.name == array[0].childNodes[0].nodeValue ||
      x.name == array[1].childNodes[0].nodeValue ||
      x.name == array[2].childNodes[0].nodeValue
  );
  if (!newArr.some((x) => x.name == array[0].childNodes[0].nodeValue)) return;
  newArr.forEach((item) => {
    price += Number(item.total);
    selector.innerText = `NT$ ${price}`;
    stickyPrice.innerText = selector.innerText;
  });
}
