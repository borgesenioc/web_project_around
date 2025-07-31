import { API_TOKEN, API_BASE_URL } from './config.js'

export default class Api {
    constructor({ baseUrl = API_BASE_URL, headers = {} }) {
        this._baseUrl = baseUrl
        this._headers = {
            authorization: API_TOKEN,
            'Content-Type': 'application/json',
            ...headers,
        }
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Error: ${res.status}`)
    }

    // Get initial cards from the server
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        }).then(this._checkResponse)
    }

    // Get user info from the server
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        }).then(this._checkResponse)
    }

    // Update profile data
    updateUserInfo({ name, about }) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about,
            }),
        }).then(this._checkResponse)
    }

    // Add new card
    addCard({ name, link }) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name,
                link,
            }),
        }).then(this._checkResponse)
    }

    // Delete a card
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._checkResponse)
    }

    // Add like
    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers,
        }).then(this._checkResponse)
    }

    // Remove like
    removeLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._checkResponse)
    }

    // Update profile picture
    updateAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar,
            }),
        }).then(this._checkResponse)
    }

    // Get initial data (user info and cards)
    getAppInfo() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()])
    }
}
