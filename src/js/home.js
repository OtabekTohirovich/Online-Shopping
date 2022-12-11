export function loadToken() {
  if (localStorage.token) {
    let img__wrapper = document.querySelector(".account__state");
    let nav__link = document.querySelector(".add__person");
    if (!img__wrapper) return;
    img__wrapper.remove();
    nav__link.classList.remove("hide");
  }
}



