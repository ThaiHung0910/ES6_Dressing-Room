import {
  currentModel,
  model,
  saveValueLocalStorage,
  tabContent,
  tabPanes,
  userChosen
} from "./ListChosen.js";

let itemUrl = []

let renderModel = () => {
  for (let key in model) {
    document.querySelector(`.${key}`).style.backgroundImage = model[key]
  }
};

let renderChoseItem = () => {
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
  document.querySelector(".tab-content .row").innerHTML = htmls;
};

export default function choseItem() {
  itemUrl = []
  renderChoseItem();
  renderModel();
  let itemBtn = document.querySelectorAll(".item_btn")
  itemBtn.forEach((e, id) => {
    e.addEventListener("click", () => {

      if(userChosen.itemChosen != itemUrl[id]) {
        userChosen.itemChosen = itemUrl[id]
      } else {
        switch (userChosen.typeChosen) {
          case "topclothes":
            userChosen.itemChosen = "../assets/images/allbody/bikini_branew.png"
          break;
          case "botclothes":
            userChosen.itemChosen = "../assets/images/allbody/bikini_pantsnew.png"
          break;
          case "shoes": 
          userChosen.itemChosen = "../assets/images/shoes/shoes1.png"
          break;
          case "background": 
          userChosen.itemChosen = "../assets/images/background/background1.jpg"
          break;
          default:
            userChosen.itemChosen = ""
        }
      } 

      currentModel.forEach((e) => {
        let type = userChosen.typeChosen, item = userChosen.itemChosen ,part = e.className, value = `url('${item}')`
        
        switch (part) {
          case "bikinitop":
            if(type == "topclothes") {
              model[part] = value
              
            }
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
      });

      renderModel();
      saveValueLocalStorage("Model", model);
      saveValueLocalStorage("UserChosen", userChosen);
    });
  });
}
