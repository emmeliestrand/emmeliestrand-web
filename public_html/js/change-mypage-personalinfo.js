setChangeMyPersonalInfo();
function setChangeMyPersonalInfo() {
    var changeMyPersonalInfoLinks = document.querySelectorAll('.change-mypage-personalinfo');
    // if the links exists ...
    if ( changeMyPersonalInfoLinks ) {
        
        for ( var i = 0; i < changeMyPersonalInfoLinks.length; i++ ) {
            var link = changeMyPersonalInfoLinks[i];
            link.addEventListener("click", function(event) {
                event.preventDefault();
                // get the parent and siblings... to reach ".change-mypage-personalinfo" element
                var container = this.parentNode.nextSibling.nextSibling;
                
                if ( container.classList.contains('content1') ) {
                    container.classList.remove('content1');
                    container.classList.add('content2');
                } else if ( container.classList.contains('content2') ) {
                    container.classList.remove('content2');
                    container.classList.add('content1');
                }
                
            });
            
        }
        
    }
}

setCancelChangeMyPersonalInfo();
function setCancelChangeMyPersonalInfo() {
    var cancelMyPersonalInfoBtns = document.querySelectorAll('.cancel-btn');
    if ( cancelMyPersonalInfoBtns ) {
        for ( var i = 0; i < cancelMyPersonalInfoBtns.length; i++ ) {
            var cancel = cancelMyPersonalInfoBtns[i];
            cancel.addEventListener("click", function(event) {
                // reset form...
                // style back to mypersonal info
                var container = cancel.parentNode.parentElement.parentElement.parentElement.parentElement;
                container.classList.remove('content2');
                container.classList.add('content1');

            });
        }
    }
}