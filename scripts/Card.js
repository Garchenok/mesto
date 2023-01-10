import { openPopup } from "./index.js";
import { popupElementImage, popupFigcaption, popupImage } from "./index.js";
// const popupElementImage = document.querySelector(".popup_image");
// const popupFigcaption = document.querySelector(".popup__figcaption");
// const popupImage = document.querySelector(".popup__image");

// класс Card
export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  // приватный метод класса (клонировать темплейт)
  _getTemplate() {
    const templateElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return templateElement;
  }

  // публичный метод класса который возвращает полностью
  // работоспособный и наполненный данными элемент карточки.
  generateCard() {
    this._element = this._getTemplate();

    this._elementImage = this._element.querySelector(".element__image");
    this._elementTitle = this._element.querySelector(".element__title");
    this._elementLikeButton = this._element.querySelector(
      ".element__like-button"
    );
    this._elementDeleteButton = this._element.querySelector(
      ".element__delete-button"
    );

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  // приватные слушатели событий на сгенерированные карточки
  _setEventListeners() {
    //слушатель карточки
    this._elementImage.addEventListener("click", () => {
      this._openViewImage();
    });
    // слушатель удаления карточки
    this._elementDeleteButton.addEventListener("click", (evt) => {
      evt.target.closest(".element").remove();
    });
    // слушатель лайка
    this._elementLikeButton.addEventListener("click", (evt) => {
      evt.target.classList.toggle("element__like-button_active");
    });
  }
  // приватный метод для просмотра изображение
  _openViewImage() {
    popupFigcaption.textContent = this._name;
    popupImage.src = this._link;
    popupImage.alt = this._name;
    openPopup(popupElementImage);
  }
}

// initialCards.forEach((item) => {
//   const card = new Card(item, ".element-template");
//   const cardElement = card.generateCard();
//   // добавляем в DOM
//   document.querySelector(".elements__list").append(cardElement);
// });
