/* Разбивка кода на ф-ии согласно рекомендациям ревьюера */
// export { resetSpanError, resetInputError };

// перебираем массив, что бы найти поля которые не прошли валидацию
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// ф-ия отвечающая за блокировку кнопки Отправить(Создать)
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

// добавляем ошибку в инпуты
// передаем событию input класс
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  // Устанавливаем errorMessage в качестве значения textContent для formError
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

// удаляем ошибку из инпутов
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

// проверяем formInput на коректность введенных данных и вызываем showError или hideError
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    ); //Передаем сообщение об ошибке
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

//слушатель который добавляет сообщения об ошибках в инпуты
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

//ф-ия сбрасывает текстовые ошибки в спанах
export const resetSpanError = (config) => {
  const spanError = Array.from(
    document.querySelectorAll(config.inputErrorSpan)
  );
  spanError.forEach((error) => {
    error.textContent = "";
  });
};
//ф-ия сбрасыает подчеркивание в инпуте
export const resetInputError = (config) => {
  const inputError = Array.from(
    document.querySelectorAll(config.inputSelector)
  );
  inputError.forEach((error) => {
    error.classList.remove(config.inputErrorClass);
  });
};
// валидация всех форм
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const button = formElement.querySelector(config.submitButtonSelector);
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault;
      button.disabled = true; //кнопка не активна после отправки формы
      button.classList.add(config.inactiveButtonClass); //добавляет класс неактивной кнопки сабмита
    });
    setEventListeners(formElement, config);
  });
};

export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
  inputErrorSpan: ".popup__input-error",
};

enableValidation(config);
