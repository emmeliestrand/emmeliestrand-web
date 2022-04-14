var searchIcon = document.querySelector('.search-icon-btn');
if ( searchIcon ) {
    searchIcon.addEventListener("click", function() {
        var theURL = window.location.href;
        saveUrlToStorage(theURL);
    });
}

function saveUrlToStorage(url) {
    // Puts the url in an object
    var urlObject = url;
    // Put the object into storage
    localStorage.setItem('urlObject', JSON.stringify(urlObject));
    
}

var closeSearch = document.querySelectorAll('.close-search');
if ( closeSearch ) {
    for ( var i = 0; i < closeSearch.length; i++ ) {
        var close = closeSearch[i];
        close.addEventListener("click", function() {
           closeSearchFunc(close); 
        });
    }
}

function closeSearchFunc() {
    // Retrieve the object from storage
    var retrievedUrlObject = localStorage.getItem('urlObject');
    var url = JSON.parse(retrievedUrlObject);
    if ( url == null ) {
        url = '/';
    }
    window.location.href = url;
}