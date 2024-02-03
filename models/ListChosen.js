import { dataJSON } from "../utils/callData.js";
import choseItem from "./ChoseItem.js";


const tabPanes = dataJSON.tabPanes,
  tabContent = document.querySelector(".tab-content"), navPills = dataJSON.navPills,
  currentModel = document.querySelectorAll(".contain div")
let userChosen = { idTypeChosen: 0, typeChosen: "topclothes", itemChosen: "" }, 
model = {}



let saveValueLocalStorage = (key, value) => {
  var stringValue = JSON.stringify(value);
  localStorage.setItem(key, stringValue);
};

let getValueLocalStorage = key => {
  var dataLocal = localStorage.getItem(key);
  if (dataLocal) {
    switch(key) {
      case "UserChosen":
        userChosen = JSON.parse(dataLocal);
        saveValueLocalStorage(key, userChosen);
      break;
      case "Model": 
        model = JSON.parse(dataLocal)
        saveValueLocalStorage(key, model)
      break
    }
    listChosen();
  } else {
    listChosen()
  }
};

let renderListChosen = () => {
  let htmls = navPills.map((e, id) => {
    return `<li class="nav-item ${userChosen.idTypeChosen == id ? "active" : ""}">
                <a  class="nav-link">
                ${e.showName}</a>
                </li>`;
  });
  document.querySelector(".nav.nav-pills").innerHTML = htmls.join("");
};

export default function listChosen() {
  renderListChosen();
  choseItem()
  let navItem = document.querySelectorAll(".nav-item");
  navItem.forEach((e, id) => {
    e.addEventListener("click", () => {
      userChosen.idTypeChosen = id;
      userChosen.typeChosen = navPills[id].type;
      document.querySelector(".nav-item.active").classList.remove("active");
      e.classList.add("active");
      choseItem()
      saveValueLocalStorage("UserChosen", userChosen);
    });
  });
}

export { getValueLocalStorage, saveValueLocalStorage, userChosen, tabPanes, tabContent, model, currentModel};

console.log("DataList: ", navPills)
console.log("DataItem: ", tabPanes)
