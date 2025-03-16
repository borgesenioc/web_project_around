// Vamos encontrar o formulário no DOM
let popupForm = document.querySelector('.popup__form') // Use o método querySelector()

// Em seguida vem o handler do submit
// ainda não vai enviar para lugar nenhum

// Observe que o nome da função começa com um verbo
// e descreve exatamente o que a função faz
function handleProfileFormSubmit(evt) {
    // Esta linha impede o navegador
    // de enviar o formulário da forma padrão.
    evt.preventDefault()
    // Fazendo isso, podemos definir nossa própria forma de enviar o formulário.
    // Explicaremos em mais detalhes posteriormente.

    // Vamos encontrar os campos de formulário do DOM
    let nameInput = document.querySelector('#formName') // Use querySelector()
    let jobInput = document.querySelector('#formJob') // Use querySelector()

    // Pegue os valores de cada campo do valor da propriedade correspondente
    let nameValue = nameInput.value
    let jobValue = jobInput.value

    // Selecione os elementos aos quais os valores dos campos serão inseridos
    let profileName = document.querySelector('.profile__info-title')
    let profileJob = document.querySelector('.profile__info-paragraph')

    // Insira novos valores usando a propriedade textContent
    profileName.textContent = nameValue
    profileJob.textContent = jobValue
}

// Conecte o handler ao formulário:
// ele vai observar o evento de submit
popupForm.addEventListener('submit', handleProfileFormSubmit)
