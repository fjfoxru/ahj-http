import Form from './form';

export default class Ticket {
    constructor(obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.status = obj.status;
        this.created = obj.status;
        this.elementInDOM = null;
        this.modal = null;
        this.parentList = null;
    }
    markup() {
        return `
            <div>${this.name}</div>
            <div>${this.description}</div>
            <div>${this.status}</div>
            <button data-id="button-about">Подробное описание</button>
            <button data-id="button-edit">Редактировать</button>
            <button data-id="button-delete">Удалить</button>
        `
    }
    markupFull() {
        return `
        <div>${this.id}</div>
        <div>${this.name}</div>
        <div>${this.description}</div>
        <div>${this.status}</div>
        <div>${this.created}</div>
    `
    }

    aboutInDOM() {
        const fullElementInDOM = document.createElement('div');
        fullElementInDOM.insertAdjacentHTML('afterbegin', this.markupFull());
        return fullElementInDOM;
    }

    editInDOM() {
        const ticketsEditForm = new Form(this.id, this.name, this.description, this.fetchEdit.bind(this));
        ticketsEditForm.bindToDOM();
        this.modal.open(ticketsEditForm.elementInDOM);
    }

    bindToDOM() {
        this.elementInDOM = document.createElement('div');
        this.elementInDOM.insertAdjacentHTML('afterbegin', this.markup());
        const buttonAbout = this.elementInDOM.querySelector('[data-id=button-about]');
        const buttonEdit = this.elementInDOM.querySelector('[data-id=button-edit]');
        const buttonDelete = this.elementInDOM.querySelector('[data-id=button-delete]');
        buttonAbout.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.fetchAbout();
        });
        buttonDelete.addEventListener('click', evt => {
            evt.preventDefault();
            this.fetchDelete();
        });
        buttonEdit.addEventListener('click', evt => {
            evt.preventDefault();
            this.editInDOM();
        });
    }
    async fetchAbout() {
        let response = await fetch(`http://localhost:7070/?method=ticketById&id=${this.id}`);
            if (response.ok) {
                let fullAbout = await response.json();
                this.modal.open(this.aboutInDOM());
            } else {
                console.log("Ошибка HTTP: " + response.status);
            }
    }
    async fetchDelete() {
        let response = await fetch(`http://localhost:7070/?method=deleteTicketById&id=${this.id}`);
            if (response.ok) {
                this.modal.close();
                this.parentList.fetchData();

            } else {
                console.log("Ошибка HTTP: " + response.status);
            }
    }

    async fetchEdit(element) {
        let response = await fetch('http://localhost:7070/?method=editTicket', {
        method: 'POST',
        body: JSON.stringify({
            ...element,
        }),
    });
        if (response.ok) {
            this.modal.close();
            this.parentList.fetchData();
        } else {
            console.log("Ошибка HTTP: " + response.status);
        }
    }

}