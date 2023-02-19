export function initializeUserDetails() {
  const cardNodeList = document.querySelectorAll(".product__link");
  cardNodeList.forEach((card) => {
    card.addEventListener("click", (event) => {
      const element = event.target;
      const id = card?.dataset?.id;
      if (!id) return;
      let showDetails =
        element.closest(".userClick")?.classList.contains("userClick");
      if (showDetails) {
        history.pushState({ id }, null, "/user-details.html");
        location.reload();
      }
    });
  });
}
