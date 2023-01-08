import "./style";
import {
  singIn,
  singUp,
  getProducts,
  getCategories,
  fetchProduct,
  createNewProduct,
  getUsers,
  addCategory,
  getAccount,
  deleteAllProducts,
  createCart,
  getUserCart,
} from "../api";
import { SignUp } from "./sign_up";
import {
  loadToken,
  initializeMEvent,
  displayProducts,
  initializeProduct,
  displayCategory,
  handleCart,
  displayAccount,
  displayCart,
  initializeCartEvent,
} from "./home";
import { displayUsers, handleInitializeUsers } from "./all-users";
import {
  displayProductsEdit,
  handleInitializeProduct,
  CreateProduct,
  CreateCategory,
  displayCategoryEdit,
  handleInitializeCategory,
} from "./edit-product";
import { displayProduct, displayCategoryProduct } from "./product";
document.addEventListener("DOMContentLoaded", async (e) => {
  addEventListener("popstate", (event) => {
    location.reload();
  });
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
    let cart = document.querySelector(".cart__btns");
    if (cart) {
      cart.addEventListener("click", () => {
        getUserCart().then(({data}) => {
          console.log(data);
          displayCart(data.payload.items);
          initializeCartEvent();
        });
        
      });
    }
    

    getCategories().then(({ data }) => {
      console.log(data);
      displayCategory(data.payload);
    });
    handleCart();
  }

  if (page === "/account.html" || page === "/account") {
    getAccount().then(({ data }) => {
      console.log(data);
      displayAccount(data.payload);
    });
    handleCart();
  }

  initializeMEvent();
  if (page === "/sign-up.html" || page === "/sign-up") {
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

  if (page === "/sign-in.html" || page === "/sign-in") {
    const signInForm = document.querySelector(".signIn_form");
    signInForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = {
        email: signInForm.email.value,
        password: signInForm.password.value,
      };
      console.log(formData);
      singIn(formData)
        .then(({ data }) => {
          console.log(data);
          localStorage.token = data.token;
          localStorage.userId = data.payload._id;
          localStorage.user = JSON.stringify(data.payload.role);
          location.assign("/");
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
  if (page === "/signin-admin.html" || page === "/signin-admin") {
    const signInForm = document.querySelector(".signIn_form");
    signInForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = {
        email: signInForm.email.value,
        password: signInForm.password.value,
      };
      console.log(formData);
      singIn(formData)
        .then(({ data }) => {
          console.log(data);
          localStorage.token = data.token;
          localStorage.user = JSON.stringify(data.payload.role);
          location.assign("/");
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

    // deleteProduct()
  }
  if (page === "/add-product.html" || page === "/add-product") {
    const fileForm = document.forms[0];
    const createForm = document.forms[1];
    getCategories().then(({ data }) => {
      console.log(data);
      displayCategoryProduct(data.payload);
    });
    createForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new CreateProduct(
        createForm.name.value,
        createForm.price.value,
        createForm.salePrice.value,
        createForm.quantity.value,
        createForm.description.value,
        createForm.categoryId.value
      );
      createNewProduct(formData).then((data) => {
        console.log(data);
      });
    });
    const fileInput = fileForm.files;
    fileInput.addEventListener("change", (e) => {
      // e.preventDefault();
      console.log(fileInput);
      console.log(fileInput.files);
      if (fileInput.files && fileInput.files.length) {
        var img = document.querySelector(".newbook__img");
        img.onload = () => {
          URL.revokeObjectURL(img.src); // no longer needed, free memory
        };

        img.src = URL.createObjectURL(fileInput.files[0]); // set src to blob url
      }
    });
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

    let genreWrapper = document.querySelector(".category__wreapperss");
    getCategories().then(({ data }) => {
      console.log(data);
      let genresTemplate = "";
      data.payload.forEach((genre) => {
        genresTemplate += `<li class="category__type"><input name="categoryId" type="radio" id=${genre._id} value=${genre._id}  /> <label for="${genre._id}">${genre.name}</label></li>`;
      });
      genreWrapper.innerHTML = genresTemplate;
    });
    const formProduct = document.querySelector(".create__products");
    const fileForm = document.querySelector(".new_book_img_form");
    formProduct.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new CreateProduct(
        formProduct.name.value,
        formProduct.price.value,
        formProduct.salePrice.value,
        formProduct.quantity.value,
        formProduct.description.value,
        formProduct.categoryId.value
      );

      console.log(formData);
      createNewProduct(formData).then((data) => {
        console.log(data);
      });
    });
  }

  loadToken();
});
