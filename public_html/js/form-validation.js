//var globalValidation = [];
/* -------------------------------------------------
    STYLE VALIDATE INPUT
------------------------------------------------- */
/* Event listner to all input with class validate */
var inputElm = document.querySelectorAll("input.validate");
if ( inputElm ) {
    for ( var i = 0; i < inputElm.length; i++ ) {
        // when leaving input field
        inputElm[i].addEventListener("focusout", function() {
            validateStyleFormField(this);
        });
        // when entering input field
        inputElm[i].addEventListener("focus", function() {
            validationClearStyle(this);
            // and hide general error message
            var generalErrorMsg = document.querySelector('.general-error-msg');
            generalErrorMsg.classList.remove('show-message');
        });
    }
}
/* -------------------------------------------------
    VALIDATE TEXTAREA
------------------------------------------------- */
/* Event listner to all input with class validate */
var textareaElm = document.querySelectorAll("textarea.validate");
if ( textareaElm ) {
    for ( var i = 0; i < textareaElm.length; i++ ) {
        // when leaving input field
        textareaElm[i].addEventListener("focusout", function() {
            validateStyleFormField(this);
        });
        // when entering input field
        textareaElm[i].addEventListener("focus", function() {
            validationClearStyle(this);
            // and hide general error message
            var generalErrorMsg = document.querySelector('.general-error-msg');
            generalErrorMsg.classList.remove('show-message');
        });
    }
}
/* -------------------------------------------------
    VALIDATE SELECT
------------------------------------------------- */
/* Event listner to all select with class validate */
var selectElm = document.querySelectorAll("select.validate");
if ( selectElm ) {
    for ( var i = 0; i < selectElm.length; i++ ) {
        // when leaving input field
        selectElm[i].addEventListener("focusout", function() {
            validateStyleFormField(this);
        });
        // when entering input field
        selectElm[i].addEventListener("focus", function() {
            validationClearStyle(this);
            // and hide general error message
            var generalErrorMsg = document.querySelector('.general-error-msg');
            generalErrorMsg.classList.remove('show-message');
        });
    }
}
/* -------------------------------------------------
    SORTING input types << GENERAL >>
------------------------------------------------- */

function validateStyleFormField(field) {
    var fieldVal = field.value;
    var fieldType = field.type;
    var fieldNodeName = field.nodeName;
    if ( fieldType == "text" ) {
        validateText(field, fieldVal);
    } else if ( fieldType == "email" ) {
        validateEmail(field, fieldVal);
    }  else if ( fieldType == "number" ) {
        validatePhone(field, fieldVal);
    } else if ( fieldNodeName == "SELECT") {
        validateSelect(field, fieldVal);
    } else if ( fieldNodeName == "TEXTAREA") {
        validateText(field, fieldVal);
    }
}
/* -------------------------------------------------
    VALIDATION FOR DIFFRENT TYPES OF INPUT TYPES
------------------------------------------------- */

// VALIDATION for input type text
function validateText(field, fieldVal, fieldNodeName) {
    
    if ( fieldVal.length <= 2 ) {
        // add error class
        validationFalse(field);
    } else {
        validationTrue(field);
    }
    if (fieldNodeName == "TEXTAREA") {
        if ( fieldVal.length <= 2 || fieldVal.length > 2000 ) {
            // add error class
            validationFalse(field);
        } else {
            validationTrue(field);
        }
    }
}

// VALIDATION for input type email
function validateEmail(field, fieldVal) {
    var reEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ( reEmail.test(fieldVal) ) {
        validationTrue(field)
    } else {
        validationFalse(field);
    }
}

