const dropdown = document.querySelector(".select-action");
const memberModal = document.querySelector(".member-dialog");
const adminModal = document.querySelector(".admin-dialog");

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

const handleMemberModalToggle = (e) => {
  const clickedElement = e.target;
  const isElementModalOpen = clickedElement.closest(".member-toggle.add");
  const isElementModalClose = clickedElement.closest(
    'dialog button[type="reset"]',
  );

  if (isElementModalOpen) {
    memberModal.showModal();
  }

  if (isElementModalClose) {
    memberModal.close();
  }
};

const handleAdminModalToggle = (e) => {
  const clickedElement = e.target;
  const isElementModalOpen = clickedElement.closest(".admin-toggle");
  const isElementModalClose = clickedElement.closest(
    'dialog button[type="reset"]',
  );

  if (isElementModalOpen) {
    adminModal.showModal();
  }

  if (isElementModalClose) {
    adminModal.close();
  }
};

window.addEventListener("click", handleDropdownClick);
window.addEventListener("click", handleMemberModalToggle);
window.addEventListener("click", handleAdminModalToggle);
