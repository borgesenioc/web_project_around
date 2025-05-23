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
    profile.editBtn.addEventListener('click', () => openPopup(profile.popup))
    profile.closeBtn.addEventListener('click', () => closePopup(profile.popup))
    profile.popup.addEventListener('mousedown', (e) => {
        if (e.target === profile.popup) closePopup(profile.popup)
    })

    cardPopup.addBtn.addEventListener('click', () => openPopup(cardPopup.popup))
    cardPopup.closeBtn.addEventListener('click', () =>
        closePopup(cardPopup.popup)
    )
    cardPopup.popup.addEventListener('mousedown', (e) => {
        if (e.target === cardPopup.popup) closePopup(cardPopup.popup)
    })
}

// form submissions
function wireSubmissions() {
    profile.form.addEventListener('submit', (e) => {
        e.preventDefault()
        profile.nameOut.textContent = profile.nameIn.value
        profile.jobOut.textContent = profile.jobIn.value
        closePopup(profile.popup)
    })

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
