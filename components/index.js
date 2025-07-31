import Card from './Card.js'
import FormValidator from './FormValidator.js'
import Section from './Section.js'
import PopupWithImage from './PopupWithImage.js'
import PopupWithForm from './PopupWithForm.js'
import PopupWithConfirmation from './PopupWithConfirmation.js'
import UserInfo from './UserInfo.js'
import Api from './Api.js'
import { validationConfig } from './utils.js'

// Replace 'YOUR_TOKEN' with your actual token
const api = new Api({
    baseUrl: 'https://around-api.pt-br.tripleten-services.com/v1',
    headers: {
        authorization: '336d021f-cb66-4661-8bcb-04d7f77d0288',
        'Content-Type': 'application/json',
    },
})

let userId = null // Store current user ID
let cardSection = null // Will be initialized after data is loaded

// Initialize popups
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

// Initialize user info
const userInfo = new UserInfo({
    nameSelector: '.profile__info-title',
    jobSelector: '.profile__info-paragraph',
    avatarSelector: '.profile__default-image',
})

// Create card function
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
                            console.log(`Error deleting card: ${err}`)
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
                        console.log(`Error updating like status: ${err}`)
                    })
            },
        },
        userId
    )
    return card.generateCard()
}

// Handle profile form submit
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
            console.log(`Error updating profile: ${err}`)
        })
        .finally(() => {
            profileFormPopup.renderLoading(false)
        })
}

// Handle add card form submit
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
            console.log(`Error adding card: ${err}`)
        })
        .finally(() => {
            addCardFormPopup.renderLoading(false)
        })
}

// Handle avatar form submit
function handleAvatarFormSubmit(formData) {
    avatarFormPopup.renderLoading(true)
    api.updateAvatar(formData.avatar)
        .then((userData) => {
            userInfo.setAvatar(userData.avatar)
            avatarFormPopup.close()
        })
        .catch((err) => {
            console.log(`Error updating avatar: ${err}`)
        })
        .finally(() => {
            avatarFormPopup.renderLoading(false)
        })
}

// Add event listeners
imagePopup.setEventListeners()
profileFormPopup.setEventListeners()
addCardFormPopup.setEventListeners()
deleteCardPopup.setEventListeners()
avatarFormPopup.setEventListeners()

// Add avatar edit button listener
document.querySelector('.profile__avatar').addEventListener('click', () => {
    avatarFormPopup.open()
})

// Add profile edit button listener
document
    .querySelector('.profile__info-edit-button')
    .addEventListener('click', () => {
        const userData = userInfo.getUserInfo()
        document.querySelector('#formName').value = userData.name
        document.querySelector('#formJob').value = userData.job
        profileFormPopup.open()
    })

// Add new card button listener
document.querySelector('.profile__add-button').addEventListener('click', () => {
    addCardFormPopup.open()
})

// Load initial data
api.getAppInfo()
    .then(([userData, initialCards]) => {
        userId = userData._id

        // Set user info
        userInfo.setUserInfo({
            name: userData.name,
            job: userData.about,
        })

        userInfo.setAvatar(userData.avatar)

        // Initialize cards section
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

        // Render initial cards
        cardSection.renderItems()
    })
    .catch((err) => {
        console.log(`Error loading initial data: ${err}`)
    })

// Initialize form validation
const formValidators = {}

// Enable validation for all forms
const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
        try {
            const formName = formElement.getAttribute('name') || 'unnamed-form'

            // Skip the confirmation form since it doesn't need validation
            if (formName === 'confirm-form') {
                return
            }

            const validator = new FormValidator(config, formElement)
            formValidators[formName] = validator
            validator.enableValidation()
        } catch (err) {
            console.warn(
                `Error initializing validator for form ${formElement}:`,
                err
            )
        }
    })
}

enableValidation(validationConfig)
