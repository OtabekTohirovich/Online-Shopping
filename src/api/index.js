import axios from "../utils/axios";
// import configs from "../configs";

export function singIn(quary) {
  if (!quary) {
    throw "Please insert quary parametr";
  }
  let url = `auth/sign-in`;
  return axios.post(url, {
    email: `${quary.email}`,
    password: `${quary.password}`
  });
}

export function singUp(quary) {
  if (!quary) {
    throw "Please insert quary parametr";
  }
  let url = `auth/sign-up`;
  return axios.post(url, {
    email: `${quary.email}`,
    password: `${quary.password}`,
    name: `${quary.name}`,
    lastName: `${quary.lastName}`,
    phone: `${quary.phone}`,
    address: `${quary.address}`,
    role: "user"
  });
}

export function getProducts() {
  let url = `products/public`;
  return axios.get(url);
}

export function getCategories() {
  let url = `categories/`;
  return axios.get(url);
}
const token = localStorage.token;
// https://shopzone.onrender.com/categories/
// https://shopzone.onrender.com/products/:id
export function fetchProduct(id) {
  if (!id) {
    throw "Please insert id parametr";
  }
  return axios.get(
    `products/` + id 
  );
}

export function deleteProduct(id) {
  if (!id) {
    throw "Please insert id parametr";
  }
  let url = `products/${id}/delete`;
  return axios.delete(url);
}

export function createNewProduct(quary, file) {
  if (!quary) {
    throw "Please insert quary parametr";
  }
  if (!file) {
    throw "Please insert file parametr";
  }
  let url = `products/`;
  return axios.post(url, {
    name: `${quary.name}`,
    quantity: `${quary.quantity}`,
    description: `${quary.description}`,
    price: `${quary.price}`,
    salePrice: `${quary.salePrice}`,
    brand: `${quary.brand}`,
    img: `${file}`
  });
}


// https://shopzone.onrender.com/products/
