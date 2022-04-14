//ifContentPage();
//function ifContentPage() {
//    // Check if it's a mypage-page
//    var contentPage = document.querySelector('.t-content-page');
//    if ( contentPage ) {
//        setHeightPageMain();
//    }
//}
//function setHeightPageMain() {
//    var pageMain = document.querySelector('.page-main');
//    var pageAside = document.querySelector('.page-aside .sub-menu ul');
////    var pageAside = document.querySelectorAll('.page-aside .sub-menu ul');
//    
////    var asideHeight;
//    
////    for( var i = 0; i < pageAside.length; i++ ) {
////        var ul = pageAside[i];
////       
//        
////        if ( pageAside[i].classList.contains("children") ) {
////            console.log(asideHeight);
////            // this is a children ul - that is closed height = 0
////            // we have to calculate the height with the LI in the ul.children
////            var children = ul.children;
////            var childrenHeight = 0;
////            
////            console.log(children);
////            
////            for ( var j = 0; j < children.length; j++ ) {
////                var childHeight = children[i].offsetHeight * 2;
////                childrenHeight += childHeight;
////            }
////            // sum up the 
////            asideHeight += childrenHeight;
////            console.log(childrenHeight);
////        } else {
////            asideHeight = pageAside[i].offsetHeight;
////        }
////    } 
//
//    // height for main content
//    var mainHeight = pageMain.offsetHeight;
//
//    var asideHeight = pageAside.offsetHeight;
//    
//    // IF ASIDE is bigger then MAIN ...
//    if ( asideHeight > mainHeight ) {
//        pageMain.style.minHeight = (asideHeight + 60) + "px";
//    } else {
//        // var it be, var it be...
//    }
//}
//
//
//
