// Abrir o popup form ao clicar no botao editar do perfil
// Definir os elementos envolvidos
let editButton = document.querySelector('.profile__info-edit-button')
let popupElement = document.querySelector('.popup')
let closeButton = document.querySelector('.popup__close')

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
