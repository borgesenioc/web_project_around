import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback, formSelector = '.popup__form') {
        super(popupSelector)
        this._submitCallback = submitCallback
        this._form = this._popup.querySelector(formSelector)

        // Verificar se o formulário foi encontrado
        if (!this._form) {
            console.error(
                `Formulário não encontrado com o seletor: ${formSelector}`
            )
        } else {
            this._inputList = this._form.querySelectorAll(
                '.popup__input, .popup-card__form-input'
            )
        }
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
}
