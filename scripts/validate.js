// Create validation functions for the profile edit form
const profileFormElement = document.querySelector('.popup__form')
const profileFormInput = profileFormElement.querySelector('.popup__form-input')

// Show error element
const showInputError = (element) => {
    element.classList.add('popup__input_type_error')
}

// Hide error element
const hideInputError = (element) => {
    element.classList.remove('popup__input_type_error')
}

// Check if the input is valid
const isValid = () => {
    if (!profileFormInput.validity.valid) {
        showInputError(profileFormInput)
    } else {
        hideInputError(profileFormInput)
    }
}

// Cancel the default browser behavior
profileFormElement.addEventListener('submit', function (evt) {
    evt.preventDefault()
})

profileFormInput.addEventListener('input', isValid)

// Create the enableValidation function

function enableValidation(config) {
    const forms = Array.from(document.querySelectorAll(config.formSelector))

    forms.forEach((form) => {
        const inputs = Array.from(form.querySelectorAll(config.inputSelector))
        const button = form.querySelector(config.submitButtonSelector)

        function toggleButtonState() {
            const isFormValid = inputs.every((input) => input.validity.valid)
            if (!isFormValid) {
                button.classList.add(config.inactiveButtonClass)
                button.disabled = true
            } else {
                button.classList.remove(config.inactiveButtonClass)
                button.disabled = false
            }
        }

        function handleInput(input) {
            if (!input.validity.valid) {
                input.classList.add(config.inputErrorClass)
            } else {
                input.classList.remove(config.inputErrorClass)
            }
            toggleButtonState()
        }

        inputs.forEach((input) => {
            input.addEventListener('input', () => handleInput(input))
        })

        // Initial state
        toggleButtonState()
    })
}

// Habilitando a validação chamando enableValidation()
// Valide todas as configurações

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
})
