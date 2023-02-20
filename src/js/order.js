import {
  getProductId,
  deleteUserOrder,
  completedUserOrder,
  cancelUserOrder,
  getUserCart,
  postOrder,
} from "../api";
import { OrderData } from "./sign_up";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export function displayAllUserOrder(data = []) {
  let result = "";
  const orderMenuNode = document.querySelector(".order__all--user");
  data.forEach((data) => {
    const {
      contact,
      customerId,
      items,
      paymentType,
      shipping,
      status,
      total,
    } = data;
    items.forEach((data) => {
      getProductId(data.product).then(({ data }) => {
        console.log(data);
      });
    });

    result += `
      <div class="user__order rounded p-5" data-id="${data?._id}">
        <div class="order__contact">
          <h2>For contact</h2>
          <div class="name__contact">${contact?.name}</div>
          <div class="email__contact">${contact?.email}</div>
          <div class="phone__contact">${contact?.phone}</div>
        </div>
        <div class="order__costumer" data-id="${customerId?._id}">
          <h3>Costumer</h3>
          <div class="name__contact">${customerId?.name}</div>
          <div class="email__contact">${customerId?.email}</div>
          <div class="phone__contact">${customerId?.phone}</div>
        </div>
        <div class="payment__type">${paymentType}</div>
        <div class="order__shipping">
          <h3>Costumer data</h3>
          <div class="name__contact">${shipping?.address}</div>
          <div class="email__contact">${shipping?.city}</div>
          <div class="phone__contact">${shipping?.zip}</div>
        </div>
        <div>
          <div class="payment__type">${status}</div>
          <div class="payment__type">${total}</div>
        </div>
        <button class="complated__order btn btn-primary">Completed order</button>
        <button class="cansel__order btn btn-danger">Cancel order</button>
      </div>
    `;
  });
  orderMenuNode.innerHTML = result;
}


export function displayCostumerOrder(data = []) {
  let result = "";
  const orderMenuNode = document.querySelector(".order__all--user");
  if (!data.length) {
    return orderMenuNode.innerHTML = `<div class="not__found--cate"> You don't buy nothings yet !!!</div>`
  };
  data.forEach((data) => {
    const {
      contact,
      customerId,
      items,
      paymentType,
      shipping,
      status,
      total,
      _id,
    } = data;
    items.forEach((data) => {
      getProductId(data.product).then(({ data }) => {
        // console.log(data);
      });
    });

    result += `
      <div class="user__order rounded p-5" data-id="${_id}">
        <div class="order__contact">
          <h2>For contact</h2>
          <div class="name__contact">${contact.name}</div>
          <div class="email__contact">${contact.email}</div>
          <div class="phone__contact">${contact.phone}</div>
        </div>
        <div class="order__costumer" data-id="${customerId._id}">
          <h3>Costumer</h3>
          <div class="name__contact">${customerId.name}</div>
          <div class="email__contact">${customerId.email}</div>
          <div class="phone__contact">${customerId.phone}</div>
        </div>
        <div class="payment__type">${paymentType}</div>
        <div class="order__shipping">
          <h3>Costumer data</h3>
          <div class="name__contact">${shipping.address}</div>
          <div class="email__contact">${shipping.city}</div>
          <div class="phone__contact">${shipping.zip}</div>
        </div>
        <div>
          <div class="payment__type">${status}</div>
          <div class="payment__type">${total}</div>
        </div>
        <button class="remove__order btn btn-secondary">Remove</button>
      </div>
    `;
  });
  orderMenuNode.innerHTML = result;
}

export function initializeOrderEvent() {
  const orders = document.querySelectorAll(".user__order");

  orders.forEach((order) => {
    order.addEventListener("click", (event) => {
      const element = event.target;
      const id = order?.dataset?.id;
      let complatedOrder = element
        .closest(".complated__order")
        ?.classList.contains("complated__order");
      if (complatedOrder) {
        if (!id) return;
        completedUserOrder(id).then(({ data }) => {
          console.log(data);
          event.target.parentElement.remove();
        });
      }
      let cancelOrder = element
        .closest(".cansel__order")
        ?.classList.contains("cansel__order");
      if (cancelOrder) {
        if (!id) return;
        cancelUserOrder(id).then(({ data }) => {
          console.log(data);
          // event.target.parentElement.remove()
        });
      }
    });
  });
}

export function initializeOrderEventUser() {
  const orders = document.querySelectorAll(".user__order");

  orders.forEach((order) => {
    order.addEventListener("click", (event) => {
      const element = event.target;
      const id = order?.dataset?.id;
      let complatedOrder = element
        .closest(".complated__order")
        ?.classList.contains("complated__order");
      if (complatedOrder) {
        if (!id) return;
        completedUserOrder(id).then(({ data }) => {
          console.log(data);
          event.target.parentElement.remove();
        });
      }
      let cancelOrder = element
        .closest(".cansel__order")
        ?.classList.contains("cansel__order");
      if (cancelOrder) {
        if (!id) return;
        cancelUserOrder(id).then(({ data }) => {
          console.log(data);
          // event.target.parentElement.remove()
        });
      }
    });
  });
}

export function initializeCostumerEvent() {
  const orders = document.querySelectorAll(".user__order");

  orders.forEach((order) => {
    order.addEventListener("click", (event) => {
      const element = event.target;
      const id = order?.dataset?.id;
      let deleteOrder = element
        .closest(".remove__order")
        ?.classList.contains("remove__order");
      if (deleteOrder) {
        if (!id) return;
        deleteUserOrder(id).then(({ data }) => {
          console.log(data);
          Toastify({
            text: 'Remove order !!!',
            duration: 3000,
          }).showToast();
          event.target.parentElement.remove();
        });
      }
    });
  });
}

export function orderForms() {
  const form = document.querySelector(".form__order");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new OrderData(
      form.name.value,
      form.phone.value,
      form.address.value,
      form.city.value,
      form.zip.value,
      form.email.value
    );
    getUserCart().then(({ data }) => {
      console.log(data);
      const itemId = data.payload.items.map((data) => {
        return {
          product: `${data.product._id}`,
          qty: `${data.qty}`,
          total: `${data.total}`,
        };
      });
      let totals = 0;
      const total = data.payload.items.forEach((data) => {
        totals = totals + data.total;
      });
      console.log(itemId, totals);

      postOrder(localStorage.userId, formData, itemId, totals).then(
        ({ data }) => {
          console.log(data);
          location.assign('/')
        }
      );
    });
  });
}
