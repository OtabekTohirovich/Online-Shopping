import configs from "../configs";
import {
  getUserCart,
  addProductToCart,
  getProductId,
  deleteProductCart,
} from "../api";

export function cardTemplate(data) {
  const { _id, imgs, quantity, description, name, salePrice } = data;
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
      <div class="card__discription">${description.slice(0, 23)}</div>
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
</div>`;
}

export function displayProducts(data = []) {
  let result = "";
  const productMenuNode = document.querySelector(".card__wreapper");
  data.forEach((product) => {
    const { img, ...docs } = product;
    const imgs = img ? configs.baseImgURL + img : configs.defaultImg + "400";
    result += cardTemplate({ ...docs, imgs });
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

export function displayCart(data = []) {
  let result = "";
  const productMenuNode = document.querySelector(".cart-content");
  let dataResult = 0;
  let dataResul = 0;
  console.log(data);
  data.forEach((category) => {
    const { qty, total, _id } = category;
    const { img, name, salePrice, description } = category.product;
    const imgs = img ? configs.baseImgURL + img : configs.defaultImg + "200";
    const productMenu = document.querySelector(".cart-items");
    const cartTotal = document.querySelector(".cart-total");
    let totalProduct = salePrice;
    result += `
      <div class="cart-item" data-id="${category.product._id}" data-key="${_id}"
      data-total="${total}" data-qty="${qty}">
        <div class="remove-item">
          <i class="fa-solid fa-trash"></i>
        </div>
        <div class="cart__img--wreapper">
          <img width="100%" src="${imgs}" alt="product"> 
        </div>
        <div>
          <h4>${name}</h4>
          <p class="discription__cart">${description}</p>
        </div>
        <div>
          <p class="price__count">${totalProduct} sum</p>
          <div class="caunts">
          <i class="fa-sharp fa-solid fa-minus"></i>
          <p class="item-amount">${qty}</p>
          <i class="fa-solid fa-plus"></i>
          </div>
        </div>
      </div>`;
    dataResul = dataResul + qty;
    dataResult = dataResult + totalProduct;

    productMenu.innerHTML = dataResul;
    productMenuNode.innerHTML = result;
    console.log(dataResult);
    cartTotal.innerHTML = `${dataResult} sum`;
  });
}

export function loadToken() {
  if (localStorage.token && localStorage.user) {
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
    });
  });
}

export function initializeCartEvent(data) {
  const moviesStatus = document.querySelector(".cart-content");

  moviesStatus.addEventListener("click", (event) => {
    const id = event.target.closest(".cart-item")?.dataset?.id;

    console.log(id, "bosilgan");
    if (!id) return;
    const isMenuBtn = event.target
      .closest(".remove-item")
      ?.classList.contains("remove-item");
    console.log(isMenuBtn);
    if (isMenuBtn) {
      const itemId = data.filter((item) => {
        let daata = item.product._id !== id;
        return daata;
      });
      const dataCart = itemId.map((data) => {
        return {
          product: `${data.product._id}`,
          qty: `${data.qty}`,
          total: `${data.total}`,
          _id: `${data._id}`,
        };
      });

      deleteProductCart(localStorage.userId, dataCart ? dataCart : {}).then(
        (data) => {
          console.log(data);
        }
      );
    }
    event.target.parentElement.parentElement.remove();
  });
}

//             product: `${data.product._id}`,
//             qty: `${data.qty}`,
//             total: `${data.total}`,
//             _id: `${data._id}`,

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
      let addProductSave = element
        .closest(".save__cart")
        ?.classList.contains("save__cart");
      if (addProductSave) {
        if (!id) return;
        console.log(id);
        const userId = localStorage.userId;
        const cartToltals = document.querySelector(".cart-items");

        addProductToCart(userId, id).then((data) => {
          console.log(data);
          cartToltals + 1;
        });
      }
    });
  });
}

export function handleCart() {
  const cartOverlay = document.querySelector(".cart-overlay");
  const cartDOM = document.querySelector(".cart");
  const cartBtns = document.querySelector(".cart__btns");
  const closeCartBtn = document.querySelector(".close-cart");
  cartBtns.addEventListener("click", () => {
    cartOverlay.classList.add("transparentBcg");
    cartDOM.classList.add("showCart");
  });
  closeCartBtn.addEventListener("click", () => {
    cartOverlay.classList.remove("transparentBcg");
    cartDOM.classList.remove("showCart");
  });
}

export function displayAccount(data = []) {
  let result = "";
  const productMenuNode = document.querySelector(".account__wreapper");
  const { _id, name, img, address, email, lastName, phone, createdAt } = data;
  const imgs = img ? configs.baseImgURL + img : configs.defaultImg + "400";
  result += `<div class="account" data-id="${_id}">
      <div class="card__img">
        <img width="20%" src="${imgs}" alt="product">
      </div>
       <h1 class="user__name">${name}</h1>
       <p class="user__lastname">${lastName}</p>
       <p class="user__lastname">${address}</p>
       <p class="user__lastname">${email}</p>
       <p class="user__lastname">${phone}</p>
       <p class="user__lastname">${createdAt.slice(0, 10)}</p>

       </div>`;
  productMenuNode.innerHTML = result;
}
