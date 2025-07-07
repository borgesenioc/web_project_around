import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import { openPopup, closePopup } from './utils.js'

// Initial cards array (replace links with your real images if needed)
const initialCards = [
    { name: 'Yosemite Valley', link: 'https://pictures.com/yosemite.jpg' },
    { name: 'Lake Louise', link: 'https://pictures.com/lakelouise.jpg' },
    { name: 'Bald Mountains', link: 'https://pictures.com/baldmountains.jpg' },
    { name: 'Latemar', link: 'https://pictures.com/latemar.jpg' },
    { name: 'Vanoise National Park', link: 'https://pictures.com/vanoise.jpg' },
    { name: 'Lago di Braies', link: 'https://pictures.com/braies.jpg' },
]

// Card rendering
const cardContainer = document.querySelector('.elements')
const cardTemplateSelector = '#card-template' // Update if your template selector is different

function renderCard(data) {
    const card = new Card(data, cardTemplateSelector)
    const cardElement = card.generateCard()
    cardContainer.prepend(cardElement)
}

// Render all initial cards
initialCards.forEach(renderCard)

// Form validation config
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
}

// Enable validation for all forms
document.querySelectorAll(validationConfig.formSelector).forEach((form) => {
    const validator = new FormValidator(validationConfig, form)
    validator.enableValidation()
})

// Example: popup open/close logic for profile edit (adjust selectors as needed)
const profileEditButton = document.querySelector('.profile__info-edit-button')
const profilePopup = document.querySelector('.popup_type_profile')
const profileCloseButton = profilePopup?.querySelector('.popup__close')

if (profileEditButton && profilePopup && profileCloseButton) {
    profileEditButton.addEventListener('click', () => openPopup(profilePopup))
    profileCloseButton.addEventListener('click', () => closePopup(profilePopup))
    profilePopup.addEventListener('mousedown', (evt) => {
        if (evt.target === profilePopup) closePopup(profilePopup)
    })
}

// Example: logic for the "add card" popup
const addCardButton = document.querySelector('.profile__add-button')
const addCardPopup = document.querySelector('.popup_type_add-card')
const addCardCloseButton = addCardPopup?.querySelector('.popup__close')

if (addCardButton && addCardPopup && addCardCloseButton) {
    addCardButton.addEventListener('click', () => openPopup(addCardPopup))
    addCardCloseButton.addEventListener('click', () => closePopup(addCardPopup))
    addCardPopup.addEventListener('mousedown', (evt) => {
        if (evt.target === addCardPopup) closePopup(addCardPopup)
    })
}

// Example: logic for the image preview popup
const imagePopup = document.querySelector('.popup_type_image')
const imagePopupCloseButton = imagePopup?.querySelector('.popup__close')

if (imagePopup && imagePopupCloseButton) {
    imagePopupCloseButton.addEventListener('click', () =>
        closePopup(imagePopup)
    )
    imagePopup.addEventListener('mousedown', (evt) => {
        if (evt.target === imagePopup) closePopup(imagePopup)
    })
}
