import configs from "../configs";
import { createNewProduct, getCategories } from "../api";
import {
  CreateProduct
} from "./edit-product";

export function displayProduct(data = []) {
  let result = "";
  const productMenuNode = document.querySelector(".product__wreapper");

  const { _id, img, name, description, salePrice } = data;
  const imgs = img ? configs.baseImgURL + img : configs.defaultImg + "400";
  result += `<div class="product__link" data-id="${_id}">  <img src="${imgs}" alt="home"> <h1>${name}</h1> <p>${description}</p> <div>${salePrice} ming</div> </div>`;
  productMenuNode.innerHTML = result;
}

export function displayCategoryProduct(data) {
  let result = "";
  const categoryNode = document.querySelector(".category");
  data.forEach(cate => {
    const { _id, name} = cate;
    result += ` <option value="${_id}">${name}</option>`
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
      });
    });
}