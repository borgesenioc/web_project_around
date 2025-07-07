// index_new.js

import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import {
    openPopup,
    closePopup,
    initialCards,
    selectors,
    validationConfig,
} from './utils.js'

const els = selectors

// grab all needed elements
const elementsContainer = document.querySelector(els.elementsContainer)

// profile popup & form elems
const profile = {
    editBtn: document.querySelector(els.profileEditButton),
    popup: document.querySelector(els.profilePopup),
    closeBtn: document.querySelector(els.profileCloseButton),
    form: document.querySelector(els.profileForm),
    nameIn: document.querySelector(els.nameInput),
    jobIn: document.querySelector(els.jobInput),
    nameOut: document.querySelector(els.profileName),
    jobOut: document.querySelector(els.profileJob),
}

// add-card popup & form elems
const cardPopup = {
    addBtn: document.querySelector(els.addCardButton),
    popup: document.querySelector(els.cardPopup),
    closeBtn: document.querySelector(els.cardCloseButton),
    form: document.querySelector(els.cardForm),
    titleIn: document.querySelector(els.cardTitleInput),
    linkIn: document.querySelector(els.cardLinkInput),
}

// render the seed cards
function renderInitialCards() {
    initialCards
        .slice()
        .reverse()
        .forEach((data) => {
            elementsContainer.prepend(new Card(data, '#card').generateCard())
        })
}

// popup wiring
function wirePopups() {
    // Profile popup
    if (profile.editBtn && profile.popup && profile.closeBtn) {
        profile.editBtn.addEventListener('click', () => {
            // Fill inputs with current values
            profile.nameIn.value = profile.nameOut.textContent
            profile.jobIn.value = profile.jobOut.textContent
            openPopup(profile.popup)
        })
        profile.closeBtn.addEventListener('click', () =>
            closePopup(profile.popup)
        )
        profile.popup.addEventListener('mousedown', (evt) => {
            if (evt.target === profile.popup) closePopup(profile.popup)
        })
    }

    // Card popup
    if (cardPopup.addBtn && cardPopup.popup && cardPopup.closeBtn) {
        cardPopup.addBtn.addEventListener('click', () =>
            openPopup(cardPopup.popup)
        )
        cardPopup.closeBtn.addEventListener('click', () =>
            closePopup(cardPopup.popup)
        )
        cardPopup.popup.addEventListener('mousedown', (evt) => {
            if (evt.target === cardPopup.popup) closePopup(cardPopup.popup)
        })
    }
}

// form submissions
function wireSubmissions() {
    // Check if profile form exists before adding listener
    if (profile.form) {
        profile.form.addEventListener('submit', (e) => {
            e.preventDefault()
            profile.nameOut.textContent = profile.nameIn.value
            profile.jobOut.textContent = profile.jobIn.value
            closePopup(profile.popup)
        })
    } else {
        console.error('Profile form is null')
    }

    // Check if card popup form exists before adding listener
    if (cardPopup.form) {
        cardPopup.form.addEventListener('submit', (e) => {
            e.preventDefault()
            const data = {
                name: cardPopup.titleIn.value,
                link: cardPopup.linkIn.value,
            }
            elementsContainer.prepend(new Card(data, '#card').generateCard())
            closePopup(cardPopup.popup)
            cardPopup.form.reset()
        })
    } else {
        console.error('Card popup form is null')
    }
}

// enable validation
function initValidation() {
    new FormValidator(validationConfig.profile, profile.form).enableValidation()
    new FormValidator(validationConfig.card, cardPopup.form).enableValidation()
}

// bootstrap
renderInitialCards()
wirePopups()
wireSubmissions()
initValidation()

console.log('Profile edit button:', profile.editBtn)
console.log('Profile popup:', profile.popup)
console.log('Profile close button:', profile.closeBtn)
console.log('Card add button:', cardPopup.addBtn)
console.log('Card popup:', cardPopup.popup)
console.log('Card close button:', cardPopup.closeBtn)
console.log('Profile form:', profile.form)
console.log('Card popup form:', cardPopup.form)
