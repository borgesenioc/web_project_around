import Popup from './popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
    }

    open(name, link) {
        // Espere até que o elemento esteja no DOM
        this._popup = document.querySelector('.popup_type_image')

        if (this._popup) {
            // Selecione os elementos apenas quando o popup estiver no DOM
            this._image = this._popup.querySelector('.popup-image__highlight')
            this._caption = this._popup.querySelector('.popup-image__paragraph')

            if (this._image && this._caption) {
                this._image.src = link
                this._image.alt = name
                this._caption.textContent = name
            }

            // Adicione event listeners ao abrir
            this.setEventListeners()

            super.open()
        }
    }
}
