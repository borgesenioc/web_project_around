import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback, formSelector = '.popup__form') {
        super(popupSelector)
        this._submitCallback = submitCallback
        this._form = this._popup.querySelector(formSelector)

        if (this._form) {
            this._inputList = this._form.querySelectorAll(
                '.popup__input, .popup-card__form-input'
            )
            this._submitButton = this._form.querySelector('.popup__button')
            this._submitButtonText = this._submitButton
                ? this._submitButton.textContent || 'Salvar'
                : 'Salvar'
        } else {
            console.error(
                `Form not found with selector: ${formSelector} in popup: ${popupSelector}`
            )
            this._inputList = []
            this._submitButtonText = 'Salvar'
        }
    }

    // Adicionado para coletar os valores dos inputs do formulário
    _getInputValues() {
        const formValues = {}

        if (this._inputList && this._inputList.length > 0) {
            this._inputList.forEach((input) => {
                formValues[input.name] = input.value
            })
            console.log('Form values collected:', formValues)
        } else {
            console.warn('No input elements found in form')
        }

        return formValues
    }

    setEventListeners() {
        super.setEventListeners()
        if (this._form) {
            this._form.addEventListener('submit', (evt) => {
                evt.preventDefault()
                this._submitCallback(this._getInputValues())
            })
        }
    }

    close() {
        super.close()
        if (this._form) {
            this._form.reset()
        }
    }

    renderLoading(isLoading, loadingText = 'Salvando...') {
        if (this._submitButton) {
            if (isLoading) {
                this._submitButton.textContent = loadingText
            } else {
                this._submitButton.textContent = this._submitButtonText
            }
        }
    }
}
