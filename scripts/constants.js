export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

export const buttonOpenEditProfilePopup = document.querySelector(
  ".profile__edit-button"
);
export const popupElementProfile = document.querySelector(".popup_profile");
export const userName = document.querySelector(".profile__title");
export const userJob = document.querySelector(".profile__subtitle");
export const formEditProfile = document.querySelector(".popup__form");
export const nameInput = formEditProfile.querySelector(
  ".popup__input_type_name"
);
export const jobInput = formEditProfile.querySelector(".popup__input_type_job");

// для карточек
export const elementsList = document.querySelector(".elements__list");
export const popupElementCard = document.querySelector(".popup_card");
export const popupFormCard =
  popupElementCard.querySelector(".popup__form_card");
export const buttonOpenAddCardPopup = document.querySelector(
  ".profile__add-button"
);
export const popupInputTypeCardName = popupElementCard.querySelector(
  ".popup__input_type_card-name"
);
export const popupInputTypeCardLink = popupElementCard.querySelector(
  ".popup__input_type_card-link"
);
export const popupElementImage = document.querySelector(".popup_image");
export const popupImage = document.querySelector(".popup__image");
export const popupFigcaption = document.querySelector(".popup__figcaption");
export const submitButtonProfile = document.querySelector(
  ".popup__submit-button-profile"
);
//для закрытия попапов
export const buttonClosePopupProfile = popupElementProfile.querySelector(
  ".popup__close-button"
);
export const buttonClosePopupCard = popupElementCard.querySelector(
  ".popup__close-button"
);
export const buttonClosePopupImage = popupElementImage.querySelector(
  ".popup__close-button"
);
