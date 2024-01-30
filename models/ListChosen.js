import { dataJSON } from "../utils/callData.js";
import choseItem from "./ChoseItem.js";


const tabPanes = dataJSON.tabPanes,
  tabContent = document.querySelector(".tab-content"), navPills = dataJSON.navPills;
let userChosen = { idChosen: 0, typeChosen: "topclothes", itemChosen: "" };


let saveValueLocalStorage = (key, value) => {
  var stringValue = JSON.stringify(value);
  localStorage.setItem(key, stringValue);
};

let getValueLocalStorage = (key) => {
  var dataLocal = localStorage.getItem(key);
  if (dataLocal) {
    userChosen = JSON.parse(dataLocal);
    saveValueLocalStorage("UserChosen", userChosen);
    listChosen();
  } else {
    listChosen()
  }
};

let renderListChosen = () => {
  let htmls = navPills.map((e, id) => {
    return `<li class="nav-item ${id} ${userChosen.idChosen == id ? "active" : ""}">
                <a  class="nav-link">
                ${e.showName}</a>
                </li>`;
  });
  document.querySelector(".nav.nav-pills").innerHTML = htmls.join("");
};

export default function listChosen() {
  renderListChosen();
  let navItem = document.querySelectorAll(".nav-item");
  navItem.forEach((e, id) => {
    e.addEventListener("click", () => {
      userChosen.idChosen = id;
      userChosen.typeChosen = navPills[id].type;
      document.querySelector(".nav-item.active").classList.remove("active");
      e.classList.toggle("active");
      choseItem()
      saveValueLocalStorage("UserChosen", userChosen);
    });
  });
  choseItem()
}

export { getValueLocalStorage, saveValueLocalStorage, userChosen, tabPanes, tabContent, navPills };

console.log("DataList: ", navPills)
console.log("DataItem: ", tabPanes)
