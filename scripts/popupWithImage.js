import Popup from './popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._image = this._popup.querySelector('.popup-image__highlight')
        this._caption = this._popup.querySelector('.popup-image__paragraph')
    }

    // Sobrescreve o método open da classe pai para incluir a imagem e legenda
    open(name, link) {
        this._image.src = link
        this._image.alt = name
        this._caption.textContent = name

        super.open()
    }
}
