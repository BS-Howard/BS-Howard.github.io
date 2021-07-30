const cancelBtn = document.querySelector(".sm-cancel");
let searchBar = document.querySelector(".searchBar");
let lgSearchBtn = document.querySelector(".lg-search-icon");
let lgSearchTxt = document.querySelector(".lg-search-icon-txt");
let searchPosition = document.querySelector(".search-position");
let locationPart = document.querySelector(".location");
let searchPeople = document.querySelector(".search-people");
let peoplePart = document.querySelector(".people");
let peopleControl = document.querySelectorAll(".people-control");
let peopleValue = document.getElementById("people-value");

// 搜尋按下去的畫面
searchPosition.addEventListener("click", (e) => {
  // 手機板
  if (document.body.clientWidth < 750) {
    locationPart.setAttribute(
      "style",
      `width:100%; display: flex; border-radius: unset; height: 100vh; margin-left: unset`
    );
    searchBar.parentElement.style.backgroundColor = "#fff";
    searchPosition.style.backgroundColor = "transparent";
    cancelBtn.style.display = "block";
    searchBar.classList.add("toggle");
  }
  // 電腦版
  else {
    if(peoplePart.style.opacity == "100"){peoplePart.style.opacity = "0"}
    locationPart.setAttribute(
      "style",
      `width:25rem; display: block; border-radius: 28px; height: 40vh; margin-left: ${searchBar.offsetLeft}px;`
    );
  }
});

// 手機板的搜尋取消
cancelBtn.addEventListener("click", () => {
  locationPart.style.display = "none";
  cancelBtn.style.display = "none";
  searchBar.classList.remove("toggle");
  searchBar.parentElement.style.backgroundColor = "transparent";
});

searchPeople.addEventListener("click", (e) => {
  if(locationPart.style.display == "block"){locationPart.style.display = "none"}
  peoplePart.setAttribute(
    "style",
    ` opacity: 100; margin-left: ${
      searchBar.offsetLeft + searchBar.offsetWidth - peoplePart.offsetWidth
    }px`
  );
  focus(e.target);
});

let temp = 0;
let toddler = 0;
let adultNumber = document.getElementById("adult");
// 新增人數
peopleControl.forEach((x) => {
  // 增加人數
  x.querySelector(".plus").addEventListener("click", (e) => {
    e.target.previousSibling.innerText = `${
      Number(e.target.previousSibling.innerText) + 1
    }`;
    if (x.getAttribute("id") == "toddler") {
      if (temp == 0) {
        temp += 1;
        toddler += 1;
        adultNumber.innerText = "1";
      } else toddler += 1;
    } else if (x.getAttribute("id") == "child" && temp == 0) {
      temp += 2;
      adultNumber.innerText = "1";
    } else {
      temp += 1;
    }
    peopleValue.innerText = `${temp}位，${toddler}位嬰幼兒`;
  });

  // 減少人數
  x.querySelector(".minus").addEventListener("click", (e) => {
    if (e.target.nextSibling.innerText > 0) {
      e.target.nextSibling.innerText = `${
        Number(e.target.nextSibling.innerText) - 1
      }`;
      if (x.getAttribute("id") == "toddler") {
        toddler -= 1;
      } else {
        temp -= 1;
      }
      peopleValue.innerText = `${temp}位，${toddler}位嬰幼兒`;
    }

    // 沒人時清空
    if (temp == 0) {
      peopleValue.innerText = "新增人數";
    }
  });
});

let banner = document.getElementById("banner");
// 電腦版搜尋按下去會跑出"搜尋"
searchBar.addEventListener("click", (e) => {
  // 鎖定
  if (document.body.clientWidth > 750) {
    lgSearchBtn.setAttribute("style", "width: 6rem; border-radius: 28px;");
    lgSearchTxt.style.display = "block";
    banner.style.display = "block";
    banner.addEventListener("click", (e) => {
      // 復原
      e.target.style.display = "none";
      locationPart.style.display = "none";
      peoplePart.style.opacity = "0";
      lgSearchTxt.style.display = "none";
      lgSearchBtn.setAttribute("style", "width: 3rem; border-radius: 28px;");
    });
  }
});

// 日期
const t1 = document.getElementById("in-date-time");
const t2 = document.getElementById("out-date-time");
const picker = new Litepicker({
  element: t1,
  format: "DD MMM YYYY",
  minDate: new Date() - 1,
  autoApply: true,
  useResetBtn: true,
  buttonText: {
    apply: "Done",
    reset: "Reset",
  },
  tooltipText: {
    one: "night",
    other: "nights",
  },
  mobileFriendly: true,
  moduleRanges: false,
  numberOfMonths: 2,
  numberOfColumns: 2,
  singleMode: false,
  moduleNavKeyboard: true,
  setup: (picker) => {
    picker.on("selected", (date1, date2) => {
      t1.innerText = date1.format("M月DD日");
      t2.innerText = date2.format("M月DD日");
    });
  }
});

const picker2 = new Litepicker({
  element: t2,
  format: "DD MMM YYYY",
  minDate: new Date() - 1,
  autoApply: true,
  useResetBtn: true,
  buttonText: {
    apply: "Done",
    reset: "Reset",
  },
  tooltipText: {
    one: "night",
    other: "nights",
  },
  mobileFriendly: true,
  moduleRanges: false,
  numberOfMonths: 2,
  numberOfColumns: 2,
  singleMode: false,
  moduleNavKeyboard: true,
  setup: (picker) => {
    picker.on("selected", (date1, date2) => {
      t1.innerText = date1.format("M月DD日");
      t2.innerText = date2.format("M月DD日");
    });
  }
});

t1.addEventListener('click',()=>{
  change();
})

t2.addEventListener('click',()=>{
  change();
})

function change(){
  if(peoplePart.style.opacity == "100"){peoplePart.style.opacity = "0"}
  else if (locationPart.style.display == "block"){locationPart.style.display = "none"}
}