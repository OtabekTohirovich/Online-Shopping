import "./style";
import {
  singIn,
  singUp,
  getProducts,
  getCategories,
  fetchProduct,
} from "../api";
import { SignUp } from "./sign_up";
import {
  loadToken,
  initializeMEvent,
  displayProducts,
  initializeProduct,
  displayCategory,
} from "./home";
import { displayProduct } from "./product"
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
    const smallHeader = document.querySelector(".small__header");
    if (smallHeader) {
      smallHeader.addEventListener("click", () => {
        const navSmall = document.querySelector(".nav__smaller");
        navSmall.classList.toggle("hide");
      });
    }
    getProducts().then(({ data }) => {
      console.log(data.data);
      displayProducts(data.data);
      initializeProduct();
    });

    getCategories().then(({data}) => {
      console.log(data);
      displayCategory(data.payload)
    });
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
          localStorage.user = JSON.stringify(data.user.role);
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
    fetchProduct(history.state.id).then(({data}) => {
      console.log(data);
      displayProduct(data)
    });
  }
  loadToken();
});
