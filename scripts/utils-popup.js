function handleEscClose(evt) {
    if (evt.key === 'Escape') {
        const opened = document.querySelector('.popup_opened')
        if (opened) {
            closePopup(opened)
        }
    }
}

export function openPopup(popup) {
    popup.classList.add('popup_opened')
    document.addEventListener('keydown', handleEscClose)
}

export function closePopup(popup) {
    popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', handleEscClose)
}
