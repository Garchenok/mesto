import initialCards from "./constants.js";

const buttonOpenEditProfilePopup = document.querySelector(
  ".profile__edit-button"
);
const popupElement = document.querySelector(".popup_profile");
const buttonsClosePopup = document.querySelectorAll(".popup__close-button");
const userName = document.querySelector(".profile__title");
const userJob = document.querySelector(".profile__subtitle");
const formEditProfile = document.querySelector(".popup__form");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_job");
// для карточек
const elementsList = document.querySelector(".elements__list");
const elementTemplate = document
  .querySelector("#element-template")
  .content.querySelector(".element");
const popupElementCard = document.querySelector(".popup_card");
const popuFormCard = popupElementCard.querySelector(".popup__form_card");
const buttonOpenAddCardPopup = document.querySelector(".profile__add-button");
const popupInputTypeCardName = popupElementCard.querySelector(
  ".popup__input_type_card-name"
);
const popupInputTypeCardLink = popupElementCard.querySelector(
  ".popup__input_type_card-link"
);
const popupElementImage = document.querySelector(".popup_image");
const popupImage = document.querySelector(".popup__image");
const popupFigcaption = document.querySelector(".popup__figcaption");

// ф-ия открытия попапа просмотра картинок
function openViewImage(item) {
  popupFigcaption.textContent = item.name;
  popupImage.src = item.link;
  popupImage.alt = item.name;
  openPopup(popupElementImage);
}

//ф-ия которая создает массив по элементам
//начало ф-ии
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
  elementImage.alt = item.name;

  //Обработчик событий для кнопок лайков, удаления карточек с картинками
  // и просмотра картинок (все в одной ф-ии)
  elementLikeButton.addEventListener("click", clickLike);
  elementDeleteButton.addEventListener("click", clickDelete);
  elementImage.addEventListener("click", () => openViewImage(item)); //эквивалентно ("click", function () {
  // return openViewImage(item)}

  return elementCard;
} //конец ф-ии

// ф-ия добавления и удаления лайка
function clickLike(evt) {
  evt.target.classList.toggle("element__like-button_active");
}

// ф-ия удаления карточки
function clickDelete(evt) {
  evt.target.closest(".element").remove();
}

// ф-ия создает элемент (вызывая createElement)
// и добавляет его на страницу
// item -объект с данными elementCard
// wrapElement - элемент, в который добавится наш новый elementCard
function renderElement(item, wrapElement) {
  const card = createElement(item);
  wrapElement.prepend(card);
}
initialCards.forEach(function (item) {
  renderElement(item, elementsList);
});

// ф-ия сохранения карточки с данными в форму
function handleFormSubmitCard(evt) {
  evt.preventDefault();
  // сами создаем объект, который будем передавать в renderElement
  const elementCard = {
    name: popupInputTypeCardName.value,
    link: popupInputTypeCardLink.value,
  };
  renderElement(elementCard, elementsList);
  popuFormCard.reset(); //сброс полей импутов
  closePopup(popupElementCard);
}

// ф-ия для открытия всех попапов
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

// закрытие всех попапов
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// редактировать и сохранять информацию в попап
// информация не сохраняется между перезагрузками страницы
function submitEditProfileForm(evt) {
  evt.preventDefault(); // отменяет стандартную отправку формы
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(popupElement);
}

// обработчик ф-ии сохранения карточки с данными
popupElementCard.addEventListener("submit", handleFormSubmitCard);
// обработчик для октрытия попапа добавления карточек
buttonOpenAddCardPopup.addEventListener("click", function () {
  openPopup(popupElementCard);
});
// обработчик события кнопки редактирования профиля
// значения импутов = значениям в профиле
buttonOpenEditProfilePopup.addEventListener("click", function () {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  openPopup(popupElement);
});
// обработчик событий на все кнопки закрытия
buttonsClosePopup.forEach(function (element) {
  const popup = element.closest(".popup");
  element.addEventListener("click", function () {
    closePopup(popup);
  });
});
// обработчик сабмита профиля
formEditProfile.addEventListener("submit", submitEditProfileForm);
