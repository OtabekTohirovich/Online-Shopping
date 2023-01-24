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
      initializeProduct();
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
