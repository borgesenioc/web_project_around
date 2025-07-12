// modificado no sprint 11
export default class Card {
    // Campos privados
    #name
    #link
    #templateSelector
    #element
    #handleCardClick

    /**
     * @param {{ name: string, link: string }} data — dados do cartão (texto e URL da imagem)
     * @param {string} templateSelector — seletor CSS para o elemento <template>
     * @param {Function} handleCardClick — callback para quando a imagem do cartão é clicada
     */
    constructor({ name, link }, templateSelector, handleCardClick) {
        this.#name = name
        this.#link = link
        this.#templateSelector = templateSelector
        this.#handleCardClick = handleCardClick
    }

    // Clona o template e retorna um novo elemento de cartão
    #getTemplate() {
        const template = document
            .querySelector(this.#templateSelector)
            .content.querySelector('.elements__card')
        return template.cloneNode(true)
    }

    // Manipulador: alterna o estado do botão "like"
    #handleLike = () => {
        this.#element
            .querySelector('.elements__card-header-like-button')
            .classList.toggle('elements__card-header-like-button_active')
    }

    // Manipulador: remove este cartão do DOM
    #handleDelete = () => {
        this.#element.remove()
    }

    // Adiciona event listeners aos controles do cartão
    #setEventListeners() {
        this.#element
            .querySelector('.elements__card-header-like-button')
            .addEventListener('click', this.#handleLike)
        this.#element
            .querySelector('.elements__card-trash-button')
            .addEventListener('click', this.#handleDelete)
        this.#element
            .querySelector('.elements__card-image-button')
            .addEventListener('click', () => {
                // Chama o callback passando nome e link
                this.#handleCardClick(this.#name, this.#link)
            })
    }

    /**
     * Método público — gera o elemento DOM para este cartão,
     * preenche com dados, conecta listeners e o retorna.
     * @returns {HTMLElement}
     */
    generateCard() {
        this.#element = this.#getTemplate()

        // preenche o conteúdo
        const imageEl = this.#element.querySelector('.elements__card-image')
        const titleEl = this.#element.querySelector(
            '.elements__card-header-title'
        )
        imageEl.src = this.#link
        imageEl.alt = this.#name
        titleEl.textContent = this.#name

        // adiciona event listeners
        this.#setEventListeners()

        return this.#element
    }
}
