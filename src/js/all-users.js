import configs from "../configs";
import { deleteUser } from "../api";
export function displayUsers(data = []) {
  let result = "";
  const productMenuNode = document.querySelector(".users__wreapper");
  data.forEach((users) => {
    const { _id, img, name, lastName, phone, email } = users;
    const imgs = img ? configs.baseImgURL + img : configs.defaultImg + "400";
    result += `  
  <div class="col" >
    <article class="product__link" data-id="${_id}">
    <img class="userClick" src="${imgs}" alt="home" />
    <h1>${name}</h1>
    <p>${lastName}</p>
    <div>${phone}</div>
    <h4>${email}</h4>
    <div class="btn">
    <button>add</button>
    <button class="btn__remove">O'chirish</button>
    </div>
    </article>
  </div>`;
  });

  productMenuNode.innerHTML = result;
}

export function handleInitializeUsers() {
  const cardNodeList = document.querySelectorAll(".product__link");
  cardNodeList.forEach((user) => {
    user.addEventListener("click", (event) => {
      const element = event.target;
      const id = user?.dataset?.id;
      let showMovieDetails = element
        .closest(".btn__remove")
        ?.classList.contains("btn__remove");
      if (showMovieDetails) {
        if (!id) return;
        deleteUser(id);
        user.parentElement.remove();
      }
    });
  });
}

export function displayUserorder(data) {
  let result = "";
  const productMenuNode = document.querySelector(".user__wreapper");
    const { _id, img, name, lastName, phone, email } = data;
    const imgs = img ? configs.baseImgURL + img : configs.defaultImg + "400";
    result += `  
  <div class="col" >
    <article class="product__link" data-id="${_id}">
    <img class="userClick" src="${imgs}" alt="home" />
    <h1>${name}</h1>
    <p>${lastName}</p>
    <div>${phone}</div>
    <h4>${email}</h4>
    <div class="btn">
    <button>add</button>
    <button class="btn__remove">O'chirish</button>
    </div>
    </article>
  </div>`;
  
  productMenuNode.innerHTML = result;
}