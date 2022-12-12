const checkInputValidity = (input, config) => {
  const error = document.querySelector(`#${input.id}-error`);

  if (input.validity.valid) {
    // если true убрать ошибку
    error.textContent = "";
    error.classList.remove(config.errorClass);
    input.classList.remove(config.inputErrorClass);
  } else {
    // если false показать ошибку
    error.textContent = input.validationMessage;
    error.classList.add(config.errorClass);
    input.classList.add(config.inputErrorClass);
  }
};

const toggleButtonState = (inputs, button, config) => {
  const isFormValid = inputs.every((input) => input.validity.valid); //проверяем что каждый инпут валидный

  if (isFormValid) {
    //если каждый инпут массива возвращает true, то
    //активировать кнопку
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = "";
  } else {
    //если каждый инпут массива возвращает false, то
    //деактивировать кнопку
    button.classList.add(config.inactiveButtonClass);
    button.disabled = "disabled";
  }
};

const enableValidation = (config) => {
  const { formSelector, inputSelector, submitButtonSelector, ...restConfig } =
    config;

  const forms = [...document.querySelectorAll(formSelector)];

  forms.forEach((form) => {
    const inputs = [...form.querySelectorAll(inputSelector)];
    const button = form.querySelector(submitButtonSelector);

    form.addEventListener("submit", (evt) => {
      evt.preventDefault(); //когда у формы происходит сабмит отменяет отправку формы
    });

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        checkInputValidity(input, restConfig);
        toggleButtonState(inputs, button, restConfig);
      });
    });
  });
};

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

enableValidation(config);
