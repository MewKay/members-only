const postButtonSelector = ".create-post-button";
const closeFormSelector = "button.close";
const postButton = document.querySelector(postButtonSelector);
const postForm = document.querySelector(".create-post-container form");

window.addEventListener("click", (e) => {
  const clickedElement = e.target;
  const isElementPostButton = clickedElement.closest(postButtonSelector);
  const isElementCloseFormButton = clickedElement.closest(closeFormSelector);

  if (isElementPostButton || isElementCloseFormButton) {
    postButton.classList.toggle("hidden");
    postForm.classList.toggle("hidden");
  }
});
