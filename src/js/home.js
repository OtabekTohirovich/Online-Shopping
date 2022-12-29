import configs from "../configs";
import {getCart, addProductToCart} from "../api"

export function cardTemplate(data) {
  const { _id, imgs, quantity, description, name, salePrice} = data;
  // const nameTitle = name ? name : data.category.name;
  return ` <div class="col container">
  <article class="card" data-id="${_id}">
    <div class="card__header">
      <div class="card__img">
        <img width="100%" src="${imgs}" alt="product">
      </div>
    </div>
    <div class="card__body">
      <div class="card__title">${name}</div>
      <div class="card__discription">${description.slice(0 ,23)}</div>
      <div class="card__count">
        <div class="card__prise">
          ${salePrice} ming
        </div>
        <div class="count__products">${quantity} k/n</div>
      </div>
      <div class="card__btn">
        <button class="btns  save__cart">Savatga qo'shish</button>
      </div>
    </div>
    
  </article>
</div>`
}

export function displayProducts(data = []) {
  let result = "";
  const productMenuNode = document.querySelector(".card__wreapper");
  data.forEach((product) => {
    const { img , ...docs } = product;
    const imgs = img ? configs.baseImgURL + img : configs.defaultImg + "400";
    result += cardTemplate({ ...docs, imgs});
  });
  productMenuNode.innerHTML = result;
}

export function displayCategory(data = []) {
  let result = "";
  const productMenuNode = document.querySelector(".category");
  data.forEach((category) => {
    const { _id, name } = category;
    result += `<div class="category__link" data-id="${_id}"> <p>${name}</p> </div>`;
  });
  productMenuNode.innerHTML = result;
}


export function loadToken() {
  if (localStorage.token) {
    let img__wrapper = document.querySelector(".account__state");
    let nav__link = document.querySelector(".add__person");
    if (!img__wrapper) return;
    img__wrapper.remove();
    nav__link.classList.remove("hide");
  }
}


export function initializeMEvent() {
  const navNodeList = document.querySelectorAll(".nav__item");
  navNodeList.forEach((nav) => {
    nav.addEventListener("click", (event) => {
      let isMenuBtn = event.target
        .closest(".navbar__btns")
        ?.classList.contains("navbar__btns");
      if (isMenuBtn) {
        let navContent = nav.querySelector(".nav__content");
        navContent.classList.toggle("show");
        nav.classList.toggle("show");
      }
      let isCartBtn = event.target
        .closest(".cart__btns")
        ?.classList.contains("cart__btns");
      if (isCartBtn) {
        console.log("hello");
        getCart()
      }
    });
  });
}


export function initializeProduct() {
  const cardNodeList = document.querySelectorAll(".card");
  cardNodeList.forEach((card) => {
    card.addEventListener("click", (event) => {
      const element = event.target;
      const id = card?.dataset?.id;
      let showDetails =
        element.closest(".card__img")?.classList.contains("card__img") ||
        element.closest(".card__title")?.classList.contains("card__title");
      if (showDetails) {
        if (!id) return;
        history.pushState({ id }, null, "/product.html");
        location.reload();
      }
      let addProductSave = element.closest(".save__cart")?.classList.contains("save__cart");
      if (addProductSave) {
        if (!id) return;
       console.log(id);
       addProductToCart(id).then((data)=>{
        console.log(data);
       })
      }
    });
  });
}

