import configs from "../configs";
import {
  getUserCart,
  addProductToCart,
  deleteProductCart,
  deleteCartAllProduct,
  getUserCart,
  addCategory,
  singUp,
  createCart
} from "../api";
import { SignUp } from "./sign_up";
import {CreateCategory, handleInitializeCategory} from "./edit-product"

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
    let totalProduct = salePrice * qty;
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
          <i class="fa-solid fa-plus  added__product"></i>
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

export function deleteAllCartProduct() {
  let img__wrapper = document.querySelector(".remove__all--carproduct");
  const id = localStorage.userId;
  if (img__wrapper) {
    img__wrapper.addEventListener("click", () => {
      deleteCartAllProduct(id).then(({ data }) => {
        console.log(data);
        location.assign("/");
      });
    });
  }
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
    let result = 1;
    console.log(id, "bosilgan");
    if (!id) return;
    const isMenuBtn = event.target
      .closest(".remove-item")
      ?.classList.contains("remove-item");

    const cartadd = event.target
      .closest(".added__product")
      ?.classList.contains("added__product");
    console.log(isMenuBtn);
    if (isMenuBtn) {
      const itemId = data.filter((item) => {
        return item.product._id != id;
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
          event.target.parentElement.parentElement.remove();
          const cartOverlay = document.querySelector(".cart-overlay");
          const cartDOM = document.querySelector(".cart");
          cartOverlay.classList.remove("transparentBcg");
          cartDOM.classList.remove("showCart");
        }
      );
    }
    let results;
    let resultssa = 1;
    if (cartadd) {
      let datasd = event.target.previousElementSibling.innerHTML;

      addProductToCart(localStorage.userId, id).then(({ data }) => {
        console.log(data);
        results = datasd;
        // console.log(++results);
        event.target.parentElement.children[1].innerHTML = ++results;
      });
    }
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

export function cartTotalsCount() {
  let dataResult = 0;
  const cartToltals = document.querySelector(".cart-items");
  if (cartToltals) {
    getUserCart().then(({ data }) => {
      console.log(data);
      data.payload.items.forEach((cart) => {
        const { qty } = cart;
        dataResult = dataResult + qty;
        cartToltals.innerHTML = dataResult;
      });
    });
  }
}

export function getCartUsera() {
  let cart = document.querySelector(".cart__btns");
  if (cart) {
    cart.addEventListener("click", () => {
      getUserCart().then(({ data }) => {
        console.log(data);
        displayCart(data.payload.items);
        initializeCartEvent(data.payload.items);
      });
    });
  }
}

export function sortCategory() {
  let formCate = document.querySelector(".addcate");
    if (formCate) {
      formCate.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new CreateCategory(formCate.name.value);

        addCategory(formData).then((data) => {
          console.log(data.data.payload.name);
          let dataCate = document.querySelector(".category");
          dataCate.innerHTML += `<div class="category__link" data-id="${data.data.payload._id}"> 
          <p class="title__cate">${data.data.payload.name}</p> 
           <div class="btn__category--wreapper">
           <button class="edit__category">Edit</button>
           <button class="delete__category">Delete</button>
           </div>
          </div>`;
          handleInitializeCategory();
        });
        formCate.reset();
      });
    }
}

export function sortNavbar() {
  document.addEventListener("click", (e) => {
    const element = e.target;

    let navbarMenu = document.querySelectorAll(".nav__item.show");
    if (!navbarMenu.length) return;

    navbarMenu?.forEach((nav) => {
      nav.classList.remove("show");
      nav.querySelector(".nav__content").classList.remove("show");
    });
    let isMenuBtn = element
      .closest(".navbar__btns")
      ?.classList.contains("navbar__btns");
    if (isMenuBtn) {
      let navMenu = element.closest(".navbar__btns");
      navMenu.nextElementSibling.classList.toggle("show");
      navMenu.parentElement.parentElement.classList.toggle("show");
    }
  });
}

export function signUpForm() {
  const formSignUp = document.querySelector(".form__type");
    formSignUp.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new SignUp(
        formSignUp.name.value,
        formSignUp.lastName.value,
        formSignUp.email.value,
        formSignUp.password.value,
        formSignUp.address.value,
        formSignUp.phone.value
      );
      console.log(formData);
      singUp(formData)
        .then(({ data }) => {
          console.log(data);
          localStorage.token = data.token;
          localStorage.userId = data.user._id;
          localStorage.user = JSON.stringify(data.user.role);
          createCart().then(({ data }) => {
            localStorage.cartid = data.payload._id;
            location.assign("/");
          });
        })
        .catch((err) => {
          Toastify({
            text: err.msg,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
              background: "linear-gradient(to right, red, red)",
            },
            onClick: function () {},
          }).showToast();
          if (err?.path) {
            location.assign(err.path);
          }
        });
    });
}
