import initialCards from "./constants.js";
// import { resetSpanError, resetInputError } from "./validate.js";
// import { config, resetSpanError, resetInputError } from "./validate.js";
// import { config, resetErrorsCurrentForm } from "./validate.js";
import { Card } from "./Card.js";
import { FormValidator, config } from "./FormValidator.js";
// ----------------------------------------
const buttonOpenEditProfilePopup = document.querySelector(
  ".profile__edit-button"
);
const popupElementProfile = document.querySelector(".popup_profile");
const userName = document.querySelector(".profile__title");
const userJob = document.querySelector(".profile__subtitle");
const formEditProfile = document.querySelector(".popup__form");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_job");

// для карточек
const elementsList = document.querySelector(".elements__list");
//темплейт
// const templateSelector = document.querySelector("#element-template");
// const elementTemplate = document
//   .querySelector("#element-template")
//   .content.querySelector(".element");
const popupElementCard = document.querySelector(".popup_card");
const popupFormCard = popupElementCard.querySelector(".popup__form_card");
const buttonOpenAddCardPopup = document.querySelector(".profile__add-button");
const popupInputTypeCardName = popupElementCard.querySelector(
  ".popup__input_type_card-name"
);
const popupInputTypeCardLink = popupElementCard.querySelector(
  ".popup__input_type_card-link"
);
export const popupElementImage = document.querySelector(".popup_image");
export const popupImage = document.querySelector(".popup__image");
export const popupFigcaption = document.querySelector(".popup__figcaption");
const submitButtonProfile = document.querySelector(
  ".popup__submit-button-profile"
);
//для закрытия попапов
const buttonClosePopupProfile = popupElementProfile.querySelector(
  ".popup__close-button"
);
const buttonClosePopupCard = popupElementCard.querySelector(
  ".popup__close-button"
);
const buttonClosePopupImage = popupElementImage.querySelector(
  ".popup__close-button"
);

//ВАЛИДАЦИЯ ФОРМ
const validationFormCard = new FormValidator(config, popupFormCard);
validationFormCard.enableValidation();

const validationForm = new FormValidator(config, formEditProfile);
validationForm.enableValidation();

// ф-ия открытия попапа просмотра картинок
// function openViewImage(item) {
//   popupFigcaption.textContent = item.name;
//   popupImage.src = item.link;
//   popupImage.alt = item.name;
//   openPopup(popupElementImage);
// }

//ф-ия которая создает массив по элементам
//начало ф-ии
// function createElement(item) {
//   //создаем элемент с данными из переменной где хранится темплейт
//   const elementCard = elementTemplate.cloneNode(true);
//   const elementTitle = elementCard.querySelector(".element__title");
//   const elementImage = elementCard.querySelector(".element__image");
//   const elementLikeButton = elementCard.querySelector(".element__like-button");
//   const elementDeleteButton = elementCard.querySelector(
//     ".element__delete-button"
//   );

//   elementImage.src = item.link;
//   elementTitle.textContent = item.name;
//   elementImage.alt = item.name;

//   //Обработчик событий для кнопок лайков, удаления карточек с картинками
//   // и просмотра картинок (все в одной ф-ии)
//   elementLikeButton.addEventListener("click", clickLike);
//   elementDeleteButton.addEventListener("click", clickDelete);
//   elementImage.addEventListener("click", () => openViewImage(item)); //эквивалентно ("click", function () {
//   // return openViewImage(item)}

//   return elementCard;
// } //конец ф-ии

// ф-ия добавления и удаления лайка
// function clickLike(evt) {
//   evt.target.classList.toggle("element__like-button_active");
// }

// ф-ия удаления карточки
// function clickDelete(evt) {
//   evt.target.closest(".element").remove();
// }

// ф-ия создает элемент (вызывая createElement)
// и добавляет его на страницу
// item -объект с данными elementCard
// wrapElement - элемент, в который добавится наш новый elementCard

function renderElement(data) {
  // создание карточек с помощью класса
  const card = new Card(data, "#element-template");
  const templateElement = card.generateCard();
  return templateElement;
}
initialCards.forEach((item) => {
  elementsList.append(renderElement(item));
});

// initialCards.forEach((item) => {
//   const card = new Card(item, ".element-template");
//   const cardElement = card.generateCard();
//   // добавляем в DOM
//   document.querySelector(".elements__list").append(cardElement);
// });

// // ф-ия сохранения карточки с данными в форму
// const handleFormSubmitCard = (evt) => {
//   evt.preventDefault();
//   renderElement(popupInputTypeCardName.value, popupInputTypeCardLink.value);
//   closePopup(popupElementCard);
//   popupFormCard.reset(); //сброс полей инпутов
// };

// ф-ия сохранения карточки с данными в форму
function handleFormSubmitCard(evt) {
  evt.preventDefault();
  // сами создаем объект, который будем передавать в renderElement
  const elementCard = {
    name: popupInputTypeCardName.value,
    link: popupInputTypeCardLink.value,
  };
  elementsList.prepend(renderElement(elementCard)); // добавляем новую карточку

  renderElement(elementCard, elementsList);
  closePopup(popupElementCard);
  popupFormCard.reset(); //сброс полей инпутов
}

// Закрытие попапа кликом на оверлей
const closeByClickOverlay = (evt) => {
  if (evt.target == evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
};

//Закрытие попапа нажатием на Esc
const handleKeyUp = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

// ф-ия для открытия попапов
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keyup", handleKeyUp);
}

// ф-ия закрытия попапов
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keyup", handleKeyUp);
}

// редактировать и сохранять информацию в попап
// информация не сохраняется между перезагрузками страницы
function submitEditProfileForm(evt) {
  evt.preventDefault(); // отменяет стандартную отправку формы
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(popupElementProfile);
}

// обработчики событий на клики на оверлей
popupElementProfile.addEventListener("click", closeByClickOverlay);
popupElementCard.addEventListener("click", closeByClickOverlay);
popupElementImage.addEventListener("click", closeByClickOverlay);

// обработчик ф-ии сохранения карточки с данными
popupElementCard.addEventListener("submit", handleFormSubmitCard);
// обработчик для октрытия попапа добавления карточек
buttonOpenAddCardPopup.addEventListener("click", function () {
  openPopup(popupElementCard);
});
// обработчик события кнопки редактирования профиля
// значения импутов = значениям в профиле
buttonOpenEditProfilePopup.addEventListener("click", function () {
  openPopup(popupElementProfile);
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  validationForm.resetErrorsCurrentForm(); //сбрасывает ошибки с текущей
  //формы, это нужно чтобы не было вот такого результата, когда закрывается
  //невалидная форма, а при следующем открытии форма вроде бы заполнена
  //корректно, но подсвечивается ошибка с прошлого раза
  // resetSpanError(config);
  // resetInputError(config);
  submitButtonProfile.classList.remove("popup__submit-button_inactive"); // при открытии удаляет инактив класс
  submitButtonProfile.disabled = false; //при открытии дает возможность отправки формы, т.к. поля ВАЛИДНЫ
});
// обработчики событий на кнопки закрытия попапов
buttonClosePopupProfile.addEventListener("click", function () {
  closePopup(popupElementProfile);
});
buttonClosePopupCard.addEventListener("click", function () {
  closePopup(popupElementCard);
});
buttonClosePopupImage.addEventListener("click", function () {
  closePopup(popupElementImage);
});

// обработчик сабмита профиля
formEditProfile.addEventListener("submit", submitEditProfileForm);
