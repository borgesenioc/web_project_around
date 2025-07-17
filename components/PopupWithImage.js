import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
    }

    open(name, link) {
        // Confirme que o popup está no DOM
        this._popup = document.querySelector('.popup_type_image')

        if (!this._popup) {
            console.error('Popup de imagem não encontrado!')
            return
        }

        // Configure a imagem
        const image = this._popup.querySelector('.popup-image__highlight')
        const caption = this._popup.querySelector('.popup-image__paragraph')

        if (image && caption) {
            image.src = link
            image.alt = name
            caption.textContent = name
        }

        // Abra o popup
        // Adicione event listeners
        this.setEventListeners()

        // Abra o popup
        super.open()
    }
}
