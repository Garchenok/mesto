import {
  initialCards,
  config,
  buttonOpenEditProfilePopup,
  popupElementProfile,
  userName,
  userJob,
  formEditProfile,
  nameInput,
  jobInput,
  elementsList,
  popupElementCard,
  popupFormCard,
  buttonOpenAddCardPopup,
  popupInputTypeCardName,
  popupInputTypeCardLink,
  popupElementImage,
  popupImage,
  popupFigcaption,
  submitButtonProfile,
  buttonClosePopupProfile,
  buttonClosePopupCard,
  buttonClosePopupImage,
} from "./constants.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

//ВАЛИДАЦИЯ ФОРМ на основе класса
const validationFormCard = new FormValidator(config, popupFormCard);
validationFormCard.enableValidation();

const validationForm = new FormValidator(config, formEditProfile);
validationForm.enableValidation();

// ф-ия открытия попапа просмотра картинок
function openViewImage(name, link) {
  popupFigcaption.textContent = name;
  popupImage.src = link;
  popupImage.alt = name;
  openPopup(popupElementImage);
}

//рендер карточек
function renderElement(data) {
  // создание карточек с помощью класса
  const card = new Card(data, "#element-template", openViewImage);
  const templateElement = card.generateCard();
  return templateElement;
}
initialCards.forEach((item) => {
  elementsList.append(renderElement(item));
});

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
function openPopup(popup) {
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
  validationForm.disableSubmitButton();
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
