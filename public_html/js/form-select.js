/* -------------------------------------------------
    GENERAL SELECT
    PRINT OUT OPTIONS
------------------------------------------------- */
function sortOptions(choosenOptionaPartOne, allOptions) {
    var relatedOptions = [];
    if ( allOptions ) {
        for ( var i = 0; i < allOptions.length; i++ ) {
            var element = allOptions[i];

            if ( element.classList.contains("is-visible") ) {
                element.classList.remove("is-visible");
            }
            var value = allOptions[i].value;
            if ( value == choosenOptionaPartOne ) {
                relatedOptions.push(element);
            }
        }
    }
    return relatedOptions;
}
/* -------------------------------------------------
    GET CHILDREN
------------------------------------------------- */
function getChildren(parents) {
    if ( parents !== null ) {
        for ( var i = 0; i < parents.length; i++ ) {
            var child = parents[i].children;
            return child;
        }
    }
}
/* --------------------------------------------------------------------------------------------------
    SET FILTER SELECTS
-------------------------------------------------------------------------------------------------- */
function setFilterSelectVariables() {

    var selectPartOne = document.querySelectorAll(".select-part-one");
    var selectPartTwo = document.querySelectorAll(".select-part-two");
    
    for ( var i = 0; i < selectPartOne.length; i++ ) {
//    selectPartOne.forEach( function(select) {
        var select = selectPartOne[i];
        select.addEventListener("change", function() {
//            makeSelectTwoDeafult(selectPartTwo);
            if (this.getAttribute('id') == "change_area"){
                fastigheter_change_area(this);
            }
            var choosenOptionaPartOne = this.value;
            // only do functions for partTWO if there is a part two..
            if ( selectPartTwo.length !== 0 ) {
                changeOptionPartTwo(selectPartTwo, choosenOptionaPartOne);
                checkIfThereIsNoValue(selectPartTwo, choosenOptionaPartOne);
            } else {
                return;
            }
        });            
    }
}
setFilterSelectVariables();

setSearchClick();
function setSearchClick() {
    var btnsearch = document.querySelector("#btnsearch");
    var fastighetersearch = document.querySelector("#fastighetersearch");

    if(btnsearch) {
        btnsearch.addEventListener("click", function() {
            var option = {};
            option['option-area'] = "";
            option['option-adress'] = "";
            option['option-search'] = fastighetersearch.value;
            if(fastighetersearch.value.length>=3){
                fastigheter_do_ajax(option, false);
            }else{
                alert('För få tecken i sökningen. Ange minst 3 bokstäver.');
            }
        });
    }

}

//function makeSelectTwoDeafult(selectPartTwo) {
//    selectPartTwo[0].selectedOptions.classList.remove('is-visible');
//}
/* --------------------------------------------------------------------------------------------------
    Prevent click on SELECT-PART-TWO when SELECT-PART-ONE is not selected
    AND
    IF SELECT PART ONE IS CLICKED - MAKE SELECT PART TWO TO DEAFULT
-------------------------------------------------------------------------------------------------- */
setSelectClick();
function setSelectClick() {
    var selectPartOne = document.querySelector(".select-part-one");
    var selectPartTwo = document.querySelector(".select-part-two");

    if ( selectPartOne ) {
        selectPartOne.addEventListener("change", function() {
            // make the select two default
            setPreventClick();
        });
    }
    if ( selectPartOne && selectPartTwo ) {
        selectPartOne.addEventListener("click", function() {
           makeSelectPartTwoDoDefault(selectPartTwo); 
        });
    }
    
}
setPreventClick();
function setPreventClick() {
    var selectPartTwo = document.querySelector(".select-part-two");
    var selectPartOne = document.querySelector(".select-part-one");

    if ( selectPartTwo ) {
        // check if select part one have a selected

        if ( selectPartOne.options.selectedIndex == 0 ) {
        //  if there is no value = 0
        //  prevent click in select two
        //  change value to zero  
            selectPartTwo.parentElement.classList.add('prevent-click-area');
            selectPartTwo.classList.add('prevent-click');
            selectPartTwo.disabled = true;
        } else {
            selectPartTwo.parentElement.classList.remove('prevent-click-area');
            selectPartTwo.classList.remove('prevent-click');
            selectPartTwo.disabled = false;
        }
    }
}
function makeSelectPartTwoDoDefault(selectPartTwo) {
    selectPartTwo.options.selectedIndex = 0;
}

