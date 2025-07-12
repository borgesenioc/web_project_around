import Popup from './popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector)
        this._submitCallback = submitCallback
        this._form = this._popup.querySelector('.popup__form')
        this._inputList = this._form.querySelectorAll('.popup__input')
    }

    // Método privado para coletar os valores de todos os campos
    _getInputValues() {
        const formValues = {}
        this._inputList.forEach((input) => {
            formValues[input.name] = input.value
        })
        return formValues
    }

    // Sobrescreve o método da classe pai para adicionar o listener ao formulário
    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._submitCallback(this._getInputValues())
        })
    }

    // Sobrescreve o método da classe pai para resetar o formulário
    close() {
        super.close()
        this._form.reset()
    }
}
