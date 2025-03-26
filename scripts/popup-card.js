let addCardButton = document.querySelector('.profile__add-button')
let popupCardElement = document.querySelector('.popup-card')
let closeCardButton = document.querySelector('.popup-card__close')

function addPopupOpenModifier() {
    popupCardElement.classList.add('popup_opened')
}
function removePopupOpenModifier() {
    popupCardElement.classList.remove('popup_opened')
}

addCardButton.addEventListener('click', addPopupOpenModifier)

closeCardButton.addEventListener('click', removePopupOpenModifier)

export function openPopup() {
    const popup = document.querySelector('.popup-card')
    popup.classList.add('popup-opened')
}

export function closePopup() {
    const popup = document.querySelector('.popup-card')
    popup.classList.remove('popup-opened')
}
