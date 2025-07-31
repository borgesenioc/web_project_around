// modificado no sprint 11
export default class FormValidator {
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

    // Método privado: mostra mensagem de erro e estilo
    #showInputError(inputElement, errorMessage) {
        const errorElement = this.#formElement.querySelector(
            `#${inputElement.id}-error`
        )
        inputElement.classList.add(this.#config.inputErrorClass)
        errorElement.textContent = errorMessage
        errorElement.classList.add(this.#config.errorClass)
    }

    // Método privado: esconde mensagem de erro e estilo
    #hideInputError(inputElement) {
        const errorElement = this.#formElement.querySelector(
            `#${inputElement.id}-error`
        )
        inputElement.classList.remove(this.#config.inputErrorClass)
        errorElement.textContent = ''
        errorElement.classList.remove(this.#config.errorClass)
    }

    // Método privado: verifica validade do input
    #checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this.#showInputError(inputElement, inputElement.validationMessage)
        } else {
            this.#hideInputError(inputElement)
        }
    }

    // Método privado: alterna estado do botão submit
    #toggleButtonState() {
        // Only proceed if buttonElement exists
        if (!this.#buttonElement) {
            console.warn('Submit button not found in form', this.#formElement)
            return
        }

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

    // Método privado: configura event listeners nos inputs
    #setEventListeners() {
        this.#toggleButtonState()
        this.#inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this.#checkInputValidity(inputElement)
                this.#toggleButtonState()
            })
        })
    }

    // Método público: habilita validação
    enableValidation() {
        this.#setEventListeners()
    }
}
