export function handleEscClose(evt) {
    if (evt.key === 'Escape') {
        const opened = document.querySelector('.popup_opened')
        if (opened) closePopup(opened)
    }
}

export function openPopup(popup) {
    if (!popup) return
    popup.classList.add('popup_opened')
    document.addEventListener('keydown', handleEscClose)
}

export function closePopup(popup) {
    if (!popup) return
    popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', handleEscClose)
}

export const initialCards = [
    {
        name: 'Vale de Yosemite',
        link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg',
    },
    {
        name: 'Lago Louise',
        link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg',
    },
    {
        name: 'Montanhas Carecas',
        link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg',
    },
    {
        name: 'Latemar',
        link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg',
    },
    {
        name: 'Parque Nacional da Vanoise ',
        link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg',
    },
    {
        name: 'Lago di Braies',
        link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg',
    },
]

export const selectors = {
    elementsContainer: '.elements',
    profileEditButton: '.profile__info-edit-button',
    profilePopup: '.popup', // Changed
    profileCloseButton: '.popup__close',
    profileForm: '.popup__form',
    nameInput: '#formName', // Changed to ID
    jobInput: '#formJob', // Changed to ID
    profileName: '.profile__info-title',
    profileJob: '.profile__info-paragraph',
    addCardButton: '.profile__add-button',
    cardPopup: '.popup-card', // Changed
    cardCloseButton: '.popup-card__close', // Changed
    cardForm: '.popup-card__form', // Changed
    cardTitleInput: '#cardName', // Changed to ID
    cardLinkInput: '#cardLink', // Changed to ID
}

export const validationConfig = {
    profile: {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible',
    },
    card: {
        inputSelector: '.popup-card__form-input', // Changed
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible',
    },
}
