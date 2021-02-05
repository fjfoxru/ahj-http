export default class Modal {
    constructor(elementInDOM) {
        this.elementInDOM = elementInDOM;
        this.contentInDOM = this.elementInDOM.querySelector('[data-id=tickets-modal-content]');
        this.closeButtonInDOM = this.elementInDOM.querySelector('[data-id=tickets-modal-close]');
        this.closeButtonInDOM.addEventListener('click', () => {
            this.close();
        });
    }
    open(elementToModal) {
        this.elementInDOM.classList.add('open');
        this.contentInDOM.innerHTML = '';
        this.contentInDOM.insertAdjacentElement('beforeEnd', elementToModal);
    }
    close() {
        this.elementInDOM.classList.remove('open');
        this.contentInDOM.innerHTML = '';
    }


}