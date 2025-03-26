import { elementsContainer } from './loadInitialCards.js'

// method that toggles a css modifier on the like button
function toggleLikeButton(evt) {
    evt.target.classList.toggle('likeButtonClicked')
}

elementsContainer.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('elements__card-header-like-button')) {
        toggleLikeButton(evt)
    }
})
