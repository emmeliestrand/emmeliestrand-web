function setToggleFoldout() {
    var clickArea = document.querySelectorAll('.click-to-toggle-foldout-content');
    
    if ( clickArea ) {
        for ( var i = 0; i < clickArea.length; i++ ) {

            var parentLi = clickArea[i].closest('li');
            clickArea[i].addEventListener("click", function() {
                
                
                var clickedItem = this;
                console.log(this);
                var parentLi = clickedItem.closest('li');
                parentLi.classList.toggle('show-content');
                var content = this.nextElementSibling;
                
                if ( content.style.maxHeight ) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
         }
     }
}
setToggleFoldout();
