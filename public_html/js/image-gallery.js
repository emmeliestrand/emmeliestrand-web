/* ---------------------------------------------

        IMAGE GALLERY in box 

--------------------------------------------- */
function setPaginationBtns() {

    // the buttons for pagination
    var leftBtn = document.querySelectorAll('.gallery-pagingation-left');
    var rightBtn = document.querySelectorAll('.gallery-pagingation-right');
    
//    create gallery index = what gallery are the user interacting with
    var galleryIndex;
    
//    if left btn is clicked...
    if ( leftBtn ) {
        for (var i = 0; i < leftBtn.length; i++ ) {
            // if the right button is clicked, minus image index
            leftBtn[i].addEventListener("click", function(event) {
                event.preventDefault();
                event.stopPropagation();
                galleryIndex = getGalleryId(this);
                // go BACK in the gallery
                var n = 'sub';
                triggerChangeImage(n, galleryIndex);
            });
        }
    }
    
//    if right button is clicked...
    if ( rightBtn ) {
        for (var i = 0; i < rightBtn.length; i++ ) {
            // if the right button is clicked, add image index
            rightBtn[i].addEventListener("click", function(event) {
                event.preventDefault();
                event.stopPropagation();
                galleryIndex = getGalleryId(this);
                // go FORWARD in the gallery
                var n = 'add';
                triggerChangeImage(n, galleryIndex);
            });
        }
    }
}
setPaginationBtns();

function setMaxHeightOfGallery() {
    var flexGallery = document.querySelectorAll('.image-gallery.flexheight');
    if ( flexGallery ) {
    
        for ( var i = 0; i < flexGallery.length; i++ ) {
            
            var gallery = flexGallery[i];
            // get the ID of this gallery
            var galleryID = gallery.dataset.galleryindex;
            
            // get all the images
            var images = document.querySelectorAll('#' + galleryID + ' .imgSlides');
            var imagesHeights = [];
            for ( var i = 0; i < images.length; i++ ) {
                var image = images[i];
                var imageHeight = image.height;
                imageHeight = parseInt(imageHeight);
                // save the height in a array
                imagesHeights.push(imageHeight);
            }
            // get the smallest height
            var minHeight = getSmallestHeight(imagesHeights); 
            // style the image galleri width that height as a max-height
            gallery.style.maxHeight = minHeight + "px";
            // done
        }
    }
}
// this is not working" 
//setMaxHeightOfGallery();

function getSmallestHeight(imagesHeights) {
    // variable for gallerysMinHeight;
    var gallerysMinHeight;
    
    for ( var i = 0; i < imagesHeights.length; i++ ) {
    
        // height of this images
        var height = imagesHeights[i];
        
        // when the 
        if ( gallerysMinHeight == undefined ) {
            gallerysMinHeight = height;
        } else if ( height > gallerysMinHeight ) {
            // dont add this height, becuade this is bigger than saved...
        } else if ( height < gallerysMinHeight ) {
            // save this, becaude this is smaller
            gallerysMinHeight = height;
        }
    }
    return gallerysMinHeight;
}

// Step 2
function triggerChangeImage(n, galleryIndex) {
    
//    n tells if we are going backwards or forwards in the gallery 
//    galleryindex = what gallery by ID
    
//    get info about witch is the current visible image 
    var slideIndex = parseInt(getCurrentSlideIndex(galleryIndex));
//    amount of images in this gallery 
    var imagesLength = document.querySelectorAll("#" + galleryIndex + " .imgSlides").length;
    imagesLength = parseInt(imagesLength);

//    if backwards 
    if ( n == 'sub' ) {
        n = (slideIndex) - 1;
        n = parseInt(n);
        // make it loop
        if ( n < 0 ) {
            n = imagesLength - 1;
        }
//        if forwards
    } else if ( n == 'add' ) {
        n = (slideIndex) + 1;
        if ( n == imagesLength ) {
            n = 0;
        }
    }
    
//    The new image variable 
    var newDataCurrentImg = n;
    
//    Now - change the image! 
    changeImage(newDataCurrentImg, galleryIndex);
}

// Step 3 
function getCurrentSlideIndex(galleryIndex) {
    // get the "data-currentimg"-ID
    var galleryElm = document.querySelector('#' + galleryIndex);    
    curentImgID = galleryElm.dataset.currentimg;
    return curentImgID;
}

// Step 4
function changeImage(newDataCurrentImg, galleryIndex) {
//    the element of this gallery
    var currentGallery = document.querySelector("#" + galleryIndex);
    
    // change data-currentimg in Gallery
    changeDataCurrentImg(currentGallery, newDataCurrentImg);
    
    // change the image
    changeImageInGallery(newDataCurrentImg, currentGallery, galleryIndex);
}

// Step 5
function changeDataCurrentImg(currentGallery, newDataCurrentImg) {
    
    // get amount of images...
    var imagesLength = document.querySelectorAll("#" + galleryIndex + " .imgSlides").length;
    if ( newDataCurrentImg < 0 ) {
        // MINUS
        currentGallery.dataset.currentimg = (imagesLength) -1;
    } else if (  newDataCurrentImg >= imagesLength ) {
        // PLUS
        currentGallery.dataset.currentimg = 0;
    } else if ( newDataCurrentImg == -1  ) {
       currentGallery.dataset.currentimg = 0;  
    } else {
        currentGallery.dataset.currentimg = newDataCurrentImg;
    }
    return;
}

// Step 6
function changeImageInGallery(newDataCurrentImg, currentGallery, galleryIndex) {
    
    // Select all the images in this gallery
    var images = document.querySelectorAll("#" + galleryIndex + " .imgSlides");
    
    // add class "is-visible" on the newDataCurrentImg
    for ( var i = 0; i < images.length; i++ ) {
        var image = images[i];
        var imageId = parseInt(image.dataset.imgIndex);
        
//        make all the images invisible 
        image.classList.remove('is-visible');
        
        if ( image.dataset.imgIndex == newDataCurrentImg ) {
//            view the image correct image! 
            image.classList.add('is-visible');
        } 
    }
}       

// Get the currect image gallery index
function getGalleryId(i) {
    gallery = i.parentElement;
    galleryIndex = gallery.dataset.galleryindex;
    return galleryIndex;
}


/* ---------------------------------------------

        IMAGE GALLERY in Lightbox 

--------------------------------------------- */
// Only one imagegalleryLightbox per PAGE
//
//var lightboxGalleryImgs = document.querySelectorAll('.image-gallery-lightbox .image');
//
//if ( lightboxGalleryImgs ) {
//    for ( var i = 0; i < lightboxGalleryImgs.length; i++ ){
//        lightboxGalleryImgs[i].addEventListener("click", function() {
//            var startImageId = getClickedImage(this);
//            openLightboxGallery(startImageId);
//        });
//    }
//}
//function getClickedImage(clickedImage) {
//    var classes = clickedImage.classList;
//    for ( var i = 0; i < classes.length; i++ ) {
//        var imgClass = classes[i];
//        if ( imgClass.includes('slideLightbox') ) {
//            var imgId = imgClass.replace('slideLightbox','');
//            return imgId; 
//        }
//    }
//}
//function openLightboxGallery(startImg) {
//    console.log(startImg);
//}



























