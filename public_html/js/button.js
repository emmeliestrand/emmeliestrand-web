// Make the parent element clickable in buttons

setButtons();
function setButtons() {
    var buttons = document.querySelectorAll('.button-inner');
    if ( buttons ) {
        for ( var i = 0; i < buttons.length; i++ ) {
            var button = buttons[i];
            button.addEventListener("click", function(event) {
                // get the a link
                var buttonLink = this.children[0];
                // trigger click on a-link
                buttonLink.click();
            });
        }
    }
}
setButtonLinks();
function setButtonLinks() {
    var buttonLinks = document.querySelectorAll('.button-inner a');
    if ( buttonLinks ) {
        for ( var i = 0; i < buttonLinks.length; i++ ) {
            var link = buttonLinks[i];
            link.addEventListener("click", function(event) {
                // stop bubbling
                event.stopPropagation();
            });
        }
    }
}