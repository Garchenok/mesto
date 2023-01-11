export class FormValidator {
  // 1й параметр объект настроек, 2й элемент формы которая валидируется
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  //приватный метод который перебирает мссив и находит невалидный инпут
  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  //приватный метод который переключает активность кнопок
  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  };

  // приватный метод показать сообщение об ошибке
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    // Устанавливаем errorMessage в качестве значения textContent для formError
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  //приватный метод спрятать сообщение об ошибке
  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  //приватный метод проверки валидности поля
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage); //Передаем сообщение об ошибке
    } else {
      this._hideInputError(inputElement);
    }
  };

  //приватный слушатель который добавляет сообщения об ошибках
  _setEventListeners = () => {
    this._toggleButtonState(); // деактивируем кнопку при 1й загрузке

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
        this._formElement.addEventListener("reset", () => {
          setTimeout(() => {
            // setTimeout применяется, что бы дождаться очищения формы
            this._toggleButtonState();
          }, 0); // 0 млс и после reset сработает деактивация кнопки
        });
      });
    });
  };

  //публичный метод который будет сбрасывать ошибки с текущей формы
  resetErrorsCurrentForm() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  //публичный метод который при открытии удаляет инактив класс
  //и дает возможность отправки формы, т.к. поля ВАЛИДНЫ
  disableSubmitButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  //публичный метод который включает валидацию
  enableValidation = () => {
    this._setEventListeners();
  };
}
