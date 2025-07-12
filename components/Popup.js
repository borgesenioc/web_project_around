export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)
        this._handleEscClose = this._handleEscClose.bind(this)
    }

    // Método público para abrir o popup
    open() {
        this._popup.classList.add('popup_opened')
        document.addEventListener('keydown', this._handleEscClose)
    }

    // Método público para fechar o popup
    close() {
        this._popup.classList.remove('popup_opened')
        document.removeEventListener('keydown', this._handleEscClose)
    }

    // Método privado para fechar o popup ao pressionar Esc
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close()
        }
    }

    // Método público para adicionar os event listeners
    setEventListeners() {
        this._popup
            .querySelector('.popup__close')
            .addEventListener('click', () => {
                this.close()
            })

        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target === this._popup) {
                this.close()
            }
        })
    }
}
