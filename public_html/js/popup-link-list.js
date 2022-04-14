setOpenPopup();

function setOpenPopup() {
    var openPopupClick = document.querySelectorAll('.popup-li');
    if ( openPopupClick ) {
        for ( var i = 0; i < openPopupClick.length; i++ ) {
            var clickArea = openPopupClick[i];
            clickArea.addEventListener("click", function(event) {
                event.preventDefault();
                this.classList.toggle('is-open');
            });
        }
    }
}