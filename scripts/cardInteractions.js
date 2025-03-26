import { elementsContainer } from './loadInitialCards.js'

let deleteButtons = document.querySelectorAll('.elements__card-trash-button')

// method that toggles a css modifier on the like button
function toggleLikeButton(evt) {
    evt.target.classList.toggle('likeButtonClicked')
}

// method that deletes a card on click
const deleteCard = (evt) => {
    evt.target.parentNode.remove()
}

elementsContainer.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('elements__card-header-like-button')) {
        toggleLikeButton(evt)
    }
})

deleteButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
        deleteCard(evt)
    })
})
