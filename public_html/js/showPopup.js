// Show the popup
var showPopupBtn = document.querySelectorAll('.show-popup-btn');

if ( showPopupBtn ) {
    for ( var i = 0; i < showPopupBtn.length; i++ ) {
        var btn = showPopupBtn[i];
        btn.addEventListener("click", function(event) {
            console.log(btn);
            showPopup();
        });
    }
}

function showPopup() {
    var popup = document.querySelector('.o-popup-content');
    console.log(popup);
    popup.classList.add('show-popup');
}

// Close popup
var closePopupBtn = document.querySelector('.popup-close-btn');

if (closePopupBtn) {
    closePopupBtn.addEventListener("click", function(event) {
        var thisPopup = this.parentElement.parentElement;
        closePopup(this, thisPopup);
    });
}
function closePopup(btn, thisMap) {
    thisMap.classList.remove('show-popup');
}

