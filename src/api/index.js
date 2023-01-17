import { sampleSize } from "lodash";
import axios from "../utils/axios";
// import configs from "../configs";

export function singIn(quary) {
  if (!quary) {
    throw "Please insert quary parametr";
  }
  let url = `auth/sign-in`;
  return axios.post(url, {
    email: `${quary.email}`,
    password: `${quary.password}`,
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
    role: "user",
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
// https://shopzone.onrender.com/categories/
// https://shopzone.onrender.com/products/:id
export function fetchProduct(id) {
  if (!id) {
    throw "Please insert id parametr";
  }
  return axios.get(`products/` + id);
}

export function deleteProductCart(id, items) {
  let url = `cart/${id}/remove`;

  return axios.put(url, {
    id: `${id}`,
    items: items
  });
}
export function deleteProduct(id) {
  if (!id) {
    throw "Please insert id parametr";
  }
  let url = `products/${id}/delete`;
  return axios.delete(url);
}

export function createNewProduct(quary) {
  if (!quary) {
    throw "Please insert quary parametr";
  }
  let url = `products/`;
  return axios.post(url, {
    name: `${quary.name}`,
    price: `${quary.price}`,
    salePrice: `${quary.salePrice}`,
    quantity: `${quary.quantity}`,
    description: `${quary.description}`,
    categoryId: `${quary.categoryId}`
  });
}

// https://shopzone.onrender.com/products/

// https://shopzone.onrender.com/cart/

export function createCart() {
  let url = `cart/`;
  return axios.post(url);
}

export function deleteCartAllProduct(id) {
  if (!id) {
    throw "Please insert id parametr";
  }
  let url = `cart/${id}/empty`;
  return axios.delete(url);
}

// https://shopzone.onrender.com/cart/63b80af2903b140035b088d8/add



export function removeitemsProductCart(id, items) {
  let url = `cart/${id}/remove`;

  return axios.put(url, {
    id: `${id}`,
    items: items
  });
}

export function getCart() {
  let url = `cart/`;
  return axios.get(url);
}

export function addProductToCart(id, _id) {
  if (!id && !_id) {
    throw "Please insert id parametr";
  }
  let url = `cart/${id}/add`;
  return axios.post(url, {
    product: `${_id}`,
    total: 3000,
    qty: 1,
  });
}

export function getUserCart() {
  let url = `cart/${localStorage.userId}`;
  return axios.get(url);
}

export function getProductId(id) {
  let url = `products/${id}`;
  return axios.get(url);
}


// https://shopzone.onrender.com/products/63b7bcc7b501550034523c5f

// https://shopzone.onrender.com/cart/63b80af2903b140035b088d8
// https://shopzone.onrender.com/cart/63a193ad8783650034674d1e/add

// https://shopzone.onrender.com/

export function getUsers() {
  let url = `users/`;
  return axios.get(url);
}

export function deleteUser(id) {
  if (!id) {
    throw "Please insert id parametr";
  }
  let url = `users/${id}/delete`;
  return axios.get(url);
}

export function addCategory(query) {
  if (!query) {
    throw "Please insert query parametr";
  }
  let url = `categories/`;
  return axios.post(url, {
    name: `${query.name}`,
  });
}

export function deleteCategory(id) {
  if (!id) {
    throw "Please insert id parametr";
  }
  let url = `categories/${id}`;
  return axios.delete(url);
}

export function editCategory(id, text) {
  if (!id) {
    throw "Please insert id parametr";
  }
  let url = `categories/${id}`;
  return axios.put(url, {
    name: `${text}`,
  });
}



export function getAccount() {
  let url = `auth/profile`;
  return axios.get(url);
}


export function deleteAllProducts() {
  let url = `products/delete-all`;
  return axios.get(url);
}

export function postOrder(id, customer) {
  let url = `orders`;
  return axios.get(url , {
    customerId: id,
    status: "pending",
    contact: {
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    },
    shipping: {
      address: customer.address,
      city: customer.city,
      zip: customer.zip,
    }
  });
}

