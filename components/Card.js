export default class Card {
    // Private fields
    #name
    #link
    #templateSelector
    #element
    #handleCardClick
    #handleDeleteClick
    #handleLikeClick
    #cardId
    #userId
    #ownerId
    #isLiked

    constructor(
        { name, link, _id, isLiked, owner },
        templateSelector,
        { handleCardClick, handleDeleteClick, handleLikeClick },
        userId
    ) {
        this.#name = name
        this.#link = link
        this.#templateSelector = templateSelector
        this.#handleCardClick = handleCardClick
        this.#handleDeleteClick = handleDeleteClick
        this.#handleLikeClick = handleLikeClick
        this.#cardId = _id
        this.#userId = userId
        this.#ownerId = owner._id || owner // Sometimes the API returns owner as object, sometimes as string
        this.#isLiked = isLiked
    }

    #getTemplate() {
        const template = document
            .querySelector(this.#templateSelector)
            .content.querySelector('.elements__card')
        return template.cloneNode(true)
    }

    getId() {
        return this.#cardId
    }

    #handleLike = () => {
        this.#handleLikeClick(this.#cardId, this.#isLiked)
    }

    #handleDelete = () => {
        this.#handleDeleteClick(this.#cardId)
    }

    setLikeStatus(isLiked) {
        this.#isLiked = isLiked
        this.#updateLikeButton()
    }

    #updateLikeButton() {
        const likeButton = this.#element.querySelector(
            '.elements__card-header-like-button'
        )
        if (this.#isLiked) {
            likeButton.classList.add('elements__card-header-like-button_active')
        } else {
            likeButton.classList.remove(
                'elements__card-header-like-button_active'
            )
        }
    }

    removeCard() {
        this.#element.remove()
        this.#element = null
    }

    #setEventListeners() {
        // Like button
        this.#element
            .querySelector('.elements__card-header-like-button')
            .addEventListener('click', this.#handleLike)

        // Delete button (only for cards created by current user)
        const deleteButton = this.#element.querySelector(
            '.elements__card-trash-button'
        )
        if (this.#ownerId === this.#userId) {
            deleteButton.addEventListener('click', this.#handleDelete)
        } else {
            deleteButton.style.display = 'none' // Hide delete button if not owner
        }

        // Image click
        this.#element
            .querySelector('.elements__card-image-button')
            .addEventListener('click', () => {
                this.#handleCardClick(this.#name, this.#link)
            })
    }

    generateCard() {
        this.#element = this.#getTemplate()

        const imageEl = this.#element.querySelector('.elements__card-image')
        const titleEl = this.#element.querySelector(
            '.elements__card-header-title'
        )
        imageEl.src = this.#link
        imageEl.alt = this.#name
        titleEl.textContent = this.#name

        // Set initial like status
        this.#updateLikeButton()

        this.#setEventListeners()

        return this.#element
    }
}
