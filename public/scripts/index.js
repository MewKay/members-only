const postButton = document.querySelector(".create-post-button");
const postForm = document.querySelector(".create-post-container form");
const closeFormButton = document.querySelector("button.close");

window.addEventListener("click", (e) => {
  if (e.target === postButton || e.target === closeFormButton) {
    postButton.classList.toggle("hidden");
    postForm.classList.toggle("hidden");
  }
});
