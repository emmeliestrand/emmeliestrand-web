var addressBlock = document.querySelectorAll('.address-block.check-height');

if ( addressBlock ) {
    for ( var i = 0; i < addressBlock.length; i++ ) {
        
        // height
        var block = addressBlock[i];
        var blockHeight = getBlockHeight(block);
        var maxHeight = 14;
        if ( blockHeight > maxHeight ) {
            block.classList.add('smaller');
        }
        
        // click
        block.addEventListener("click", function(event) {
            event.preventDefault();
            event.stopPropagation();
            toggleClass(this);
        });
    }
}
function getBlockHeight(block) {
    var height = block.clientHeight;
    return height;
}
function toggleClass(block) {
    block.classList.toggle('smaller');
}