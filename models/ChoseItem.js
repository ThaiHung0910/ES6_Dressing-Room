import {
  currentModel,
  model,
  saveValueLocalStorage,
  tabContent,
  tabPanes,
  userChosen,
} from "./ListChosen.js";

let itemUrl = [];

let renderModel = () => {

  for (let key in model) {
    document.querySelector(`.${key}`).style.backgroundImage = model[key];
    itemUrl.forEach((e, id) => {
      if(model[key].includes(e)) {
        document.querySelectorAll('.item_btn').forEach(btn => {
          if(btn.dataset.index == id) {
            btn.innerText = "Bỏ mặc"
            btn.classList.add('chosen')
            userChosen.itemChosen = e
          }
        }) 
       
      }
    })
  }
};

let renderChoseItem = () => {
  let div = document.createElement("div"),
    htmls = [], counter = 0

  div.classList.add("row");

  tabContent.appendChild(div);

  tabPanes.map(e => {
    const { type, imgSrc_jpg, imgSrc_png, name} = e;
    if (userChosen.typeChosen == type) {
      htmls += `<div class="card hovercard col-md-3 item">
      <img src="${imgSrc_jpg}" class="item_img"  alt="">
        <h4>${name}</h4>
        <button class="item_btn" data-index=${counter}>Thử đồ</button>
      </div>`;
      itemUrl.push(`${imgSrc_png}`);
      counter++
    }
  });
  document.querySelector(".tab-content .row").innerHTML = htmls;
};

export default function choseItem() {
  itemUrl = [];
  renderChoseItem();
  renderModel();
  let itemBtn = document.querySelectorAll(".item_btn"),
    { itemChosen, typeChosen } = userChosen;
  
  itemBtn.forEach((e, id) => {
    
    e.addEventListener("click", () => {

      itemBtn.forEach(e => {
        if (e.classList.contains("chosen")) {
          e.innerText = "Thử đồ";
          e.classList.remove("chosen");
        }
      });

      if (itemChosen != itemUrl[id]) {
        itemChosen = itemUrl[id];
        e.innerText = "Bỏ mặc";
        e.classList.add("chosen");
      } else {
        e.innerText = "Thử đồ";
        e.classList.remove("chosen");
        switch (typeChosen) {
          case "topclothes":
            itemChosen = "../assets/images/allbody/bikini_branew.png";
            break;
          case "botclothes":
            itemChosen = "../assets/images/allbody/bikini_pantsnew.png";
            break;
          case "shoes":
            itemChosen = "../assets/images/shoes/shoes1.png";
            break;
          case "background":
            itemChosen = "../assets/images/background/background1.jpg";
            break;
          default:
            itemChosen = "";
        }
      }

      currentModel.forEach(e => {
        let part = e.className,
          value = `url('${itemChosen}')`;

        switch (part) {
          case "bikinitop":
            if (typeChosen == "topclothes") {
              model[part] = value;
            }
            break;
          case "bikinibottom":
            if (typeChosen == "botclothes") {
              model[part] = value;
            }
            break;
          case "feet":
            if (typeChosen == "shoes") {
              model[part] = value;
            }
            break;
          case "handbag":
            if (typeChosen == "handbags") {
              model[part] = value;
            }
            break;
          case "necklace":
            if (typeChosen == "necklaces") {
              model[part] = value;
            }
            break;
          case "hairstyle":
            if (typeChosen == "hairstyle") {
              model[part] = value;
            }
            break;
          case "background":
            if (typeChosen == "background") {
              model[part] = value;
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
