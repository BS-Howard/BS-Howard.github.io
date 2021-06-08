var product = [
  {
    name: "iPhone",
    pic: "pic/iphone11-all.png",
    color: [
      {
        color: "black",
        colorValue: "#000",
        img: "pic/iphone11-black.png",
      },
      {
        color: "green",
        colorValue: "#68eed1",
        img: "pic/iphone11-green.png",
      },
      {
        color: "yellow",
        colorValue: "#dfeb35",
        img: "pic/iphone11-yellow.png",
      },
    ],
    spec: [
      { storage: "64GB", price: "NT$19900" },
      { storage: "128GB", price: "NT$21500" },
      { storage: "256GB", price: "NT$25000" },
    ],
  },
  {
    name: "iPad",
    pic: "pic/ipad-all.png",
    color: [
      {
        color: "gray",
        colorValue: "#6e6e73",
        img: "pic/ipad-gray.png",
      },
      {
        color: "pink",
        colorValue: "#fc3e63",
        img: "pic/ipad-pink.png",
      },
      {
        color: "silver",
        colorValue: "#e8e8ed",
        img: "pic/ipad-silver.png",
      },
    ],
    spec: [
      { storage: "32GB", price: "NT$10500" },
      { storage: "128GB", price: "NT$13500" },
    ],
  },
  {
    name: "watch",
    pic: "pic/watch-all.jpg",
    color: [
      {
        color: "blue",
        colorValue: "#2d1cc7",
        img: "pic/watch-blue.jpg",
      },
      {
        color: "green",
        colorValue: "#0070c9",
        img: "pic/watch-green.jpg",
      },
      {
        color: "red",
        colorValue: "#e21d4e",
        img: "pic/watch-red.jpg",
      },
    ],
    spec: [
      { mm: "40 mm", price: "NT$14400" },
      { mm: "44 mm", price: "NT$15400" },
    ],
  },
];

// Start
const AllButton = document.querySelectorAll("button");

AllButton.forEach((X,index) => {
  X.addEventListener("click", () => {
    let mainPic = document.querySelector("#mainPic");
    let colorDiv = document.querySelector(".color");
    let priceDiv = document.querySelector(".price");
    let specDiv = document.querySelector(".spec");
    // 清空
    mainPic.innerText = ""
    colorDiv.innerText = ""
    priceDiv.innerText = ""
    specDiv.innerText = ""
    // main Picture
    mainPic = document.querySelector("#mainPic");
    var img = document.createElement("img");
    img.setAttribute("src", product[index].pic);
    mainPic.appendChild(img);

    // Color
    colorDiv = document.querySelector(".color");
    let colorItem = product[index].color;
    colorItem.forEach((item) => {
      let div = document.createElement("div");
      let firstDiv = document.createElement("div");
      let secondDiv = document.createElement("div");
      div.classList.add("col-6", "col-md-4");
      firstDiv.style.backgroundColor = item.colorValue;
      firstDiv.style.height = "3rem";
      secondDiv.innerText = item.color;
      div.append(firstDiv, secondDiv);
      colorDiv.appendChild(div);
      div.addEventListener("click", () => {
        img.setAttribute("src", item.img);
      });
    });

    // Price
    priceDiv = document.querySelector(".price");
    let pdiv = document.createElement("div");
    priceDiv.appendChild(pdiv);
    // Spec
    specDiv = document.querySelector(".spec");
    let specItem = product[index].spec;
    specItem.forEach((item) => {
      let div = document.createElement("div");
      let firstDiv = document.createElement("div");
      let secondDiv = document.createElement("div");
      div.classList.add("col-6", "col-md-4");
      if(item.hasOwnProperty("mm")){
        firstDiv.innerText = item.mm
      } else {
        firstDiv.innerText = item.storage;
      }
      secondDiv.innerText = item.price;
      div.append(firstDiv, secondDiv);
      specDiv.appendChild(div);

      // Price

      div.addEventListener("click", () => {
        pdiv.classList.add("col-12");
        pdiv.innerHTML = `<h1>${item.price}</h1>`;
      });
    });
  });
});