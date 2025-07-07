export class FormValidator {
    #config
    #formElement
    #inputList
    #buttonElement

    constructor(config, formElement) {
        this.#config = config
        this.#formElement = formElement
        this.#inputList = Array.from(
            this.#formElement.querySelectorAll(this.#config.inputSelector)
        )
        this.#buttonElement = this.#formElement.querySelector(
            this.#config.submitButtonSelector
        )
    }

    // Private: show error message and style
    #showInputError(inputElement, errorMessage) {
        const errorElement = this.#formElement.querySelector(
            `#${inputElement.id}-error`
        )
        inputElement.classList.add(this.#config.inputErrorClass)
        errorElement.textContent = errorMessage
        errorElement.classList.add(this.#config.errorClass)
    }

    // Private: hide error message and style
    #hideInputError(inputElement) {
        const errorElement = this.#formElement.querySelector(
            `#${inputElement.id}-error`
        )
        inputElement.classList.remove(this.#config.inputErrorClass)
        errorElement.textContent = ''
        errorElement.classList.remove(this.#config.errorClass)
    }

    // Private: check input validity
    #checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this.#showInputError(inputElement, inputElement.validationMessage)
        } else {
            this.#hideInputError(inputElement)
        }
    }

    // Private: toggle submit button state
    #toggleButtonState() {
        const hasInvalidInput = this.#inputList.some(
            (inputElement) => !inputElement.validity.valid
        )
        if (hasInvalidInput) {
            this.#buttonElement.classList.add(this.#config.inactiveButtonClass)
            this.#buttonElement.disabled = true
        } else {
            this.#buttonElement.classList.remove(
                this.#config.inactiveButtonClass
            )
            this.#buttonElement.disabled = false
        }
    }

    // Private: set event listeners on inputs
    #setEventListeners() {
        this.#toggleButtonState()
        this.#inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this.#checkInputValidity(inputElement)
                this.#toggleButtonState()
            })
        })
    }

    // Public: enable validation
    enableValidation() {
        this.#setEventListeners()
    }
}
