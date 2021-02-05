export default class Form {
    constructor(id = '', name = '', description = '', callback) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.callback = callback;
        this.elementInDOM = null;
    }
    murkup() {
        return `
        <input name="name" data-id="name" value="${this.name}">
        <input name="description" data-id="description" value="${this.description}">
        <button>Сохранить</button>
        `;
    }

    bindToDOM() {
        const form = document.createElement('form');
        form.innerHTML = this.murkup();
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const newName = form.querySelector('[data-id=name]').value;
            const newDescription = form.querySelector('[data-id=description]').value;
            this.name = newName;
            this.description = newDescription;
            this.callback({id: this.id, name: this.name, description: this.description});
        });
        this.elementInDOM = form;
    }


}