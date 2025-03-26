let popupCardForm = document.querySelector('.popup-card__form')

function handleCardFormSubmit(evt) {
    evt.preventDefault()

    let cardNameInput = document.querySelector('#cardName') // Use querySelector()
    let linkInput = document.querySelector('#cardLink') // Use querySelector()

    // Pegue os valores de cada campo do valor da propriedade correspondente
    let cardNameValue = cardNameInput.value
    let linkInputValue = linkInput.value

    //Pegue o elmento popup  e close button
    let popupElement = document.querySelector('.popup-card')

    // Selecione os elementos aos quais os valores dos campos serão inseridos
    let profileName = document.querySelector('.profile__info-title')
    let profileJob = document.querySelector('.profile__info-paragraph')

    // Insira novos valores usando a propriedade textContent
    profileName.textContent = nameValue
    profileJob.textContent = jobValue

    // Remova o modificador popup-opened de popup
    popupElement.classList.remove('popup-card_opened')
}

// Conecte o handler ao formulário:
// ele vai observar o evento de submit
popupCardForm.addEventListener('submit', handleProfileFormSubmit)

// falta dizer que cada submit pega os valores do template a cria um clone
