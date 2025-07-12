export default class UserInfo {
    constructor({ nameSelector, jobSelector }) {
        this._nameElement = document.querySelector(nameSelector)
        this._jobElement = document.querySelector(jobSelector)
    }

    // Método público que retorna um objeto com a informação do usuário
    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            job: this._jobElement.textContent,
        }
    }

    // Método público que atualiza a informação do usuário na página
    setUserInfo({ name, job }) {
        if (name) this._nameElement.textContent = name
        if (job) this._jobElement.textContent = job
    }
}
