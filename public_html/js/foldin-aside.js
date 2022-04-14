function setFoldAsideClickArea() {
    var clickArea = document.querySelector('.foldin-aside');
    if ( clickArea ) {
        clickArea.addEventListener('click', function() {
           toggleFoldinMenu(clickArea); 
        });
    }
}

setFoldAsideClickArea();

function toggleFoldinMenu(clickArea) {
    
    clickArea.classList.toggle('is-foldout');
    
    var subMenu = document.querySelector('.foldin-aside .sub-menu');
    subMenu.addEventListener("click", function(event) {
        event.stopPropagation();
    })
    
    var body = document.querySelector('body');
    body.classList.toggle('mypage-navigation-is-open');
    
    var content = document.querySelector('.foldin-aside .sub-menu');
    if ( content.style.maxHeight ) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
//        content.style.maxHeight = 2000 + "px";
    }
}


// Not in use right now. 
// Fix when "notifications" is back on track...

//function checkIfSubMenuHasNotification() {
//    
//    if ( document.querySelector(".have-notificator") !== undefined ) {
//        if ( document.querySelector(".have-notificator").closest('.foldin-aside') !== undefined) {
//            
//            var parent = document.querySelector(".have-notificator").closest('.foldin-aside');
//            parent.classList.add('show-notification');
//            
//            var notificationParent = document.querySelector('.show-notification');
//            
//            var notificationSymbol = document.createElement('div');
//            notificationSymbol.classList.add('notification-symbol');
//            notificationParent.appendChild(notificationSymbol);
//            
//        } else {
//
//        }
//    } else {
//        // var it be...
//    }
//}
//checkIfSubMenuHasNotification();