/* -------------------------------------------------
    SELECT IN FILTER
    ON CHANGE IN SELECT ONE
    CHANGE IN SELECT TWO
------------------------------------------------- */
function changeOptionPartTwo(selectPartTwo, choosenOptionaPartOne) {
    // sends in parent and get children
    var allOptions = getChildren(selectPartTwo);
    var relatedOptions = sortOptions(choosenOptionaPartOne, allOptions);
    makeRelatedOptionsVisible(relatedOptions);
}
function makeRelatedOptionsVisible(relatedOptions) {
    for ( var i = 0; i < relatedOptions.length; i++ ) {
        relatedOptions[i].classList.add("is-visible");
    }
}
/* -------------------------------------------------
    CLEAR SELECT TWO IF
    SELECT ONE IS ALL OR NOT THE SAME
------------------------------------------------- */
function checkIfThereIsNoValue(selectPartTwo, choosenOptionaPartOne) {
    // if the value "all" is choosen in part one..
    // also - check if this is not the same
    // then clear the choosen address 
    // .. do the magic 
    if ( choosenOptionaPartOne == "all" ) {
        var allOptions = getChildren(selectPartTwo);
        for ( var i = 0; i < allOptions.length; i++ ) {
            // hide all the options in part two
            allOptions[i].classList.remove('is-visible');
            // make the first option visible
            allOptions[0].classList.add('is-visible');
            // select the first option
            allOptions[0].selected = 'selected';
        }
    }
}
/* --------------------------------------------------------------------------------------------------
    REPORT FORM
    SELECTORS
-------------------------------------------------------------------------------------------------- */
function setReportSelectVariables() {

    var selectPartOne = document.querySelectorAll(".report-form .select-part-one");
    var partTwo = document.querySelector(".report-form .part-two");
    var selectPartTwo = document.querySelector(".report-form .select-part-two");
    
    for (var i = 0; i < selectPartOne.length; i++) {
//    selectPartOne.forEach( function(select) {
        var select = selectPartOne[i];
        
        select.addEventListener("change", function() {
            var choosenOptionaPartOne = this.value;
            changeOptionPartTwo(selectPartTwo, choosenOptionaPartOne);
            checkIfTheValueIsSix(partTwo, selectPartTwo, choosenOptionaPartOne);
        });            
    }
}
setReportSelectVariables();
/* -------------------------------------------------
    SHOW SELECT PART TWO IF
    SELECT PART ONE IS SKADEDJUR // NR. 6
------------------------------------------------- */
function checkIfTheValueIsSix(partTwo, selectPartTwo, choosenOptionaPartOne) {
    // .. do the magic 
    if ( choosenOptionaPartOne == "6" ) {
        // show select part two
        partTwo.classList.add('is-visible');
        
        // Create attribute required and add it to the select
        var requiredAtr = document.createAttribute("required");
        requiredAtr.value = "required";
        selectPartTwo.setAttributeNode(requiredAtr);
        
        // make the select abled
        selectPartTwo.disabled = false;
    } else if ( choosenOptionaPartOne !== 6 && partTwo !== null ) {
        
        if ( partTwo.classList.contains('is-visible') ) {
            // hide slect part two
            partTwo.classList.remove('is-visible');
            selectPartTwo.removeAttribute("required");
            selectPartTwo.disabled = true;
        }

        // make the select two option value to "välj" = 0
        // first - get all the option children

    }
}




























