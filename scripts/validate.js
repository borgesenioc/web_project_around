function getErrorMessage(input) {
    const v = input.validity

    if (v.valueMissing) {
        return 'Preencha esse campo.'
    }

    if (v.tooShort) {
        return `Digite pelo menos ${input.minLength} caracteres. (atual: ${input.value.length})`
    }

    if (v.tooLong) {
        return `Digite no máximo ${input.maxLength} caracteres.`
    }

    if (v.typeMismatch && input.type === 'url') {
        return 'Por favor, insira um endereço web.'
    }

    if (v.patternMismatch) {
        return 'Formato inválido.'
    }

    return 'Valor inválido.'
}

export function enableValidation({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
}) {
    const forms = Array.from(document.querySelectorAll(formSelector))

    forms.forEach((form) => {
        const inputs = Array.from(form.querySelectorAll(inputSelector))
        const button = form.querySelector(submitButtonSelector)

        /** red border bottom */
        const showError = (input) => {
            const errorElem = form.querySelector(`#${input.id}-error`)
            if (!errorElem) return

            errorElem.textContent = getErrorMessage(input)
            input.classList.add(inputErrorClass)
            errorElem.classList.add(errorClass)
        }

        /** Oculta mensagem + remove borda */
        const hideError = (input) => {
            const errorElem = form.querySelector(`#${input.id}-error`)
            if (!errorElem) return

            errorElem.textContent = ''
            input.classList.remove(inputErrorClass)
            errorElem.classList.remove(errorClass)
        }

        /** Habilita / desabilita o botão de submit */
        const toggleButtonState = () => {
            const formValid = inputs.every((i) => i.validity.valid)
            button.disabled = !formValid
            button.classList.toggle(inactiveButtonClass, !formValid)
        }

        /** Handler único para todos os inputs do form */
        const handleInput = (evt) => {
            const input = evt.target
            input.validity.valid ? hideError(input) : showError(input)
            toggleButtonState()
        }

        // listeners
        inputs.forEach((input) => input.addEventListener('input', handleInput))

        // treating the initial state as acceptable
        inputs.forEach((input) => {
            const hasValue = input.value.length > 0

            if (!hasValue) {
                hideError(input)
            } else if (!input.validity.valid) {
                showError(input)
            } else {
                hideError(input)
            }
        })
        toggleButtonState()
    })
}

enableValidation({
    formSelector: '.popup__form, .popup-card__form', // both forms
    inputSelector: '.popup__input, .popup-card__form-input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
})
