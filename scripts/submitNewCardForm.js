import { elementsContainer, cardTemplate, addCard } from './loadInitialCards.js'

let popupCardForm = document.querySelector('.popup-card__form')
let popupCardElement = document.querySelector('.popup-card')

function handleCardFormSubmit(evt) {
    evt.preventDefault()

    let cardInput = {
        name: document.querySelector('#cardName').value,
        link: document.querySelector('#cardLink').value,
    }

    addCard(cardInput)

    // Remova o modificador popup-opened de popup
    popupCardElement.classList.remove('popup_opened')
}

// Conecte o handler ao formulário:
// ele vai observar o evento de submit
popupCardForm.addEventListener('submit', handleCardFormSubmit)
