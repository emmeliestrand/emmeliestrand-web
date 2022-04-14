/* -------------------------------------------------
    MOBIL NAVIGATION
    OPEN AND CLOSE 
------------------------------------------------- */

function setMenuOpenIcon() {
    var menuIcon = document.querySelectorAll('.click-to-open-menu');
    if ( menuIcon ) {
        for ( var i = 0; i < menuIcon.length; i++ ) {
            menuIcon[i].addEventListener('click', function(event) {
                
                var body = document.querySelector('body');
                
                if (body.classList.contains('menu-is-open')) {
                    // dont do anything ...
                } else {
                    // open menu
                    body.classList.toggle('menu-is-open');
                }
            });
        }
    }
}
setMenuOpenIcon();

function setMenuCloseIcon() {
    var menuicon = document.querySelector('.header-close-menu');
    if (menuicon) {
        menuicon.addEventListener('click', function() {
            var body = document.querySelector('body');
            if (body.classList.contains('menu-is-open')) {
                // open menu
                body.classList.remove('menu-is-open');
                // close the children menus
                closeAllChildrenMenus();
                
            } else {
                // dont do anything ...
            }
        });
    }
}
setMenuCloseIcon();
function closeAllChildrenMenus() {
    var childMenus = document.querySelectorAll('.page_item_has_children');
    if ( childMenus ) {
        for ( var i = 0; i < childMenus.length; i++ ) {
            var childItem = childMenus[i];
            if (childItem.classList.contains('open-children-menu')) {
                childItem.classList.remove('open-children-menu');

                if (childItem.classList.contains('page_item_has_children')) {
                    // do not make the maxheight to 0
                    // Do nooothing
                } else {
                    childItem.style.maxHeight = 0 + "px";
                }
            }
            var childrenTest = childItem.children;
            for (var j = 0; j < childrenTest.length; j++) {
                if (childrenTest[j].classList.contains('children')) {
                    childrenTest[j].style.maxHeight = 0 + "px";
                }
            }
            
        }
    }
}
/* -------------------------------------------------
    MOBIL NAVIGATION
    SUB NAVIGATION
------------------------------------------------- */

//  when pressing level 1 ...
setLevelOneLink();
function setLevelOneLink() {
    var levelOne = document.querySelectorAll('.page_item a');
    if ( levelOne ) {
        for ( var i = 0; i < levelOne.length; i++ ) {
            levelOne[i].addEventListener('click', function(event) {
                //stop bubbling 
                event.stopPropagation();
            });
        }
    }
}

// when pressing the arrow to open level two ...
setOpenLevelTwo();
function setOpenLevelTwo() {
    var openLevelTwo = document.querySelectorAll('.page_item_has_children');
    if (openLevelTwo) {
        for ( var i = 0; i < openLevelTwo.length; i++ ) {

            openLevelTwo[i].addEventListener('click', function(event) {
                event.preventDefault();
                this.classList.toggle('open-children-menu');

    
//                calculate the max-height - but this is not working well when it's two levels 
                
                if ( this.classList.contains('open-children-menu') ) {
                    var children = this.children[1].children;
                    var height = getChildrenHeight(children);
                    this.children[1].style.maxHeight = (height + 18) + "px";
                    
                    // if this menu have a parent menu - add the height to this
                    if ( this.parentElement.classList.contains('children') ) {
                        var thisHeightPx = this.parentElement.style.maxHeight;
                        var thisHeightNumber = thisHeightPx.slice(0, -2);
                        
                        this.parentElement.style.maxHeight = (thisHeightNumber + height) + "px";
                    }   
                } else {
                    this.children[1].style.maxHeight = 0 + "px";
                }
                event.stopPropagation();
            });
        }
    }
}
function getChildrenHeight(children) {
    if (children) {
        var totalHeight = 0;
        for ( var i = 0; i < children.length; i++ ) {
            var height = children[i].offsetHeight;  
            totalHeight += height;
        }
        return totalHeight;
    }
}

// when pressing the arrow to open level three ...
setOpenLevelThree();
function setOpenLevelThree() {
    var openLevelThree = document.querySelectorAll('.page_item_has_children .page_item_has_children');
    if (openLevelThree) {
        for ( var i = 0; i < openLevelThree.length; i++ ) {
            openLevelThree[i].addEventListener('click', function(event) {
                event.stopPropagation();
            });
        }
    }
}

