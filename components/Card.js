export default class Card {
    // Campos privados
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
        this.#ownerId = owner._id || owner // Às vezes a API retorna owner como objeto, às vezes como string
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
        // Botão de curtir
        this.#element
            .querySelector('.elements__card-header-like-button')
            .addEventListener('click', this.#handleLike)

        // Botão de deletar (apenas para cards criados pelo usuário atual)
        const deleteButton = this.#element.querySelector(
            '.elements__card-trash-button'
        )
        if (this.#ownerId === this.#userId) {
            deleteButton.addEventListener('click', this.#handleDelete)
        } else {
            deleteButton.style.display = 'none' // Esconde o botão de deletar se não for o dono
        }

        // Clique na imagem
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

        // Define o status inicial de curtir
        this.#updateLikeButton()

        this.#setEventListeners()

        return this.#element
    }
}
