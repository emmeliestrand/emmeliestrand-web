function setTabBtns() {
    var tabBtns = document.querySelectorAll('.tab-button');
    if (tabBtns) {
        for ( var i = 0; i < tabBtns.length; i++ ) {
            var tabBtn = tabBtns[i];
            tabBtn.addEventListener('click', function(event) {
                event.preventDefault();
                showTabContent(tabBtn);
            });
        }
    }
}
setTabBtns();

function showTabContent(tabBtn) {
    
    // check what content that is active now
    var activeContent = document.querySelector('.tab-container');
    activeContent = activeContent.classList[1];
    
    // get the clicked tabs content-class
    var clickedTabContent = tabBtn.classList[2];
    
    // check if we have to change content, or not...
    if ( activeContent == clickedTabContent ) {
        // it's the same content, do nothing...
        document.querySelector('.tab-container').classList.add('content1');
        document.querySelector('.tab-container').classList.remove(clickedTabContent);
    } else {
        // change the active content
        document.querySelector('.tab-container').classList.remove(activeContent);
        document.querySelector('.tab-container').classList.add(clickedTabContent);
    }
}

// calls when the page is loaded
function setFoldoutLink() {
    // get the two a-links
    var foldoutLink = document.querySelectorAll('.foldout-container a');
    if ( foldoutLink ) {
        for ( var i = 0; i < foldoutLink.length; i++ ) {
            var link = foldoutLink[i];
            // when link is cliked - open this content...
            link.addEventListener('click', function(event) {
                event.preventDefault();
                toggleFoldoutContent(this.parentElement);
            });
        }
    }
}
setFoldoutLink();
// toggles the help-content
function toggleFoldoutContent(link) {
    //var linkParent = link.parentElement;
    link.classList.toggle('is-open');
    
}