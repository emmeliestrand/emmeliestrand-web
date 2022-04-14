let intervalID = window.setInterval(am_i_alive,5000);

function am_i_alive(){
    ajaxURL = STAD_SCRIPT_VARS.url+"?action=am_i_alive";

    var xhttp;
    xhttp=new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(xhttp.responseText>=-120){
                toggleModal();
            }
        }
    }
    xhttp.open("POST", ajaxURL, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

function reload(){
    location.reload();
}

function logout(){
    ajaxURL = STAD_SCRIPT_VARS.url+"?action=logout";

    var xhttp;
    xhttp=new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            reload();
        }
    }
    xhttp.open("POST", ajaxURL, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    
}

    function windowOnClick(event) {
        if (event.target === modal) {
            toggleModal();
        }
    }

    function toggleModal() {
            modal.classList.toggle('show-modal');
            clearInterval(intervalID);
    }

    const modal = document.querySelector('.modal');
    
    window.onload = function(e){
        const closeButton = document.querySelector('.close-button');

        closeButton.addEventListener('click', toggleModal);
        window.addEventListener('click', windowOnClick);
    };

    


    