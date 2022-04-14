// this set the variables when page is loading...
// global variables
var inputsFileElm = document.querySelector(".file-input");
if ( inputsFileElm ) {
    var input = inputsFileElm;
    var label = inputsFileElm.previousElementSibling;
}


var inputsTypeFile = document.querySelectorAll(".file-label");

// if this element exists...
if ( inputsTypeFile ) {
    for ( var i = 0; i < inputsTypeFile.length; i++ ) {
        inputsTypeFile[i].addEventListener("click", function(e) {
            e.preventDefault();
            // get the input of this selector, and make that click
            // this is just a fix for us to style the input file
            var inputFile = this.nextSibling.nextSibling;
            for ( var i = 0; i <= 0; i++ ){
                inputFile.click();
            }
        });
    }
}

// MAKE THIS NOT PRINT BERFORE VALIDATION IS CORRECT
function printAttachedFile(files) {
    // clear files from DOM
    var filesBox = document.querySelector('.attachedfiles');
    if ( filesBox ) {
        filesBox.innerHTML = "";
    }
    for ( var i = 0; i < files.length; i++ ) {
        var name = files[i].name;
        // create div for every filename
        var fileNameDiv = document.createElement('li');
        fileNameDiv.innerHTML = name;
        
        // append them in the DOM
        var filesBox = document.querySelector('.attachedfiles');
        filesBox.appendChild(fileNameDiv);
        
    }
    // clear "Ingen file vald"
    var noFileMsg = document.querySelector('.no-file-msg');
    noFileMsg.innerHTML = "";
    
    // create delete files btn
    createDeleteChoosenFiles(filesBox );
}
function createDeleteChoosenFiles(filesBox ) {
    var domButton = document.querySelector('.delete-files');
    
    if ( domButton.innerHTML != "" ) {
        // do not add a second text
    } else {
        var text = "Ta bort valda filer";
        var button = document.createElement('div');
        button.classList.add('delete-files-btn');
        button.innerHTML = text;
        var deleteDiv = document.querySelector('.delete-files');
        deleteDiv.append(button);
    }
}
var deleteBtn = document.querySelector('.delete-files');
if ( deleteBtn ) {

    deleteBtn.addEventListener("click", function() {
        var input = document.querySelector('.file-input');
        console.log(input.value);
        input.value = "";
        console.log(input.value);
        
        // Clear list
        var filesBox = document.querySelector('.attachedfiles');
        if ( filesBox ) {
            filesBox.innerHTML = "";
        }
        
        // Clear delete button
        deleteBtn.innerHTML = "";
        
        // Add "ingen fil vald"
        var noFileMsg = document.querySelector('.no-file-msg');
        noFileMsg.innerHTML = "Ingen fil vald";
        
    });
}

