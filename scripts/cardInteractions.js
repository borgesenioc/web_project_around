// scripts/cardInteractions.js
// -------------------------------------------------------------
//  Card “like”, “delete”, and “image-highlight” interactions
// -------------------------------------------------------------

import { elementsContainer } from './loadInitialCards.js'
import { openPopup, closePopup } from './utils-popup.js'

/* ---------- constants ---------- */
const imageTemplate = document
    .querySelector('#image-highlight')
    .content // <template> fragment
    .cloneNode.bind(document.querySelector('#image-highlight').content, true) // helper

/* ---------- helpers ---------- */
function toggleLikeButton(evt) {
    evt.target.classList.toggle('likeButtonClicked')
}

function deleteCard(evt) {
    // remove the whole card
    const card = evt.target.closest('.elements__card')
    if (card) card.remove()
}

function createImageHighlight(evt) {
    // 1. clone the template
    const fragment = imageTemplate()
    const popupImage = fragment.querySelector('.popup')
    const highlightImg = popupImage.querySelector('.popup-image__highlight')
    const highlightTxt = popupImage.querySelector('.popup-image__paragraph')

    // 2. pull data from the clicked card
    const card = evt.target.closest('.elements__card')
    highlightImg.src = card.querySelector('.elements__card-image').src
    highlightTxt.textContent = card.querySelector(
        '.elements__card-header-title'
    ).textContent
    highlightImg.alt = highlightTxt.textContent

    // 3. inject into DOM and open
    document.body.appendChild(fragment)
    openPopup(popupImage)

    // 4. close actions
    popupImage
        .querySelector('.popup-image__close')
        .addEventListener('click', handleClose)

    popupImage.addEventListener('mousedown', overlayClose)

    function handleClose() {
        overlayClose() // reuse same clean-up
    }

    function overlayClose(evt) {
        if (!evt || evt.target === popupImage) {
            closePopup(popupImage)
            popupImage.remove() // keep DOM tidy
            popupImage.removeEventListener('mousedown', overlayClose)
        }
    }
}

/* ---------- one delegation listener for the whole list ---------- */
elementsContainer.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('elements__card-header-like-button')) {
        toggleLikeButton(evt)
    } else if (evt.target.classList.contains('elements__card-trash-button')) {
        deleteCard(evt)
    } else if (evt.target.classList.contains('elements__card-image-button')) {
        createImageHighlight(evt)
    }
})
