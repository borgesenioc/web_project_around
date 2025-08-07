import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback, formSelector = '.popup__form') {
        super(popupSelector)
        this._submitCallback = submitCallback
        this._form = this._popup.querySelector(formSelector)
        this._popupSelector = popupSelector // Armazena o seletor para referência

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
                `Formulário não encontrado com o seletor: ${formSelector} no popup: ${popupSelector}`
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
            console.log('Valores do formulário coletados:', formValues)
        } else {
            console.warn('Nenhum elemento de input encontrado no formulário')
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

    // Adiciona método open personalizado para tratar caso especial do popup-card
    open() {
        super.open() // Chama primeiro o método open da classe pai

        // Tratamento especial para popup-card
        if (this._popupSelector === '.popup-card') {
            const popupElement = document.querySelector(this._popupSelector)
            if (popupElement) {
                popupElement.classList.add('popup-card_opened')
                console.log('Classe popup-card_opened adicionada')
            }
        }
    }

    close() {
        // Tratamento especial para popup-card - remove a classe personalizada primeiro
        if (this._popupSelector === '.popup-card') {
            const popupElement = document.querySelector(this._popupSelector)
            if (popupElement) {
                popupElement.classList.remove('popup-card_opened')
                console.log('Classe popup-card_opened removida')
            }
        }

        // Depois chama o método close da classe pai
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
