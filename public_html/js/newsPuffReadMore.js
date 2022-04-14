var newsPuffText = document.querySelectorAll('.m-news-puff .inner > .ingress > p');
if ( newsPuffText ) {
    for ( i = 0; i < newsPuffText.length; i++ ) {
        
        var paragraph = newsPuffText[i];
        
        var text = newsPuffText[i].innerHTML;
        var textLength = text.length;
        
        var maxLimit = 150;
        // is the text long ...
        // true
        if ( textLength > maxLimit ) {
            var shortText = text.substring(0, 149);
            var dots = "...";
            var newText = shortText + dots;
 
            // change the text 
            changeInnerHtml(newText, paragraph);
        } 
        // else false
        // ... do nothing :) 
    }
}
function changeInnerHtml(text, element) {
    element.innerHTML = text;
}