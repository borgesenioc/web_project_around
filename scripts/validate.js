// validate.js
export function enableValidation({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
}) {
    const forms = [...document.querySelectorAll(formSelector)]

    forms.forEach((form) => {
        const inputs = [...form.querySelectorAll(inputSelector)]
        const button = form.querySelector(submitButtonSelector)

        const toggleButtonState = () => {
            const formValid = inputs.every((i) => i.validity.valid)
            button.disabled = !formValid
            button.classList.toggle(inactiveButtonClass, !formValid)
        }

        inputs.forEach((input) => {
            input.addEventListener('input', () => {
                input.classList.toggle(inputErrorClass, !input.validity.valid)
                toggleButtonState()
            })
        })

        toggleButtonState() // initial state
    })
}

// ONE call is enough once the class names line up
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
})
