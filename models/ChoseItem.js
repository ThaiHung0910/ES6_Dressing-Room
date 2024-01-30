import {
  saveValueLocalStorage,
  tabContent,
  tabPanes,
  userChosen,
  navPills,
} from "./ListChosen.js";

let itemUrl = [],
  currentModel = document.querySelectorAll(".contain div"),
  model = {};

currentModel.forEach((e) => {
  model[e.className] = window.getComputedStyle(e).backgroundImage;
  // saveValueLocalStorage("Model", model);
});



let renderModel = () => {
  currentModel.forEach((e, id) => {
    let type = userChosen.typeChosen, item = userChosen.itemChosen ,part = e.className, value = `url('${item}')`
    
    switch (part) {
      case "bikinitop":
        if(type == "topclothes") {
          model[part] = value
        }
        console.log(1)
        break;
      case "bikinibottom":
        if(type == "botclothes") {
          model[part] = value
        }
        break;
      case "feet":
        if(type == "shoes") {
          model[part] = value
        }
        break;
      case "handbag":
        if(type == "handbags") {
          model[part] = value
        }
        break;
      case "necklace":
        if(type == "necklaces") {
          model[part] = value
        }
        break;
      case "hairstyle":
        if(type == "hairstyle") {
          model[part] = value
        }
        break;
      case "background":
        if(type == "background") {
          model[part] = value
        }
        break;
    }
    // saveValueLocalStorage("Model", model)
  });
  
  console.log(model)
  for (let key in model) {
    document.querySelector(`.${key}`).style.backgroundImage = model[key]
  }
  
};


export let renderChoseItem = () => {
  let div = document.createElement("div"),
    htmls = []

  div.classList.add("row");

  tabContent.appendChild(div);

  tabPanes.map((e) => {
    if (userChosen.typeChosen == e.type) {
      htmls += `<div class="card col-md-3 item">
      <img src="${e.imgSrc_jpg}" class="item_img"  alt="">
        <h4>${e.name}</h4>
        <button class="item_btn">Thử đồ</button>
      </div>`;
      itemUrl.push(`${e.imgSrc_png}`);
    }
  });
  console.log(itemUrl)
  document.querySelector(".tab-content .row").innerHTML = htmls;
};

export default function choseItem() {
  itemUrl = []
  renderChoseItem();
  let itemBtn = document.querySelectorAll(".item_btn");
  itemBtn.forEach((e, id) => {
    e.addEventListener("click", () => {
      userChosen.itemChosen = itemUrl[id];
      renderModel();
      saveValueLocalStorage("UserChosen", userChosen);
      console.log(userChosen);
    });
  });
  renderModel();
}
