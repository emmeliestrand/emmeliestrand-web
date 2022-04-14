ifMyPage();
function ifMyPage() {
    // Check if it's a mypage-page
    var myPagePage = document.querySelector('.t-mypage-page');
    if ( myPagePage ) {
        setHeightPageMain();
    }
}
function setHeightPageMain() {
    var pageMain = document.querySelector('.page-main');
    var pageAside = document.querySelector('.page-aside .sub-menu ul');
    
    // height for main content
    var mainHeight = pageMain.offsetHeight;
    
    // height for aside content 
    var asideHeight = pageAside.offsetHeight;
    
    
    // IF ASIDE is bigger then MAIN ...
    if ( asideHeight > mainHeight ) {
        pageMain.style.minHeight = (asideHeight + 60) + "px";
    } else {
        // var it be, var it be...
    }
}

/* -------------------------------------------------
    CHECK IF USER HAS EMAIL OR NOT...
------------------------------------------------- */
var myPageFormNotifierSelect = document.querySelectorAll('.report-form-mypage .has-no-email');
if ( myPageFormNotifierSelect ) {
    for (var i = 0; i < myPageFormNotifierSelect.length; i++) {
        // check if this is selected
        var option = myPageFormNotifierSelect[i];
        if ( option.selected == true ) {
            // add a class to the FormData
            // to make the form disabled
            var form = document.querySelector('.report-form-mypage');
            form.classList.add('disable-form');
            disableForm(form);
        } else {
            
            // do nothing...
        }
        
    }
}
function disableForm(form) {
    if ( form.classList.contains('disable-form') ) {
        // find the submit button
        var submit = document.querySelector('#report-form-mypage-submit-1');
        submit.classList.add('disabled');
        submit.disabled = true;
        
        // add a error link to add a email
        var errorDiv = document.querySelector('.general-error-msg');
        errorDiv.classList.add('show-message');
        var link = document.createElement('a');
        link.innerHTML = "Gå till mina inställningar och lägg till en e-postadress för att skicka felanmälan.";
        link.href = "../mina-uppgifter";
        errorDiv.appendChild(link);
        
        // add a validationerror to the notifiter select
        var notifier = document.querySelector('#form-template-nofifier');
        notifier.classList.add('validationerror');
        
        var message = document.createElement('div');
        message.innerHTML = 'Gå till "Mina uppgifter" och lägg till en e-postadress. Du når det genom att välja Mina uppgifter i menyn och klicka på "Ändra uppgifter"';
        message.classList.add('general-error-msg');
        message.classList.add('show-message');
        message.classList.add('smaller')
        var parent = notifier.parentElement.parentElement;
        parent.appendChild(message);
    
    }
}



