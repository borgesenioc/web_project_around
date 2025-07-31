import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback, formSelector = '.popup__form') {
        super(popupSelector)
        this._submitCallback = submitCallback
        this._form = this._popup.querySelector(formSelector)
        this._inputList = this._form.querySelectorAll(
            '.popup__input, .popup-card__form-input'
        )
        this._submitButton = this._form.querySelector('.popup__button')
        this._submitButtonText = this._submitButton.textContent || 'Salvar'
    }

    _getInputValues() {
        const formValues = {}
        if (this._inputList) {
            this._inputList.forEach((input) => {
                formValues[input.name] = input.value
            })
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
        if (isLoading) {
            this._submitButton.textContent = loadingText
        } else {
            this._submitButton.textContent = this._submitButtonText
        }
    }
}
