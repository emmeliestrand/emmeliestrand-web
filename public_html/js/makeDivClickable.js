var newsPuffs = document.querySelectorAll('.m-news-puff .inner');
if ( newsPuffs ) {
    for ( var i = 0; i < newsPuffs.length; i++ ) {
        var puff = newsPuffs[i];
        puff.addEventListener("click", function(event) {
            
            // find the href in the a-link
            var children = this.children;

            for ( var j = 0; j < children.length; j++ ) {
                var child = children[j]
                if ( child.classList.contains('cta-link') ) {
                    console.log(href);
                    var href = child.getAttribute('href');
                    window.location.href = href;
                }
            }

        });
        
    }
}

var lokalListning = document.querySelectorAll('.m-premises-list-item');
if ( lokalListning ) {
    for ( var i = 0; i < lokalListning.length; i++ ) {
        var lokalListItem = lokalListning[i];
        lokalListItem.addEventListener("click", function(event) {
            var children = this.children;
            for ( var j = 0; j < children.length; j++) {
                if ( children[j].classList.contains('aside') ) {
                    var link = children[j].children[2];
                    var href = link.getAttribute('href');
                    window.location.href = href;
                }
            }
        });
    }
}

var nyhetsArkiv = document.querySelectorAll('.news-item');
if ( nyhetsArkiv ) {
    for ( var i = 0; i < nyhetsArkiv.length; i++ ) {
        var nyhet = nyhetsArkiv[i];
        nyhet.addEventListener("click", function(event) {
            
            // find the href in the a-link
            var children = this.children;
            for ( var j = 0; j < children.length; j++ ) {
                var child = children[j]
                if ( child.classList.contains('cta-link') ) {
                    var href = child.getAttribute('href');
                    console.log(href);
                    window.location.href = href;
                }
            }

        });
    }
}