function setParentMenuItem() {
    var parent = document.querySelectorAll('.sub-menu.desktop .page_item_has_children');
    
    if (parent) {
        for (var i = 0; i < parent.length; i++) {
            parent[i].classList.add('open-children-menu');

        }
    }
    
    var parentDisable = document.querySelectorAll('.sub-menu.desktop .page_item_has_children');
    if (parentDisable) {
        for (var i = 0; i < parentDisable.length; i++) {
            var childDisable = parentDisable[i].firstChild;
            childDisable.addEventListener('click', function(event) {
                event.preventDefault();
                childDisable.disabled = true;
            });
        }
    }

}
setParentMenuItem();

function setPreventParentToBeClicked() {
    var parents = document.querySelectorAll('.header-mobil-inner .page_item_has_children .page_item_has_children > a');
    if ( parents ) {
        for ( var i = 0; i < parents.length; i++ ) {
            var parent = parents[i];
            parent.addEventListener("click", function(event) {
               event.preventDefault();
            });
        }
    }
}
setPreventParentToBeClicked();

// if children node is active = open every parent 
openAllParentNodes();
function openAllParentNodes() {
    var activeNodes = document.querySelectorAll('.header-mobil-inner .current_page_item');
    if (activeNodes) {
        for (var i = 0; i < activeNodes.length; i++) {
            var activeNode = activeNodes[i];
            var parent = activeNode.parentElement.parentElement;
            if ( parent.classList.contains("page_item_has_children") ) {
                parent.classList.toggle('open-children-menu');

    
//                calculate the max-height - but this is not working well when it's two levels 
                
                if ( parent.classList.contains('open-children-menu') ) {
                    

                    var children = parent.children[1].children;
                    var height = getChildrenHeight(children);
//                    parent.children[1].style.maxHeight = (height + 18) + "px";
                    parent.children[1].style.maxHeight = 1000 + "px";
                    
                    // if this menu have a parent menu - add the height to this
                    if ( parent.parentElement.classList.contains('children') ) {
                        var thisHeightPx = parent.parentElement.style.maxHeight;
                        var thisHeightNumber = thisHeightPx.slice(0, -2);
//                        parent.parentElement.style.maxHeight = (thisHeightNumber + height) + "px";
                        parent.parentElement.style.maxHeight = 1000 + "px";
                    }   
                    
                } else {
                    parent.children[1].style.maxHeight = 0 + "px";
                }
                
                
                
                
            }
            
        }
    }
}


/* -------------------------------------------------
    STICKY HEADER
    Woop woop
------------------------------------------------- */

function stickyNavigation() {
    var header = document.querySelector('header');
    var body = document.querySelector('body');
    var headerOffset = header.offsetTop;
    
    if (window.pageYOffset > headerOffset) {
        body.classList.add('header-is-sticky');
        header.classList.add("is-sticky");
    } else {
        header.classList.remove("is-sticky");
        body.classList.remove("header-is-sticky");
    }
}
window.addEventListener('scroll', stickyNavigation);




/* -------------------------------------------------
    Make the logo element clickable...
------------------------------------------------- */
var headerLogotype = document.querySelector('.header-inner .header-logotype');
if ( headerLogotype ) {
    var headerLogotypeLink = headerLogotype.children[0];
    
    headerLogotypeLink.addEventListener("click", function(event){
//        event.preventDefault(); DO not have this here!!
        event.stopPropagation();
    });
    headerLogotype.addEventListener("click", function(event) {
        window.location.href = headerLogotypeLink.href;
    });
}
/* -------------------------------------------------
    Make the mobil logo element clickable...
------------------------------------------------- */
var mobilHeaderLogotype = document.querySelector('.header-mobil-inner .header-logotype');
if ( mobilHeaderLogotype ) {
    var mobilHeaderLogotypeLink = mobilHeaderLogotype.children[0];
    
    mobilHeaderLogotypeLink.addEventListener("click", function(event){
        event.preventDefault();
        event.stopPropagation();
    });
    mobilHeaderLogotype.addEventListener("click", function(event) {
        window.location.href = mobilHeaderLogotypeLink.href;
    });
}


/* -------------------------------------------------
    DO THE HEADER NEED TO HAVE A 
    WHITE OR GREY BACKGROUND?
------------------------------------------------- */
// get the first section in the main content
var mainContent = document.querySelector('main');
if ( mainContent ) {
    var firstSectionInMain = getFirstSection(mainContent);
    
    if ( firstSectionInMain.classList.contains('have-background')) {
        // no background...
    } else if ( firstSectionInMain.classList.contains('o-hero') ) {
        // no background...
    } else {
        // if there is non of these classes, color the header grey
        colorHeader();
    }
}
function getFirstSection(mainContent) {
    var firstChild = mainContent.children[0];
    return firstChild;
}
function colorHeader() {
    var header = document.querySelector('header');
    header.style.backgroundColor = "rgba(247,247,247,0.95)";
}