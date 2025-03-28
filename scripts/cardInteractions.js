import { elementsContainer } from './loadInitialCards.js'

let deleteButtons = document.querySelectorAll('.elements__card-trash-button')

let clickableImages = document.querySelectorAll('.elements__card-image-button')

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
    document.body.appendChild(imageHighlight)
}

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

// a listener for each image
clickableImages.forEach((button) => {
    button.addEventListener('click', (evt) => {
        createImageHighlight(evt)
    })
})

// make the image clickable DONE

// create a popup template with the whole image DONE

// add exclude button DONE

// add css element that displays the image DONE

// add js script that listens and crates the popup the image

// add js script that listens and deletes the element
