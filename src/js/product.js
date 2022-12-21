import configs from "../configs";
export function displayProduct(data = []) {
  let result = "";
  const productMenuNode = document.querySelector(".product__wreapper");

  const { _id, img, name, description, salePrice } = data;
  const imgs = img ? configs.baseImgURL + img : configs.defaultImg + "400";
  result += `<div class="product__link" data-id="${_id}">  <img src="${imgs}" alt="home"> <h1>${name}</h1> <p>${description}</p> <div>${salePrice} ming</div> </div>`;
  productMenuNode.innerHTML = result;
}
