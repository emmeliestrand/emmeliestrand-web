/* -------------------------------------------------
    Animated illustaion
    Woop woop
------------------------------------------------- */


const sections = document.querySelectorAll('.footer-illustration');

window.onscroll = function() {
    // Don't run the rest of the code if every section is already visible
    var footerIllu = document.querySelector('.footer-illustration');
    if ( footerIllu ) {
        if ( document.querySelector('.footer-illustration').classList.contains('visible')) {
            return;
        }
        // Run this code for every section in sections
//        for (const section of sections) {
        for (var i = 0; i < sections.length; i++) {
            var section = sections[i];
            if ( section.getBoundingClientRect().top <= window.innerHeight * 0.9 && section.getBoundingClientRect().top > 0 ) {
                section.classList.add('visible');
                // reload GIF 
                section.children[0].src = section.children[0].src;
            }
        }
    }
};