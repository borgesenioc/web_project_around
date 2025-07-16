import Card from './Card.js'
import FormValidator from './FormValidator.js'
import Section from './Section.js'
import PopupWithImage from './PopupWithImage.js'
import PopupWithForm from './PopupWithForm.js'
import UserInfo from './UserInfo.js'
import { initialCards, validationConfig } from './utils.js'

// Inicializa o popup de imagem
const imagePopup = new PopupWithImage('.popup_type_image')

// Função para criar um cartão
function createCard(cardData) {
    const card = new Card(cardData, '#card-template', (name, link) => {
        imagePopup.open(name, link)
    })
    return card.generateCard()
}

// Inicializa a seção de cartões
const cardSection = new Section(
    {
        items: initialCards,
        renderer: (item) => {
            const cardElement = createCard(item)
            cardSection.addItem(cardElement)
        },
    },
    '.elements'
)

// Renderiza os cartões iniciais
cardSection.renderItems()

// Inicializa as informações do usuário
const userInfo = new UserInfo({
    nameSelector: '.profile__info-title',
    jobSelector: '.profile__info-paragraph',
})

// Inicializa o popup do formulário de perfil
const profileFormPopup = new PopupWithForm('.popup', (formData) => {
    userInfo.setUserInfo({
        name: formData.profileName,
        job: formData.profileJob,
    })
    profileFormPopup.close()
})
profileFormPopup.setEventListeners()

// Inicializa o popup do formulário de adição de cartão
const addCardFormPopup = new PopupWithForm(
    '.popup-card',
    (formData) => {
        const newCard = createCard({
            name: formData.locationName, // O name do input é "locationName"
            link: formData.cardURL, // O name do input é "cardURL"
        })
        cardSection.addItem(newCard)
        addCardFormPopup.close()
    },
    '.popup-card__form' // Seletor específico para este formulário
)
addCardFormPopup.setEventListeners()

// Add event listeners for the image popup
imagePopup.setEventListeners()

// Adiciona listener ao botão de editar perfil
document
    .querySelector('.profile__info-edit-button')
    .addEventListener('click', () => {
        const userData = userInfo.getUserInfo()
        document.querySelector('#formName').value = userData.name
        document.querySelector('#formJob').value = userData.job
        profileFormPopup.open()
    })

// Adiciona listener ao botão de adicionar cartão
document.querySelector('.profile__add-button').addEventListener('click', () => {
    addCardFormPopup.open()
})

// Inicializa a validação dos formulários
const formList = Array.from(document.querySelectorAll('.popup__form'))
formList.forEach((formElement) => {
    const validator = new FormValidator(validationConfig, formElement)
    validator.enableValidation()
})