// VALIDATION for input type phone/number
function validatePhone(field, fieldVal) {

    var rePhone = /([(+]*[0-9]+[()+. -]*)/g;

    // if number get OK from regex
    if ( rePhone.test(fieldVal) ) {
        validationTrue(field);
    // if this field has class of optional..
    // this can be empty...
    } else if (field.classList.contains('optional')) {
        validationClearStyle(field);
    } else {
        validationFalse(field);
    }
}

// VALIDATION for select
function validateSelect(field, fieldVal) {
    if ( fieldVal == 0 ) {
        validationFalse(field);
    } else {
        validationTrue(field)
    }
}
// VALIDATION for file

function setFileUpload() {
    var fileUpload = document.querySelectorAll('.file-upload-validation');
    var resultFromValidation;
    
    if ( fileUpload ) {
        for ( var i = 0; i < fileUpload.length; i++ ) {
            fileUpload[i].onchange = (this, function() {
//                console.log(fileUpload[0].files.length);
                
                // check if files are choosen
                if ( fileUpload[0].files.length > 0 ) {
                    var allFiles = fileUpload[0].files;
                    
                    var restultFileType = validateFileType(fileUpload);
                
                    // check the amount of files
                    var resultFileAmount = validateFileAmount(fileUpload);
                    
                    // check the size of files
                    var resultatSizeAmount = validateFileSize(fileUpload);
//                    console.log(resultatSizeAmount);
                    
                    var isFilesValid = CheckIfFilesValid(restultFileType, resultFileAmount, resultatSizeAmount); 
                    //console.log("isFilesValid: " + isFilesValid);
                    
//                   var isFilesValid = CheckIfFilesValid(resultFileAmount, resultatSizeAmount); 
//                    console.log("isFilesValid: " + isFilesValid);
                    
                    if ( isFilesValid == true ) {
                        
                        // clear errormessage 
                        var fileMessage = document.querySelector('.file-error-msg');
                        if ( fileMessage )  {
                            fileMessage.innerHTML = "";
                        }
                        var infoText = document.querySelector('.info-icon .input-info-text');
                        infoText.classList.remove('show');
                        printAttachedFile(allFiles);
                    } else if ( isFilesValid == false ) {
                        // clear DOM
                        var filesBox = document.querySelector('.attachedfiles');
                        if ( filesBox ) {
                            filesBox.innerHTML = "";
                        }
                        printFileValidationError();
                    }
                }
            });

        }
    }                                  
}
setFileUpload();

function CheckIfFilesValid(restultFileType, resultFileAmount, resultatSizeAmount) {
    
    // if everything is correct, return true
    if ( restultFileType == true && resultFileAmount == true && resultatSizeAmount == true ) {
        return true;
    // if something is wrong, return false
    } else if ( restultFileType == false || resultFileAmount == false || resultatSizeAmount == false ) {
        return false;
    } 
}

function validateFileType(fileUpload) {
    var allFiles = fileUpload[0].files; 
    
    for( var i = 0; i < allFiles.length; i++ ) {
        var type = allFiles[i].type;
        // PDF 
        // Word
        // JPEG
        // PNG
        // check if the file is not any of these documents types
        if ( type == "application/pdf" || type == "image/jpeg" || type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || type =="image/png") {
            // this is correct - keep going
        } else {
           // this file is wrong,  STOP! 
            return false;
        }
    }
    return true;
}
function validateFileAmount(fileUpload) {
    // if the amount is more than five files.. return false
    if ( fileUpload[0].files.length > 5) {
        return false;
    // else.. return true...
    } else {
        return true;
    }
}
function validateFileSize(fileUpload) {
    var choosenFiles = fileUpload[0].files;
//    console.log(choosenFiles);

    for ( var i = 0; i < choosenFiles.length; i++ ) {
        // if file have max size 3Mb = 3145728 bite
        if ( choosenFiles[i].size < 3145728 ) {
            return true;
        } else {
            return false;
        }
    }
}
function getInputFilesFunc(input) {
    var fileArray = [ ];
        for ( var i = 0; i < input.length; i++ ) {
            var file = input.name;
            fileArray.push(file);
        }
    return fileArray;
}
function printFileValidationError() {
    var fileMessageBox = document.querySelector('.file-error-msg');
    fileMessageBox.innerHTML = "Något gick fel. Vänligen försök igen.";
    var infoText = document.querySelector('.info-icon .input-info-text');
    infoText.classList.add('show');
}
function validateFile(field, fieldVal) {
    // nothing...
}

/* -------------------------------------------------
    TRUE, FALSE OR CLEAR STYLES << GENERAL >>
------------------------------------------------- */
// clear the style
function validationClearStyle(field) {
    if (field.classList.contains('validationerror')) {
        field.classList.remove("validationerror");
    }
    if (field.classList.contains('validationcorrect')) {
        field.classList.remove("validationcorrect");
    }
}
// validation = true
function validationTrue(field) {
    
    var fieldName = field.name;
    field.classList.add("validationcorrect");
    field.classList.remove("validationerror");

}
// validation = false
function validationFalse(field) {
    
    var fieldName = field.name;
    field.classList.add("validationerror");
    field.classList.remove("validationcorrect");
    
}

/* -------------------------------------------------
    FORM REPORT SUBMIT VALIDATION
    AND
    FORM REPORT PUBLIC VALIDATION
    AND 
    FORM MYPAGE REPORT VALIDATION
------------------------------------------------- */
function setReportFormSubmit() {
    var reportForm = document.querySelector('#report-form');
    var reportSubmit = document.querySelector('#report-form #report-form-submit-1');
    if ( reportSubmit ) {
        reportSubmit.addEventListener('click', function(event){
            // html5 validation is checking the fields
            // if OK, call vli
            event.preventDefault();
            var formData = validateFormReport(reportForm); 
        });
    }
}
setReportFormSubmit();

function setReportFormPublicSubmit() {
    var reportForm = document.querySelector('#report-form-public');
    var reportSubmit = document.querySelector('#report-form-public #report-form-public-submit-1');
    if ( reportSubmit ) {
        reportSubmit.addEventListener('click', function(event){
            // html5 validation is checking the fields
            // if OK, call vli
            event.preventDefault();
            var formData = validateFormReport(reportForm); 
        });
    }
}

setReportFormPublicSubmit();

function setMypageReportFormSubmit() {
    var reportForm = document.querySelector('#report-form-mypage');
    var reportSubmit = document.querySelector('#report-form-mypage #report-form-mypage-submit-1');
    if ( reportSubmit ) {
        reportSubmit.addEventListener('click', function(event){
            // html5 validation is checking the fields
            // if OK, call vli
            event.preventDefault();
            var formData = validateFormReport(reportForm); 
        });
    }
}
setMypageReportFormSubmit();

function validateFormReport(form) {
    // find every element that is required
    var fields = document.querySelectorAll('[required]');
    // create an array for the form data
    var formDatas = [];
    // for every field in the form...
    // check wha type of element it is
    // and validate it
    for (var i = 0; i < fields.length; i++ ) {
        var field = fields[i];
        var fieldVal = field.value;
        var fieldType = field.type;
        var fieldNodeName = field.nodeName;

        
        if ( fieldType == "text" ) {
            validateText(field, fieldVal, fieldNodeName);
        } else if ( fieldType == "email" ) {
            validateEmail(field, fieldVal);
        }  else if ( fieldType == "number" ) {
            validatePhone(field, fieldVal);
        } else if ( fieldNodeName == "SELECT") {
            validateSelect(field, fieldVal);
        } else if ( fieldNodeName == "TEXTAREA") {
            validateText(field, fieldVal, fieldNodeName);
        } else if ( fieldType == "file" ) {
            validateFile(field, fieldVal);
        }
        formDatas.push(field);
    }
    optionalDatas = [];
    var optionalFields = document.querySelectorAll('.optional');

    for ( var i = 0; i < optionalFields.length; i++ ) {
        var field = optionalFields[i];
        var fieldName = optionalFields[i].name;
        var fieldValue = optionalFields[i].value;
        
        // only take the fields that is filled in
        if ( fieldValue !== "" ) {
            optionalDatas.push(field);
        }
        // if the phone is filled in, also push in the country code...
        if ( fieldName == 'phone-contact-person-2' && fieldValue !== "" ) {
            var countryCode2 = document.querySelector('#form-report-country-code-2');
            optionalDatas.push(countryCode2);
        }
    }
    
    var validFormDatas = [];
    
    for ( var i = 0; i < formDatas.length; i++ ) {
        // check if every element has .validationcorrect
        var formData = formDatas[i];
        if ( formData.classList.contains("validationcorrect") ) {
            validFormDatas.push('true');
        }
    }
    if ( formDatas.length == validFormDatas.length ) {
        // now all the fields is valid
        // only to get the attached files left...
        var filesName = getAttachedFiles();
        // get all the values in the form and print them out in a modal...
        printConfirm(formDatas, filesName, optionalDatas);
        
        // delete error message if it exists
        var msgElm = document.querySelector('.formnotvalidmessage');
        if ( msgElm ) {
            document.querySelector('.bottom-section').removeChild(msgElm);
        }
    } else {
        // print out error message that the form isnt correct
        var generalErrorMsg = document.querySelector('.general-error-msg');
        generalErrorMsg.classList.add('show-message');
        generalErrorMsg.innerHTML = "Det saknas information i ett eller flera fält. Vänligen fyll i dessa och försök igen. De fälten som inte stämmer är markerade i rött.";
    }
}
function getAttachedFiles() {
    var filesElm = document.querySelectorAll('.attachedfiles li');
    if ( filesElm.length >= 1  ) {
        var filesName = [];
        for ( var i = 0; i < filesElm.length; i++ ) {
            var fileName = "- " + filesElm[i].innerHTML;
            filesName.push(fileName);
        }
        return filesName;
    }
}

/* -------------------------------------------------
    FORM REPORT MODAL PRINTING
------------------------------------------------- */
function printConfirm(formDatas, filesName, optionalDatas) {
    
    for ( var i = 0; i < formDatas.length; i++ ) {

        var name = formDatas[i].name;
        var value = formDatas[i].value;
        
        // Print out the notifier
        if ( name == 'notifier' ) {
            var notiferBox = document.querySelector('.notifier-confirm-printout p');
            if ( notiferBox ) {
                notiferBox.innerHTML = value;
            }
            
        } else if ( name == 'email' ) {
        // Print out the email
            var emailBox = document.querySelector('.email-confirm-printout p');
            if( emailBox ) {
                emailBox.innerHTML = value;
            }
        
        }  else if ( name == 'country-code' ) {
            var countryPhoneBox = document.querySelector('.phone-confirm-printout .country-code-box');
            if ( countryPhoneBox ) {
                countryPhoneBox.innerHTML = value;
            }
    
        }  else if ( name == 'phone' ) {
            var phoneBox = document.querySelector('.phone-confirm-printout .phone-box');
            if ( phoneBox ) {
                phoneBox.innerHTML = value;
            }
            
        }   else if ( name == 'subject-one' ) {
            // convert number to text
            var text = subject1NumberConverter(value);
            var subjectBox = document.querySelector('.subject-confirm-printout p');
            if ( subjectBox ) {
                subjectBox.innerHTML = text;
            }
            
        }  else if ( name == 'subject-two' ) {
            // convert number to text
            var text = subject2NumberConverter(value);
            var subjectBox = document.querySelector('.subject-confirm-printout p');
            var subjectBox2 = document.createElement('p');
            
             if ( subjectBox2 ) {
                subjectBox2.innerHTML = "Typ av skadedjur: " + text;
                subjectBox.appendChild(subjectBox2);
             }
             
        } else if ( name == 'address' ) {

            var addressBox = document.querySelector('.address-confirm-printout p');
            if ( addressBox ) {
                addressBox.innerHTML = value;
            }
            
        }   else if ( name == 'message' ) {
            var messageBox = document.querySelector('.message-confirm-printout p');
            if ( messageBox ) {
                messageBox.innerHTML = value;
            }
            
        }  else if ( name == 'notifier-select' ) {
            var notifierSelect = document.querySelector('.notifier-select-confirm-printout p');
            
            if ( notifierSelect ) {
                var options = formDatas[i].children;
                for ( var j = 0; j < options.length;  j++ ) {
                    // get the name
                    if ( options[j].value == value ) {
                        valueName = options[j].innerHTML;
                        notifierSelect.innerHTML = valueName;
                    }
                }
            }
        }
    }
    // If there is any files attached...
    if ( filesName ) {

        // box for the attached files
        var filesBox = document.querySelector('.files-confirm-printout');
        // empty element before creating new elements
        if ( filesBox ) {
            filesBox.innerHTML = "";
        }
        
        // create h3
        // append it to the .files-confirm-printout
        var filesH3 = document.createElement('h3');
        filesH3.innerHTML = "Bifogade dokument";
        filesBox.appendChild(filesH3);
        
        // create ul for the files
        var filesList = document.createElement('ul');
        filesBox.appendChild(filesList);

        for ( var i = 0; i < filesName.length; i++ ) {
            // create a li for every list-item
            var fileListItem = document.createElement('li');
            fileListItem.innerHTML = filesName[i];
            filesList.appendChild(fileListItem);
        }
    } else if ( filesName == undefined ) {
        var filesBox = document.querySelector('.files-confirm-printout');
        // empty element before creating new elements
        if ( filesBox ) {
            filesBox.innerHTML = "";
        }
    }
    
    // if there is any optional data filled in...
    if ( optionalDatas.length >= 1 ) {
        
        for ( var i = 0; i < optionalDatas.length; i++ ) { 
            
            var name = optionalDatas[i].name;
            var value = optionalDatas[i].value;
            
            // Print out the notifier
            if ( name == 'contact-person-2' ) {
                var notifer2Box = document.querySelector('.notifier-2-confirm-printout');
                // clear element if user have updated info, not create dublicates
                if ( notifer2Box ) {
                    notifer2Box.innerHTML = "";
                }
                
                // add a header
                var headline = document.createElement('h3');
                headline.innerHTML = "Annan kontaktperson: ";
                notifer2Box.appendChild(headline);
                
                // add the text
                var text = document.createElement('p');
                text.innerHTML = value
                notifer2Box.appendChild(text);

            } else if ( name == 'email-contact-person-2' ) {
                // Print out the email
                var email2Box = document.querySelector('.email-2-confirm-printout');
                // clear element if user have updated info, not create dublicates
                if ( email2Box ) {
                    email2Box.innerHTML = "";
                }
                
                 // add a header
                var headline = document.createElement('h3');
                headline.innerHTML = "Annan E-postadress: ";
                email2Box.appendChild(headline);
                
                // add the text
                var text = document.createElement('p');
                text.innerHTML = value
                email2Box.appendChild(text);

            } else if ( name == 'phone-contact-person-2' ) {
                 // Print out the phone
                var phone2Box = document.querySelector('.phone-2-confirm-printout');
                // clear element if user have updated info, not create dublicates
                if ( phone2Box ) {
                    phone2Box.innerHTML = "";
                }
                
                 // add a header
                var headline = document.createElement('h3');
                headline.innerHTML = "Annat telefonnummer: ";
                phone2Box.appendChild(headline);
                
                // add the text phonenumber
                var text = document.createElement('p');
                text.innerHTML = '+46' + value
                phone2Box.appendChild(text);
            }
        }
    } else if ( optionalDatas.length == 0 ) {
        // empty the elements IF no optional datas is not filled in, 
        // AND if the elements exists on the page
        var notifer2Box = document.querySelector('.notifier-2-confirm-printout');
        if ( notifer2Box ) {
            notifer2Box.innerHTML = "";
        }
        var email2Box = document.querySelector('.email-2-confirm-printout');
        if ( email2Box ) {
            email2Box.innerHTML = "";
        }
        var phone2Box = document.querySelector('.phone-2-confirm-printout');
        if ( phone2Box ) {
            phone2Box.innerHTML = "";
        }
    }

//    call to open the modal, if this is OK
    var step = "modal-step1";
    openModal(step, formDatas);
}

/* -------------------------------------------------
    FORM REPORT SELECTOR
    TRANSLATE NUMBERS TO SUBJECTS
------------------------------------------------- */

function subject1NumberConverter(number) {
    var text;
    
    // HARD CODED
    // CHANGE this is something in the FORM REPORT is changed
    
    if ( number == "1" ) {
        text = "Av- och ombokning";
    } else if ( number == "2") {
        text = "Felanmälan";
    } else if ( number == "3" ) {
        text = "Hyres- och betalningsfrågor";
    } else if ( number == "4" ) { 
        text = "Service- och underhållsfrågor";
    } else if ( number == "5" ) {
        text = "Synpunkter";
    } else if ( number == "6" ) {
        text = "Skadedjur";
    } else if ( number == "18" ) {
        text = "Uthyrningsfrågor";
    } else if ( number == "19" ) {
        text = "Synpunkter";
    } else if ( number == "20" ) {
        text = "Felanmälan allmänt utrymme";
    } else if ( number == "21" ) {
        text = "Övrigt";
    } else {
        text = "Övrigt";
    }
    
    return text;

}

function subject2NumberConverter(number) {
    var text;
    
    // CHANGE this is something in the FORM REPORT is changed
    
    if ( number == "6" ) {
        text = "Fluga";
    } else if ( number == "7") {
        text = "Fågel";
    } else if ( number == "8" ) {
        text = "Geting";
    } else if ( number == "9" ) { 
        text = "Kackerlacka";
    } else if ( number == "10" ) {
        text = "Mal";
    } else if ( number == "11" ) {
        text = "Myra";
    } else if ( number == "12") {
        text = "Råtta";
    } else if ( number == "13" ) {
        text = "Silverfisk";
    } else if ( number == "14" ) { 
        text = "Spindel";
    } else if ( number == "15" ) {
        text = "Vägglus";
    } else if ( number == "16" ) {
        text = "Änger";
    } else if ( number == "17" ) {
        text = "Övrigt";
    } else {
        text = "Övrigt";
    }
    
    return text;

}

/* -------------------------------------------------
    FORM REPORT MODAL MOVING AND STEPS
------------------------------------------------- */
function openModal(step) {
    var body = document.querySelector('body');
    body.classList.add('modal-is-open');
    body.classList.add(step);
    
    var modalContainer = document.querySelector('.modal-container');

    
    // to make the modal scrollable with arrows
    modalContainer.tabIndex = 6;
    modalContainer.focus();
    modalContainer.scrollTop = 0;

}


function setModalButtons(body) {
    body = document.querySelector('body');
    
    // back btn
    var backBtn = document.querySelector('.report-form-modal .back');
    if ( backBtn ) {
        backBtn.addEventListener('click', function(event) {
            // close modal 
            body.classList.remove('modal-is-open');
        });
    }
    
    // to the thank you page OR error page
    var sendForm = document.querySelector('.report-form-modal .thank-you-page');
    if ( sendForm ) {
        sendForm.addEventListener('click', function(event) {
            // close modal 
            var formData = document.querySelector('#report-form');
            if (formData) {
                // LINUS
                sendFormWithAjax(formData);
            }
            var privatFormData = document.querySelector('form#report-form-mypage');
            if ( privatFormData ) {
                // Emmelie
                sendFormWithAjax(privatFormData);
            }
            
            // Change the step in the modal
            body.classList.add('modal-step2');
            step = "modal-step2";
            openModal(step);

            // LINUS
            ajaxSuccess();
            // or ajaxNoSuccess();
        });
    }
    
    // quit modal
    var quitBtns = document.querySelectorAll('.report-form-modal .quit');
    if ( quitBtns ) {
        for ( var i = 0; i < quitBtns.length; i++ ) {
            quitBtn = quitBtns[i];
            quitBtn.addEventListener('click', function(event) {
                // close modal 
                body.classList.remove('modal-is-open');
                body.classList.remove('modal-step1');
                body.classList.remove('modal-step2');
                
                // check the ajaxMsg 
                // reset form
                var msgHeadline = document.querySelector('.modal-content.step2 .msg-headline');
                    
                if ( msgHeadline.innerHTML == "Tack för din anmälan" ) {
                    // clear the form...
                    document.querySelector(".report-form").reset();
                    
                    // clear choosen files
                    document.querySelector(".file-input").value = "";
                    
                } else if ( msgHeadline.innerHTML == "Tekniskt fel: " ) {
                    // dont clear the form...
                    
                }

            });
        }
    }
}
setModalButtons();
function clearForm() {
     location.reload();
     document.getElementById("report-form").reset();
}

/* -------------------------------------------------
    LOADER / SPINNER Modal 
    WIll be called when ajax is starting loading 
    AND finishing loading
------------------------------------------------- */

// LINUS
// call this function to start Spinner/ Loader in modal
function startSpinner() {
    // add class to loader-container
    var body = document.querySelector('body');
    body.classList.add('start-spinner');
}
function stopSpinner() {
    // add class to loader-container
    var body = document.querySelector('body');
    body.classList.remove('start-spinner');
}

function ajaxSuccess() {

    // Text for the Headline
    var msgHeadline = document.querySelector('.modal-content.step2 .msg-headline');
    msgHeadline.innerHTML = "Tack för din anmälan";
    
    // Text for the intro / ingress
    var msgIngress = document.querySelector('.modal-content.step2 .msg-ingress');
    msgIngress.innerHTML = "Vi har tagit emot din anmälan och återkommer inom kort. Vi har även skickat ut ett ärendenummer till angiven e-postadress.";
    
    // Text for the bodytext
    var msgBody = document.querySelector('.modal-content.step2 .msg-body');
    msgBody.innerHTML = "Din åsikt betyder mycket för oss och vi uppskattar att du aktivt engagerar dig i din lokal eller boende. Vi arbetar på ditt ärende och återkommer till dig inom en arbetsdag.";
    
}
function ajaxNoSuccess() {
    
     // Text for the Headline
    var msgHeadline = document.querySelector('.modal-content.step2 .msg-headline');
    msgHeadline.innerHTML = "Tekniskt fel: ";
    
    // Text for the intro / ingress
    var msgIngress = document.querySelector('.modal-content.step2 .msg-ingress');
    msgIngress.innerHTML = "Ditt meddelande kom inte fram";
    
    // Text for the bodytext
    var msgBody = document.querySelector('.modal-content.step2 .msg-body');
    msgBody.innerHTML = "Vi kunde inte ta emot ditt meddelande och ber dig att försöka igen. Gå tillbaka till formuläret via tillbaka-knappen och skicka in formuläret igen. Skulle det fortfarande inte fungera ber vi dig att ringa oss direkt på 08-345 45 45. Din åsikt betyder mycket för oss och vi uppskattar att du aktivt engagerar dig i din lokal eller boende.";
    
}

function restOfAjaxCall(input){
    var ajaxURL = "";

    if ( document.getElementById("public_nonce") != null ){
        ajaxURL = STAD_SCRIPT_VARS.url+"?action=felanmalan_public";
    } else {
        ajaxURL = STAD_SCRIPT_VARS.url+"?action=felanmalan_private";
    }
    var postData = JSON.stringify(input);


    var xhttp;
    xhttp=new XMLHttpRequest();
    startSpinner();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            // Step 1 - Parse the response
            try{
                // Step 1.1 Doing the parse
                var response = JSON.parse(xhttp.responseText);
            }
            catch(e){
                // Step 1.2 Something went wrong. The server is probably
                // doing some wierd stuff... Do ERROR stuff
                stopSpinner();
                ajaxNoSuccess("Inget svar från servern")
                // console.log("Could not parse json from server");
                return;
            }

            // Step 2 - Check if there was an error
            if(response.success == 0 || response.success == false){

                // Step 2.1 There was an error.
                // Do error stuff
                stopSpinner();
                ajaxNoSuccess(response.error_message);
                // console.log(response.error_message);
                return;
            }
            // Step 3 - Check if was an success!
            else if(response.success == 1 || response.success == true){
                // Step 3.1 SUCCESS
                // Do SUCCESS stuff
                stopSpinner();
                ajaxSuccess();
            }
            // Step 4 - now this is a wierd one. Not success or fail.
            else{

                // Step 4.1 Something has probably occured on the server.
                // If we are here, there is an error (but we have no error message)
                // Do some ERROR stuff
                stopSpinner();
                ajaxNoSuccess("Inget svar från servern")
                // console.log(response);
                return;
            }
            
        }
    };
    xhttp.open("POST", ajaxURL, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(postData);
}

