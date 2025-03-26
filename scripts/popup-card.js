let addCardButton = document.querySelector('.profile__add-button')
let popupCardElement = document.querySelector('.popup-card')
let closeCardButton = document.querySelector('.popup-card__close')

// Definidr a funcao que adiciona o modificador .popup-open de popup
function addPopupOpenModifier() {
    popupElement.classList.add('popup_opened')
}

// Definir a funcao que remove o modificador .popup-open de popup

function removePopupOpenModifier() {
    popupElement.classList.remove('popup_opened')
}

// Adicionar event listener no clique do botao editar
editButton.addEventListener('click', addPopupOpenModifier)

// Adicionar event listener no clique do botao fechar popup
closeButton.addEventListener('click', removePopupOpenModifier)

export function openPopup() {
    const popup = document.querySelector('.popup')
    popup.classList.add('popup-opened')
}

export function closePopup() {
    const popup = document.querySelector('.popup')
    popup.classList.remove('popup-opened')
}
