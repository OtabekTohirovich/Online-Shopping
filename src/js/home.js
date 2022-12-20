import configs from "../configs";

export function cardTemplate(data) {
  const { id, imgs, title, description, quantity, name } = data;
  return ` <div class="col container">
  <article class="card">
    <div class="card__header">
      <div class="card__img">
        <img src="${imgs}" alt="product">
      </div>
    </div>
    <div class="card__body">
      <div class="card__title">adas</div>
      <div class="card__discription">${description}</div>
      <div class="card__count">
        <div class="card__prise">
          jhefe
        </div>
        <div class="count__products">312</div>
      </div>
      <div class="card__btn">
        <button>Savatga qo'shish</button>
      </div>

    </div>
    
  </article>
</div>`
}

export function displayProducts(data = []) {
  let result = "";
  const productMenuNode = document.querySelector(".card__wreapper");
  data.forEach((product) => {
    const { img , ...docs } = product;
    const imgs = img
      ? configs.baseImgURL + img
      : configs.defaultImg + "400";
    result += cardTemplate({ ...docs, imgs});
  });
  productMenuNode.innerHTML = result;
}



export function loadToken() {
  if (localStorage.token) {
    let img__wrapper = document.querySelector(".account__state");
    let nav__link = document.querySelector(".add__person");
    if (!img__wrapper) return;
    img__wrapper.remove();
    nav__link.classList.remove("hide");
  }
}


export function initializeMEvent() {
  const navNodeList = document.querySelectorAll(".nav__item");
  navNodeList.forEach((nav) => {
    nav.addEventListener("click", (event) => {
      let isMenuBtn = event.target
        .closest(".navbar__btns")
        ?.classList.contains("navbar__btns");
      if (isMenuBtn) {
        let navContent = nav.querySelector(".nav__content");
        navContent.classList.toggle("show");
        nav.classList.toggle("show");
      }
    });
  });
}




