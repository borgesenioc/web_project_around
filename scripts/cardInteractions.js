import { elementsContainer } from './loadInitialCards.js'

let deleteButtons = document.querySelectorAll('.elements__card-trash-button')

let imageTemplate = document.querySelector('#image-highlight').content

// method that toggles a css modifier on the like button
function toggleLikeButton(evt) {
    evt.target.classList.toggle('likeButtonClicked')
}

// method that deletes a card on click
const deleteCard = (evt) => {
    evt.target.parentNode.remove()
}

// method that creates an image popup on click
const createImageHighlight = (evt) => {
    let imageHighlight = document.importNode(imageTemplate, true) // creates the image popup from the image highlight template
    let highlightImage = imageHighlight.querySelector('.popup-image__highlight')
    highlightImage.src = evt.target.parentElement.querySelector(
        '.elements__card-image'
    ).src

    let highlightParagraph = imageHighlight.querySelector(
        '.popup-image__paragraph'
    )
    highlightParagraph.textContent = evt.target.parentElement.querySelector(
        '.elements__card-header-title'
    ).textContent

    highlightImage.alt = highlightParagraph.textContent

    document.body.appendChild(imageHighlight)

    let imageHighlightDeleteButton = document.querySelector(
        '.popup-image__trash-button'
    )
    // listener for the image hightlight delete button
    imageHighlightDeleteButton.addEventListener('click', (evt) => {
        deleteImageHighlight(evt)
    })
}

// method that deletes the image popup on click

const deleteImageHighlight = (evt) => {
    evt.target.closest('.popup-image').remove()
}

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

// a listener for each image
elementsContainer.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('elements__card-image-button')) {
        createImageHighlight(evt)
    }
})
