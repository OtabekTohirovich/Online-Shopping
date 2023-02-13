import configs from "../configs";
import { createNewProduct, getCategories, singIn, } from "../api";
import { CreateProduct } from "./edit-product";

import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export function displayProduct(data = []) {
  let result = "";
  const productMenuNode = document.querySelector(".product__wreapper");

  const { _id, img, name, description, salePrice } = data;
  const imgs = img ? configs.baseImgURL + img : configs.defaultImg + "400";
  result += `<div class="product__link" data-id="${_id}">  <img src="${imgs}" alt="home"> <h1>${name}</h1> <p>${description}</p> <div>${salePrice} ming</div> </div>
  <div class="caunts  counts__all--cs">
          </div>
  `;
  productMenuNode.innerHTML = result;
}

export function displayCategoryProduct(data) {
  let result = "";
  const categoryNode = document.querySelector(".category");
  data.forEach((cate) => {
    const { _id, name } = cate;
    result += ` <option value="${_id}">${name}</option>`;
  });
  categoryNode.innerHTML = result;
}

export function addProductsCount() {
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
      location.assign('/admin-dashboard.html')
    });
  });
}

export function signInsForm() {
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
        console.log(data.payload.role);
        if(data.payload.role == `user`){
          console.log(data);
          localStorage.token = data.token;
          localStorage.userId = data.payload._id;
          localStorage.user = JSON.stringify(data.payload.role);
          location.assign("/");
        }
        else {
          return Toastify({
            text: `You are not User`,
            duration: 3000,
          }).showToast();
          
        }
      })
      .catch((err) => {
      });
  });
}

export function signInAdmins() {
  const signInForm = document.querySelector(".signIn_form");
    signInForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = {
        email: signInForm.email.value,
        password: signInForm.password.value,
      };
      if (formData.email !== 'sanjarbekweb@gmail.com') {
        return Toastify({
          text: `You are not Admin`,
          duration: 3000,
        }).showToast();
      };
      singIn(formData)
        .then(({ data }) => {
          if(data.payload.role === `admin`){
            localStorage.token = data.token;
            localStorage.userId = data.payload._id;
            localStorage.user = JSON.stringify(data.payload.role);
            location.assign('/admin-dashboard.html')
          }
          else {
            Toastify({
              text: `You are not Admin`,
              duration: 3000,
            }).showToast();
            location.assign("/sign-in.html");
          }
          
        })
        .catch((err) => {
          
        });
    });
}