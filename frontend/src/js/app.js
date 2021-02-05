// TODO: write code here

import TicketsList from './ticketslist';
import Modal from './modal';
import Form from './form';

const ticketsAddFormContainer = document.querySelector('[data-id=tickets-add-form]');
const buttonAddTicket = document.querySelector('[data-id=tickets-add-button]');
const modalInDOM = document.querySelector('[data-section=tickets-modal]');
const modal = new Modal(modalInDOM);
async function addNewElement(element) {
    let response = await fetch('http://localhost:7070/?method=createTicket', {
        method: 'POST',
        body: JSON.stringify(element),
    });
        if (response.ok) {
            ticketslist.fetchData();
        } else {
            console.log("Ошибка HTTP: " + response.status);
        }
}

const ticketsAddForm = new Form('', 'Новый элемент', 'Новое описание', addNewElement.bind(this) );
ticketsAddForm.bindToDOM();
ticketsAddFormContainer.appendChild(ticketsAddForm.elementInDOM);

buttonAddTicket.addEventListener('click', (evt) => {
    evt.preventDefault();
    ticketsAddForm.open();
});

const ticketsListInDOM = document.querySelector('[data-section=tickets-list]');

const ticketslist = new TicketsList(ticketsListInDOM, 'http://localhost:7070/?method=allTickets');
ticketslist.modal = modal;
ticketslist.fetchData();