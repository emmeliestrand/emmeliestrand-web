/* ---------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------- 

        CREATE / CHECK / GET COOKIE
        
   ---------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------- */

// check cookie
// step 2
function checkCookie() {
    var acceptedCookie = getCookie("acceptedCookie");
    
    // if user have accepted cookie...
    if ( acceptedCookie != "" ) {
        // no not show cookiebanner - like.. do NOTHING!
    } else {
        // if user have NOT accepted cookie...
        // show the cookiebanner to get the user to accept
        var body = document.querySelector('body');
        body.classList.add('show-cookiebanner');
    }
}

// get a cookie
// Step 3
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
// step 5
function hideCookieBanner( ){
    // hide cookieBanner
    var body = document.querySelector('body');
    body.classList.remove('show-cookiebanner');
}

// step 1 
function setCookieBanner() {
    var cookieBanner = document.querySelector('#cookie-banner');
    // if cookiebanner exists
    if ( cookieBanner ) {
        checkCookie();
    }
}
setCookieBanner();

// if Cookie Banner btn is clicked
function setCookieBannerBtn() {
    var cookieBannerBtn = document.querySelector('.cookie-accept-btn');
    if (cookieBannerBtn) {
        
        cookieBannerBtn.addEventListener('click', function(event) {
            
            event.preventDefault();
            hideCookieBanner();
            
            // change this parameters if nessasary
            var cName = 'acceptedCookie';
            var cValue = 'true';
            var exdays = 14;

            // if no cookie...
            // create a cookie
            setCookie(cName, cValue, exdays);
        })
    }
}
setCookieBannerBtn();

// SET / CREATE Cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();

    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}












