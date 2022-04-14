// Check if the header in .m-real-estat-block is long...
var realEstatHeadline = document.querySelectorAll('.m-real-estat-block .textarea h3');
if ( realEstatHeadline ) {
    for ( var i = 0; i < realEstatHeadline.length; i++ ) {
        
        var headline = realEstatHeadline[i];
        var headlineHeight = headline.clientHeight;
        if ( headlineHeight > 27 ) {
            makeHeadlineFade(headline);
        } else {
            // this have a perfect height
        }
    }
}
function makeHeadlineFade(headline) {
//      add a class to style this
//    headline.classList.add('fadeout-text'); not in use, there is css for it
    var headlineString = headline.innerHTML;
    // where is the first "'" = n
    var n = headlineString.indexOf(",");

    var trimmedHeadlineString = headlineString.substring(0, n);
    var printThis = trimmedHeadlineString + ", ... ";
    headline.innerHTML = printThis;
}


// Check if the header in .m-real-estat-block is long...
var premisesText = document.querySelectorAll('.m-premises-list-item .text');
if ( premisesText ) {
    for ( var i = 0; i < premisesText.length; i++ ) {
        
        var text = premisesText[i];
        var textHeight = text.clientHeight;
        if ( textHeight > 66 ) {
            makeTextFade(text);
        } else {
            // this have a perfect height
        }
    }
}

function makeTextFade(headline) {
//      add a class to style this
//    headline.classList.add('fadeout-text'); not in use, there is css for it
    var headlineString = headline.innerHTML;
    // where is the first "'" = n
//    var n = headlineString.indexOf(",");

    var trimmedHeadlineString = headlineString.substring(0, 200);
    var printThis = trimmedHeadlineString + "... ";
    headline.innerHTML = printThis;
}
