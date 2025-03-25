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

const elementsContainer = document.querySelector('.elements')
const cardTemplate = document.querySelector('#card').content

const addInitialCards = (cards) => {
    // add cards if container is empty
    if (!elementsContainer.hasChildNodes()) {
        cards.forEach((cardData) => {
            const cardClone = document.importNode(cardTemplate, true) // create a clone based on the template
            const cardImage = cardClone.querySelector('.elements__card-image')
            cardImage.src = cardData.link
            const cardTitle = cardClone.querySelector(
                '.elements__card-header-title'
            )
            cardTitle.textContent = cardData.name

            elementsContainer.append(cardClone) // append the clone to the end of the container
        })
    }
}

addInitialCards(initialCards)
