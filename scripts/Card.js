// Card.js

import { openPopup, closePopup } from './utils.js'

export class Card {
    // Private fields
    #name
    #link
    #templateSelector
    #element

    /**
     * @param {{ name: string, link: string }} data — card text and image URL
     * @param {string} templateSelector — CSS selector for the <template> element
     */
    constructor({ name, link }, templateSelector) {
        this.#name = name
        this.#link = link
        this.#templateSelector = templateSelector
    }

    // Clone the template and return a new card element
    #getTemplate() {
        const template = document
            .querySelector(this.#templateSelector)
            .content.querySelector('.elements__card')
        return template.cloneNode(true)
    }

    // Handler: toggle the “like” button state
    #handleLike = () => {
        this.#element
            .querySelector('.elements__card-header-like-button')
            .classList.toggle('elements__card-header-like-button_active')
    }

    // Handler: remove this card from the DOM
    #handleDelete = () => {
        this.#element.remove()
    }

    // Handler: open the image preview popup
    #handleImageClick = () => {
        // clone the image-popup template
        const popupTemplate = document
            .querySelector('#image-highlight')
            .content.querySelector('.popup')
        const popupEl = popupTemplate.cloneNode(true)

        // set image src/alt and caption
        const imgEl = popupEl.querySelector('.popup-image__highlight')
        const captionEl = popupEl.querySelector('.popup-image__paragraph')
        imgEl.src = this.#link
        imgEl.alt = this.#name
        captionEl.textContent = this.#name

        // add to DOM and open
        document.body.appendChild(popupEl)
        openPopup(popupEl)

        // close on overlay or close-button click
        popupEl.addEventListener('mousedown', (evt) => {
            if (evt.target === popupEl) {
                closePopup(popupEl)
                popupEl.remove()
            }
        })
        popupEl
            .querySelector('.popup-image__close')
            .addEventListener('click', () => {
                closePopup(popupEl)
                popupEl.remove()
            })
    }

    // Attach event listeners to card controls
    #setEventListeners() {
        this.#element
            .querySelector('.elements__card-header-like-button')
            .addEventListener('click', this.#handleLike)
        this.#element
            .querySelector('.elements__card-trash-button')
            .addEventListener('click', this.#handleDelete)
        this.#element
            .querySelector('.elements__card-image-button')
            .addEventListener('click', this.#handleImageClick)
    }

    /**
     * Public method — generate the DOM element for this card,
     * fill it with data, wire up listeners, and return it.
     * @returns {HTMLElement}
     */
    generateCard() {
        this.#element = this.#getTemplate()

        // fill in content
        const imageEl = this.#element.querySelector('.elements__card-image')
        const titleEl = this.#element.querySelector(
            '.elements__card-header-title'
        )
        imageEl.src = this.#link
        imageEl.alt = this.#name
        titleEl.textContent = this.#name

        // add event listeners
        this.#setEventListeners()

        return this.#element
    }
}
