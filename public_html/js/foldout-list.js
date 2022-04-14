function setFoldoutListItem() {
    var foldoutListItem = document.querySelectorAll('.o-foldout-list li h3');
    
    if ( foldoutListItem ) {
        for ( var i = 0; i < foldoutListItem.length; i++ ) {

            var parentLi = foldoutListItem[i].parentElement;
            foldoutListItem[i].addEventListener("click", function() {
                
                var clickedItem = this;
                var parentLi = clickedItem.parentElement;
                parentLi.classList.toggle('is-active');
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
setFoldoutListItem();
