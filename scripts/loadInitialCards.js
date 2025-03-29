const initialCards = [
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

let elementsContainer = document.querySelector('.elements')
let cardTemplate = document.querySelector('#card').content

const addCard = (card) => {
    let cardClone = document.importNode(cardTemplate, true) // create a clone based on the template
    let cardImage = cardClone.querySelector('.elements__card-image')
    cardImage.src = card.link
    let cardTitle = cardClone.querySelector('.elements__card-header-title')
    cardTitle.textContent = card.name
    cardImage.alt = card.name

    elementsContainer.prepend(cardClone) // append the clone to the end of the container
}

const addInitialCards = (cards) => {
    // adds initialCards if cards container is empty
    if (!elementsContainer.hasChildNodes()) {
        cards
            .slice()
            .reverse()
            .forEach((card) => {
                addCard(card)
            })
    }
}

addInitialCards(initialCards)

export { elementsContainer, cardTemplate, addCard }
