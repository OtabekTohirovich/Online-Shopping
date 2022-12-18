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
