import "./style";
import {
  getProducts,
  getCategories,
  fetchProduct,
  getUsers,
  getAccount,
  deleteAllProducts,
  getAllUserOrder,
  getFavority,
  getUserCart,
  addProductToCart,
} from "../api";
import {
  loadToken,
  initializeMEvent,
  displayProducts,
  initializeProduct,
  displayCategory,
  handleCart,
  displayAccount,
  deleteAllCartProduct,
  cartTotalsCount,
  getCartUsera,
  sortCategory,
  sortNavbar,
  signUpForm,
} from "./home";
import {
  displayProductsEdit,
  handleInitializeProduct,
  displayCategoryEdit,
  handleInitializeCategory,
} from "./edit-product";
import {
  displayProduct,
  addProductsCount,
  signInsForm,
  signInAdmins,
} from "./product";

import { displayUsers, handleInitializeUsers } from "./all-users";
import { displayAllUserOrder, initializeOrderEvent, orderForms } from "./order";

document.addEventListener("DOMContentLoaded", async (e) => {
  addEventListener("popstate", (event) => {
    location.reload();
  });
  const page = location.pathname;

  if (page === "/index.html" || page === "/") {
    const chanegeAccount = document.querySelector(".add__person");
    chanegeAccount.addEventListener("click", () => {
      location.assign("/account.html");
    });

    getProducts().then(({ data }) => {
      console.log(data.data);
      displayProducts(data.data);
      let datastate = data.data;
      console.log(datastate, 'salom');
      initializeProduct();
      getUserCart().then(({ data }) => {
        console.log(data);
        data.payload.items.forEach(element => {
          const itemId = datastate.filter((item) => {
            return item._id == element.product._id;
          });  
          let dasas = document.querySelectorAll('.card')
          console.log(itemId[0]);
          if (itemId[0]) {
            dasas.forEach(dastas=>{
              if (dastas.dataset.id == itemId[0]._id) {
                dastas.children[1].children[3].innerHTML = `<button class="savatda_bor">Savatda bor</button>`
              }
            })
            
          }
        });
        
      })
    });

    getCategories()
      .then(({ data }) => {
        console.log(data);
        displayCategory(data.payload);
      })
      .catch((err) => {
        if (err) {
          location.assign("sign-in.html");
        }
      });

      



    deleteAllCartProduct();
  }

  if (page === "/account.html" || page === "/account") {
    getAccount().then(({ data }) => {
      console.log(data);
      displayAccount(data.payload);
    });
    getFavority(localStorage.userId).then(({ data }) => {
      console.log(data);
    });
  }

  if (page === "/sign-up.html" || page === "/sign-up") {
    signUpForm();
  }

  if (page === "/sign-in.html" || page === "/sign-in") {
    signInsForm();
  }
  if (page === "/signin-admin.html" || page === "/signin-admin") {
    signInAdmins();
  }
  if (page === "/product.html" || page === "/product") {
    fetchProduct(history.state.id).then(({ data }) => {
      console.log(data);
      displayProduct(data);
      const id = data._id;
      getUserCart().then(({ data }) => {
        console.log(data);
        const itemId = data.payload.items.filter((item) => {
          return item.product._id === id;
        });
        // console.log(itemId[0].qty);
        let counts = document.querySelector(".counts__all--cs");
        if (itemId.length) {
          counts.innerHTML = `<i class="fa-sharp fa-solid fa-minus"></i>
          <p class="item-amount product__counts--cards">${itemId[0].qty}</p>
          <i class="fa-solid fa-plus  added__product"></i>`;
        }
        if (!itemId.length) {
          counts.innerHTML = `<button class="addto__cart">Savatga qo'shish</button>`;
        }
        let dadad = document.querySelector(".added__product");
        const dadda = document.querySelector(".addto__cart");
        if (dadda) {
          dadda.addEventListener("click", () => {
            addProductToCart(localStorage.userId, id).then(({ data }) => {
              console.log(data);
              counts.innerHTML = `<i class="fa-sharp fa-solid fa-minus"></i>
          <p class="item-amount product__counts--cards">${1}</p>
          <i class="fa-solid fa-plus  added__product"></i>`;
            });
          });
        }
        if (dadad) {
          dadad.addEventListener("click", () => {
            addProductToCart(localStorage.userId, id).then(({ data }) => {
              console.log(data);
              const itemId = data.payload.items.filter((item) => {
                return item.product._id === id;
              });
              console.log(itemId);
              let counsttsd = document.querySelector(".product__counts--cards");
              counsttsd.innerHTML = itemId[0].qty;
            });
          });
        }
      });
    });
  }
  if (page === "/edit-admin.html" || page === "/edit-admin") {
    getProducts().then(({ data }) => {
      console.log(data.data);
      displayProductsEdit(data.data);
      // initializeProduct();
      const deleteALLProducts = document.querySelector(
        ".delete__all--products"
      );
      if (deleteALLProducts) {
        deleteALLProducts.addEventListener("click", () => {
          deleteAllProducts().then((data) => {
            console.log(data);
            const allProducts = document.querySelector(".all__products");
            allProducts.innerHTML = "";
          });
        });
      }
      handleInitializeProduct();
    });
  }
  if (page === "/add-product.html" || page === "/add-product") {
    addProductsCount();
  }

  if (page === "/all-users.html" || page === "/all-users") {
    getUsers().then(({ data }) => {
      console.log(data);
      displayUsers(data);
      handleInitializeUsers();
    });
  }

  if (page === "/category.html" || page === "/category") {
    getCategories().then(({ data }) => {
      console.log(data);
      displayCategoryEdit(data.payload);
      handleInitializeCategory();
    });
    sortCategory();
  }
  if (page === "/cart-checkout.html" || page === "/cart-checkout") {
    orderForms();
  }

  if (page === "/order.html" || page === "/order") {
    getAllUserOrder().then(({ data }) => {
      console.log(data);
      displayAllUserOrder(data.data);
      initializeOrderEvent();
    });
  }

  const herader = document.querySelector(".navbar");
  if (herader) {
    handleCart();
  }
  initializeMEvent();
  sortNavbar();
  getCartUsera();
  cartTotalsCount();
  loadToken();
});
