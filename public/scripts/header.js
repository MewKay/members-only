const dropdown = document.querySelector(".select-action");

const handleDropdownClick = (e) => {
  const clickedElement = e.target;
  const isElementDropdownButton = clickedElement.closest(".actions-expand");
  const isElementDropdownMenu = clickedElement.closest(".select-action");

  if (isElementDropdownButton) {
    dropdown.classList.toggle("hidden");
    return;
  }

  if (!isElementDropdownMenu) {
    dropdown.classList.add("hidden");
  }
};

window.addEventListener("click", handleDropdownClick);
