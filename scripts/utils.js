/**
 * Popup open/close helpers
 */
function handleEscClose(evt) {
    if (evt.key === 'Escape') {
        const opened = document.querySelector('.popup_opened')
        if (opened) closePopup(opened)
    }
}

export function openPopup(popupEl) {
    if (!popupEl) return
    popupEl.classList.add('popup_opened')
    document.addEventListener('keydown', handleEscClose)
}

export function closePopup(popupEl) {
    if (!popupEl) return
    popupEl.classList.remove('popup_opened')
    document.removeEventListener('keydown', handleEscClose)
}

/**
 * Initial cards data
 */
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

/**
 * All DOM selectors in one place
 */
export const selectors = {
    elementsContainer: '.elements',
    // profile
    profileEditButton: '.profile__info-edit-button',
    profilePopup: '.popup',
    profileCloseButton: '.popup__close',
    profileForm: '.popup__form',
    nameInput: '#formName',
    jobInput: '#formJob',
    profileName: '.profile__info-title',
    profileJob: '.profile__info-paragraph',
    // add-card
    addCardButton: '.profile__add-button',
    cardPopup: '.popup-card',
    cardCloseButton: '.popup-card__close',
    cardForm: '.popup-card__form',
    cardTitleInput: '#cardName',
    cardLinkInput: '#cardLink',
}

/**
 * Validation configs for each form
 */
export const validationConfig = {
    profile: {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible',
    },
    card: {
        inputSelector: '.popup-card__form-input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible',
    },
}
