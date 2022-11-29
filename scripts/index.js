import initialCards from "./arrays.js";

const editButton = document.querySelector(".profile__edit-button");
const popupElement = document.querySelector(".popup_profile");
const popupAll = document.querySelectorAll(".popup");
const closeButton = document.querySelectorAll(".popup__close-button");
const userName = document.querySelector(".profile__title");
const userJob = document.querySelector(".profile__subtitle");
const popupForm = document.querySelector(".popup__form");
const nameInput = popupForm.querySelector(".popup__input_type_name");
const jobInput = popupForm.querySelector(".popup__input_type_job");
// для карточек
const elementsList = document.querySelector(".elements__list");
const elementTemplate = document
  .querySelector("#element-template")
  .content.querySelector(".element");
const popupElementCard = document.querySelector(".popup_card");
const popuFormCard = popupElementCard.querySelector(".popup__form_card");
const addButton = document.querySelector(".profile__add-button");
const popupInputTypeCardName = popupElementCard.querySelector(
  ".popup__input_type_card-name"
);
const popupInputTypeCardLink = popupElementCard.querySelector(
  ".popup__input_type_card-link"
);
const popupElementImage = document.querySelector(".popup_image");
const popupImage = document.querySelector(".popup__image");
const popupFigcaption = document.querySelector(".popup__figcaption");

// открыть попап добавления карточек
function openPopupCard() {
  popupElementCard.classList.add("popup_opened");
}
// обработчик для октрытия попапа добавления карточек
addButton.addEventListener("click", openPopupCard);

// открыть попап просмотра изображения
function openPopupImage() {
  popupElementImage.classList.add("popup_opened");
}

const openViewImage = (item) => {
  popupFigcaption.textContent = item.name;
  popupImage.src = item.link;
  popupImage.alt = item.name;
  openPopupImage();
};

//ф-ия которая создает массив по элементам
function createElement(item) {
  //создаем элемент с данными из переменной где хранится темплейт
  const elementCard = elementTemplate.cloneNode(true);
  const elementTitle = elementCard.querySelector(".element__title");
  const elementImage = elementCard.querySelector(".element__image");
  const elementLikeButton = elementCard.querySelector(".element__like-button");
  const elementDeleteButton = elementCard.querySelector(
    ".element__delete-button"
  );

  elementImage.src = item.link;
  elementTitle.textContent = item.name;

  //Обработчик событий для кнопок лайков и удаления
  elementLikeButton.addEventListener("click", clickLike);
  elementDeleteButton.addEventListener("click", clickDelete);
  elementImage.addEventListener("click", () => openViewImage(item));

  return elementCard;
}

// ф-ия добавления и удаления лайка
const clickLike = (evt) => {
  evt.target.classList.toggle("element__like-button_active");
};
// ф-ия удаления карточки
const clickDelete = (evt) => {
  evt.target.closest(".element").remove();
};
// ф-ия создания и добавления карточки
const renderElement = (item, wrapElement) => {
  const card = createElement(item);
  wrapElement.prepend(card);
};

initialCards.forEach(function (item) {
  renderElement(item, elementsList);
});

// ф-ия сохранения карточки с данными
const handleFormSubmit = (evt) => {
  evt.preventDefault();
  const elementCard = {
    name: popupInputTypeCardName.value,
    link: popupInputTypeCardLink.value,
  };
  renderElement(elementCard, elementsList);
  popuFormCard.reset();
  closePopup();
};

// обработчик
popupElementCard.addEventListener("submit", handleFormSubmit);

// открыть попап с теми значениями которые отображаются в профиле
function openPopup() {
  popupElement.classList.add("popup_opened");
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

// закрытие всех попапов
const closePopup = function () {
  popupAll.forEach((allPopup) => {
    allPopup.classList.remove("popup_opened");
  });
};

// редактировать и сохранять информацию в попап
// информация не сохраняется между перезагрузками страницы
function formSubmitHandler(evt) {
  evt.preventDefault(); // отменяет стандартную отправку формы
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup();
}

// обработчики событий
editButton.addEventListener("click", openPopup);
closeButton.forEach((allCloseButton) => {
  allCloseButton.addEventListener("click", closePopup);
});
popupForm.addEventListener("submit", formSubmitHandler);
