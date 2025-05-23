// FormValidator.js

export class FormValidator {
    // Private fields
    #config
    #formElement
    #inputList
    #buttonElement

    /**
     * @param {Object} config – validation settings:
     *   {
     *     inputSelector: string,
     *     submitButtonSelector: string,
     *     inactiveButtonClass: string,
     *     inputErrorClass: string,
     *     errorClass: string
     *   }
     * @param {HTMLFormElement} formElement – the form to validate
     */
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

    // Show error message for a single input
    #showInputError(inputElement) {
        const errorElem = this.#formElement.querySelector(
            `#${inputElement.id}-error`
        )
        inputElement.classList.add(this.#config.inputErrorClass)
        if (errorElem) {
            errorElem.textContent = inputElement.validationMessage
            errorElem.classList.add(this.#config.errorClass)
        }
    }

    // Hide error message for a single input
    #hideInputError(inputElement) {
        const errorElem = this.#formElement.querySelector(
            `#${inputElement.id}-error`
        )
        inputElement.classList.remove(this.#config.inputErrorClass)
        if (errorElem) {
            errorElem.textContent = ''
            errorElem.classList.remove(this.#config.errorClass)
        }
    }

    // Check validity and show/hide error accordingly
    #checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this.#showInputError(inputElement)
        } else {
            this.#hideInputError(inputElement)
        }
    }

    // Toggle the submit button enabled/disabled state
    #toggleButtonState() {
        const formIsValid = this.#inputList.every(
            (input) => input.validity.valid
        )
        this.#buttonElement.disabled = !formIsValid
        this.#buttonElement.classList.toggle(
            this.#config.inactiveButtonClass,
            !formIsValid
        )
    }

    // Set event listeners on inputs
    #setEventListeners() {
        // Initialize button state
        this.#toggleButtonState()

        this.#inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this.#checkInputValidity(inputElement)
                this.#toggleButtonState()
            })
        })
    }

    /**
     * Public method.
     * Enables validation: attaches listeners for real-time validation.
     */
    enableValidation() {
        this.#setEventListeners()
    }
}
