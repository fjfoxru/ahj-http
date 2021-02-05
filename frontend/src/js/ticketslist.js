import Ticket from './ticket';

export default class TicketsList {
    constructor(elementInDOM, url) {
        this.list = [];
        this.elementInDOM = elementInDOM;
        this.modal = null;
        this.dataUrl = url;
    }
    async fetchData() {
        let response = await fetch(this.dataUrl);
        if (response.ok) {
            let list = await response.json();
            this.elementInDOM.innerHTML = '';
            list.forEach(ticket => {
                let ticketEl = new Ticket(ticket);
                ticketEl.modal = this.modal;
                ticketEl.parentList = this;
                ticketEl.bindToDOM();
                this.elementInDOM.appendChild(ticketEl.elementInDOM);
            });

        } else {
            console.log("Ошибка HTTP: " + response.status);
        }
    }
    
}