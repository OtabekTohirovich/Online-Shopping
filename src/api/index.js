import axios from "../utils/axios";

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
  return axios.post(url,  quary
  );
}

export function getProducts() {
  let url = `products/public`;
  return axios.get(url);
}

export function getCategories() {
  let url = `categories/`;
  return axios.get(url);
}


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
    price: quary.price,
    salePrice: quary.salePrice,
    quantity: quary.quantity,
    description: `${quary.description}`,
    categoryId: `${quary.categoryId}`
  });
}


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
    product: _id,
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

export function postOrder(id, customer, items, total) {
  let url = `orders/`;
  return axios.post(url , {
    cartId: `${id}`,
    customer: customer,
    items: items,
    total: total
  });
}

export function getAllUserOrder() {
  let url = `orders`;
  return axios.get(url);
}

export function deleteUserOrder(id) {
  let url = `orders/${id}/delete`;
  return axios.delete(url);
}


export function completedUserOrder(id) {
  let url = `orders/${id}/change-status`;
  return axios.put(url, {
    status: "completed"
  });
}

export function cancelUserOrder(id) {
  let url = `orders/${id}/change-status`;
  return axios.put(url, {
    status: "canceled"
  });
}




export function getFavority(id) {
  let url = `favorites/all/${id}`;
  return axios.get(url);
}

export function postFavority(userId, productId) {
  let url = `favorites/`;
  return axios.post(url, {
    productId:`${productId}`,
    userId: `${userId}`
  });
}

export function deleteFavority(userId, productId) {
  let url = `favorites/${productId}`;
  return axios.delete(url, {
    "customerId": userId
  });
}


export function categoryFiltrSearch(id) {
  let url = `products/category/${id}/`;
  return axios.get(url);
}

export function costumerOrder(id) {
  let url = `orders/customer/${id}`;
  return axios.get(url);
}


export function searchProducts(query) {
  let url = `products/search/${query}/page=${1}`;
  return axios.get(url);
}


export function updateProduct( id ,query) {
  let url = `products/${id}/edit`;
  return axios.put(url, query);
}