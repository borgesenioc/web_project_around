export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)
        this._handleEscClose = this._handleEscClose.bind(this)
    }

    open() {
        this._popup.classList.add('popup_opened')
        document.addEventListener('keydown', this._handleEscClose)
    }

    close() {
        this._popup.classList.remove('popup_opened')
        document.removeEventListener('keydown', this._handleEscClose)
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close()
        }
    }

    setEventListeners() {
        // Verifique se o popup existe antes de acessar seus elementos
        if (this._popup) {
            // tente varios seletores possiveis
            const closeButton =
                this._popup.querySelector('.popup__close') ||
                this._popup.querySelector('.popup-card__close') ||
                this._popup.querySelector('.popup-image__close')
            // Verifique se o botão de fechar existe
            if (closeButton) {
                closeButton.addEventListener('click', () => {
                    this.close()
                })
            }

            this._popup.addEventListener('mousedown', (evt) => {
                if (evt.target === this._popup) {
                    this.close()
                }
            })
        }
    }
}
