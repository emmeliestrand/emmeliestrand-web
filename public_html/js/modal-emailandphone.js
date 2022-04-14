const email_modal = document.querySelector('.modal');
//const trigger = document.querySelector('.trigger');
const closeButton = document.querySelector('.close-button');

function toggleModal() {
    email_modal.classList.toggle('show-modal');
}

function windowOnClick(event) {
    if (event.target === email_modal) {
        toggleModal();
    }
}

//trigger.addEventListener('click', toggleModal);
closeButton.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnClick);