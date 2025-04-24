// handlers from helper module
import { openPopup, closePopup } from './utils-popup.js'

// DOM references
const editProfileButton = document.querySelector('.profile__info-edit-button')
const popupProfile = document.querySelector('.popup')
const closeProfileBtn = popupProfile.querySelector('.popup__close')

// handle opens
editProfileButton.addEventListener('click', () => openPopup(popupProfile))

// handle closes with the X button
closeProfileBtn.addEventListener('click', () => closePopup(popupProfile))

// handle overlay clicks
popupProfile.addEventListener('mousedown', (evt) => {
    if (evt.target === popupProfile) closePopup(popupProfile)
})
