const editButton = document.querySelector(".profile__edit-button");
const popupElement = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-button");
const userName = document.querySelector(".profile__title");
const userJob = document.querySelector(".profile__subtitle");
const popupForm = document.querySelector(".popup__form");
const nameInput = popupForm.querySelector(".popup__input_type_name");
const jobInput = popupForm.querySelector(".popup__input_type_job");

// открыть попап с теми значениями, которые отображаются на странице
function openPopup() {
  popupElement.classList.add("popup_opened");
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}
editButton.addEventListener("click", openPopup);
// закрыть попап
function closePopup() {
  popupElement.classList.remove("popup_opened");
}
closeButton.addEventListener("click", closePopup);

// редактировать и сохранять информацию в попап
// информация не сохраняется между перезагрузками страницы
function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup();
}
popupForm.addEventListener("submit", formSubmitHandler);
