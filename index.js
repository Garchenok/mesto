const editButton = document.querySelector(".profile__edit-button");
const popupElement = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-button");

function openPopup() {
  popupElement.classList.add("popup_opened");
}
editButton.addEventListener("click", openPopup);

function closePopup() {
  popupElement.classList.remove("popup_opened");
}
closeButton.addEventListener("click", closePopup);
