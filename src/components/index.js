import Card from './Card.js'
import FormValidator from './FormValidator.js'
import Section from './Section.js'
import PopupWithImage from './PopupWithImage.js'
import PopupWithForm from './PopupWithForm.js'
import PopupWithConfirmation from './PopupWithConfirmation.js'
import UserInfo from './UserInfo.js'
import Api from './Api.js'
import { validationConfig } from './utils.js'
import { API_BASE_URL } from './config.js'

// debug-remove
console.log('Script loaded')

// Inicializa a API sem hardcode do token
const api = new Api({
    baseUrl: API_BASE_URL,
    // Os headers serão definidos automaticamente no construtor da Api
})

let userId = null // Armazena o ID do usuário atual
let cardSection = null // Será inicializado após os dados serem carregados

// Inicializa os popups
const imagePopup = new PopupWithImage('.popup_type_image')
const profileFormPopup = new PopupWithForm('.popup', handleProfileFormSubmit)
const addCardFormPopup = new PopupWithForm(
    '.popup-card',
    handleAddCardFormSubmit,
    '.popup-card__form'
)
const deleteCardPopup = new PopupWithConfirmation('.popup_type_confirm')
const avatarFormPopup = new PopupWithForm(
    '.popup_type_avatar',
    handleAvatarFormSubmit
)

// Inicializa as informações do usuário
const userInfo = new UserInfo({
    nameSelector: '.profile__info-title',
    jobSelector: '.profile__info-paragraph',
    avatarSelector: '.profile__default-image',
})

// Função para criar card
function createCard(cardData) {
    const card = new Card(
        cardData,
        '#card-template',
        {
            handleCardClick: (name, link) => {
                imagePopup.open(name, link)
            },
            handleDeleteClick: (cardId) => {
                deleteCardPopup.open()
                deleteCardPopup.setAction(() => {
                    deleteCardPopup.renderLoading(true)
                    api.deleteCard(cardId)
                        .then(() => {
                            card.removeCard()
                            deleteCardPopup.close()
                        })
                        .catch((err) => {
                            console.log(`Erro ao deletar card: ${err}`)
                        })
                        .finally(() => {
                            deleteCardPopup.renderLoading(false)
                        })
                })
            },
            handleLikeClick: (cardId, isLiked) => {
                const likeAction = isLiked
                    ? api.removeLike(cardId)
                    : api.addLike(cardId)

                likeAction
                    .then((updatedCard) => {
                        card.setLikeStatus(updatedCard.isLiked)
                    })
                    .catch((err) => {
                        console.log(`Erro ao atualizar status do like: ${err}`)
                    })
            },
        },
        userId
    )
    return card.generateCard()
}

// Manipula o envio do formulário de perfil
function handleProfileFormSubmit(formData) {
    profileFormPopup.renderLoading(true)
    api.updateUserInfo({
        name: formData.profileName,
        about: formData.profileJob,
    })
        .then((userData) => {
            userInfo.setUserInfo({
                name: userData.name,
                job: userData.about,
            })
            profileFormPopup.close()
        })
        .catch((err) => {
            console.log(`Erro ao atualizar perfil: ${err}`)
        })
        .finally(() => {
            profileFormPopup.renderLoading(false)
        })
}

// Manipula o envio do formulário de adicionar card
function handleAddCardFormSubmit(formData) {
    addCardFormPopup.renderLoading(true)
    api.addCard({
        name: formData.locationName,
        link: formData.cardURL,
    })
        .then((cardData) => {
            const cardElement = createCard(cardData)
            cardSection.addItem(cardElement)
            addCardFormPopup.close()
        })
        .catch((err) => {
            console.log(`Erro ao adicionar card: ${err}`)
        })
        .finally(() => {
            addCardFormPopup.renderLoading(false)
        })
}

// Manipula o envio do formulário de avatar
function handleAvatarFormSubmit(formData) {
    avatarFormPopup.renderLoading(true)
    api.updateAvatar(formData.avatar)
        .then((userData) => {
            userInfo.setAvatar(userData.avatar)
            avatarFormPopup.close()
        })
        .catch((err) => {
            console.log(`Erro ao atualizar avatar: ${err}`)
        })
        .finally(() => {
            avatarFormPopup.renderLoading(false)
        })
}

// Adiciona os event listeners
imagePopup.setEventListeners()
profileFormPopup.setEventListeners()
addCardFormPopup.setEventListeners()
deleteCardPopup.setEventListeners()
avatarFormPopup.setEventListeners()

// Adiciona listener ao botão de editar avatar
document.querySelector('.profile__avatar').addEventListener('click', () => {
    avatarFormPopup.open()
})

// Adiciona listener ao botão de editar perfil
document
    .querySelector('.profile__info-edit-button')
    .addEventListener('click', () => {
        const userData = userInfo.getUserInfo()
        document.querySelector('#formName').value = userData.name
        document.querySelector('#formJob').value = userData.job
        profileFormPopup.open()
    })

// debug-remove
const addButton = document.querySelector('.profile__add-button')
console.log('Add button element:', addButton)

// Adiciona listener ao botão de adicionar novo card
document.querySelector('.profile__add-button').addEventListener('click', () => {
    console.log('Add button clicked') // debug-remove
    addCardFormPopup.open()
})

// Carrega os dados iniciais
api.getAppInfo()
    .then(([userData, initialCards]) => {
        userId = userData._id

        // Define as informações do usuário
        userInfo.setUserInfo({
            name: userData.name,
            job: userData.about,
        })

        userInfo.setAvatar(userData.avatar)

        // Inicializa a seção de cards
        cardSection = new Section(
            {
                items: initialCards,
                renderer: (item) => {
                    const cardElement = createCard(item)
                    cardSection.addItem(cardElement)
                },
            },
            '.elements'
        )

        // Renderiza os cards iniciais
        cardSection.renderItems()
    })
    .catch((err) => {
        console.log(`Erro ao carregar dados iniciais: ${err}`)
    })

// Inicializa a validação dos formulários
const formValidators = {}

// Habilita validação para todos os formulários
const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
        try {
            const formName = formElement.getAttribute('name') || 'unnamed-form'

            // Ignora o formulário de confirmação pois não precisa de validação
            if (formName === 'confirm-form') {
                return
            }

            const validator = new FormValidator(config, formElement)
            formValidators[formName] = validator
            validator.enableValidation()
        } catch (err) {
            console.warn(
                `Erro ao inicializar validador para o formulário ${formElement}:`,
                err
            )
        }
    })
}

enableValidation(validationConfig)
