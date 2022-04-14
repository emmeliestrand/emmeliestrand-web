var popupClose = document.querySelector('.o-info-popup .close-popup');
if ( popupClose ) {
    popupClose.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();
        var popupBG = document.querySelector('.o-info-popup');
        closePopup(popupBG);
    });
}


var popupInner = document.querySelector('.o-info-popup .inner');
if ( popupInner ) {
    popupInner.addEventListener("click", function(event){
        event.stopPropagation();
    });
}

var popup = document.querySelector('.o-info-popup');

if ( popup ) {
    popup.addEventListener("click", function(event) {
        event.preventDefault();
        closePopup(this);  
    });
}
function closePopup(popupBG) {
    popupBG.classList.add('close');
}
