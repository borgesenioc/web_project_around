// handlers from helper module
import { openPopup, closePopup } from './utils-popup.js'

// DOM references
const addCardButton = document.querySelector('.profile__add-button')
const popupCard = document.querySelector('.popup-card')
const closeCardButton = popupCard.querySelector('.popup-card__close')

// handle opens
addCardButton.addEventListener('click', () => openPopup(popupCard))

// handle closes with the X button
closeCardButton.addEventListener('click', () => closePopup(popupCard))

// handle overlay clicks
popupCard.addEventListener('mousedown', (evt) => {
    if (evt.target === popupCard) closePopup(popupCard)
})
