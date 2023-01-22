import {
  getProductId,
  deleteUserOrder,
  completedUserOrder,
  cancelUserOrder,
} from "../api";

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
      _id,
    } = data;
    items.forEach((data) => {
      getProductId(data.product).then(({ data }) => {
        console.log(data);
      });
    });

    result += `
      <div class="user__order" data-id="${_id}">
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
        <button class="remove__order">Remove</button>
        <button class="complated__order">Completed order</button>
        <button class="cansel__order">Cancel order</button>
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
      let deleteOrder = element
        .closest(".remove__order")
        ?.classList.contains("remove__order");
      if (deleteOrder) {
        if (!id) return;
        deleteUserOrder(id).then(({ data }) => {
          console.log(data);
          event.target.parentElement.remove();
        });
      }
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
