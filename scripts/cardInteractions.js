import { elementsContainer } from './loadInitialCards.js'

let deleteButtons = document.querySelectorAll('.elements__card-trash-button')

let clickableImages = document.querySelectorAll('.elements__card-image')

// method that toggles a css modifier on the like button
function toggleLikeButton(evt) {
    evt.target.classList.toggle('likeButtonClicked')
}

// method that deletes a card on click
const deleteCard = (evt) => {
    evt.target.parentNode.remove()
}

// method that creates an image popup on click

// method that deletes the image popup on click

// listener for the parent of like buttons
elementsContainer.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('elements__card-header-like-button')) {
        toggleLikeButton(evt)
    }
})

// a listener for each delete button
deleteButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
        deleteCard(evt)
    })
})

// make the image clickable

// create a popup template with the whole image

// add exclude button

// add css element that displays the image

// add js script that listens and crates the popup the image

// add js script that listens and deletes the element
