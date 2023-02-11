export function initializeProductEdit() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener('click', (e)=>{
      const element = e.target;
        console.log(card);
        const id = card?.dataset?.id;
      let showDetails =
        element.closest(".update__product")?.classList.contains("update__product");
      if (showDetails) {
        if (!id) return;
        history.pushState({ id }, null, "/updateproduct.html");
        location.reload();
      }
    })
  });
}