function getBase64(files,input,filesArray,count){
    var reader = new FileReader();
    reader.readAsDataURL(files[count]);
    count
    reader.onload = function(){
        
        if(files.length>0){
        var file = {
            'lastModified'      : files[count].lastModified,
            'lastModifiedDate'  : files[count].lastModifiedDate,
            'name'              : files[count].name,
            'size'              : files[count].size,
            'type'              : files[count].type,
            'data'              : reader.result
        };
        filesArray.push(file);
        
            if(count<files.length-1){
                count = count+1;
                getBase64(files,input,filesArray,count);
            }else{
                var fileObj = {
                    files: filesArray
                }
                input.push(fileObj);
                restOfAjaxCall(input);
            }
        }

        reader.onerror = function(error) {
            // console.log('Error: ', error);
        }
    }
}

function sendFormWithAjax(form){
    var input = new Array;
    if (!form || form.nodeName !== "FORM") {
        return;
    }
    var i, j = [];
    for (i = form.elements.length - 1; i >= 0; i = i - 1) {
        if (form.elements[i].name === "") {
            continue;
        }
        switch (form.elements[i].nodeName) {
        case 'INPUT':
            switch (form.elements[i].type) {
            case 'text':
            case 'hidden':
            case 'password':
            case 'button':
            case 'number':
            case 'email':
            case 'reset':
            case 'submit':
                var valueToPush = { };
                    valueToPush[form.elements[i].name] = encodeURIComponent(form.elements[i].value);
                    input.push(valueToPush);
                break;
            case 'checkbox':
            case 'radio':
                if (form.elements[i].checked) {
                    var valueToPush = { };
                    valueToPush[form.elements[i].name] = encodeURIComponent(form.elements[i].value);
                    input.push(valueToPush);
                }
                break;
            }
            break;
        case 'file':
            break;
        case 'TEXTAREA':
            var valueToPush = { };
            valueToPush[form.elements[i].name] = encodeURIComponent(form.elements[i].value);
            input.push(valueToPush);
            break;
        case 'SELECT':
            switch (form.elements[i].type) {
            case 'select-one':
                var valueToPush = { };
                valueToPush[form.elements[i].name] = encodeURIComponent(form.elements[i].value);
                input.push(valueToPush);
                break;
            case 'select-multiple':
                for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                    if (form.elements[i].options[j].selected) {
                        var valueToPush = { };
                        valueToPush[form.elements[i].name] = encodeURIComponent(form.elements[i].value);
                        input.push(valueToPush);
                    }
                }
                break;
            }
            break;
        case 'BUTTON':
            switch (form.elements[i].type) {
            case 'reset':
            case 'submit':
            case 'button':
                var valueToPush = { };
                valueToPush[form.elements[i].name] = encodeURIComponent(form.elements[i].value);
                input.push(valueToPush);
                break;
            }
            break;
        }
    }
    
    // Special case for files:
    // OBS!!! JAG FÅR INTE DETTA ATT FUNKA! // Linus
    var files = document.getElementById('form-template-file').files;
    var filesArray = [];
    if( files.length > 0 ){
        getBase64(files,input,filesArray,0);
    }else{
        restOfAjaxCall(input);
    }
    // var filesArray = [];
    // // for(var f=0;f<files.length;f++){
    //     if(files.length>0){
    //     var file = {
    //         'lastModified'      : files[0].lastModified,
    //         'lastModifiedDate'  : files[0].lastModifiedDate,
    //         'name'              : files[0].name,
    //         'size'              : files[0].size,
    //         'type'              : files[0].type,
    //         'data'              : getBase64(files[0])
    //     };
    //     filesArray.push(file);
    // //}
    // //valueToPush['files'] = files;
    // input.push(filesArray);
    // }

    

}
