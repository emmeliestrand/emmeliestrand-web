var loadMoreFastigheter = document.querySelector("#fastigheter_load_more");

if (loadMoreFastigheter) {
    loadMoreFastigheter.addEventListener("click", function(e){
        e.preventDefault();
        var option = {};
        option['option-adress'] = "";
        option['option-area'] = document.getElementById("fastigheter_old_area").value;
        fastigheter_do_ajax(option, true);
    });
}



var changeAdressFastigheter = document.querySelector("#change_adress");
if ( changeAdressFastigheter ) {
//    changeAdressFastigheter.addEventListener("click", function(e){
    changeAdressFastigheter.addEventListener("change", function(e){
        document.getElementById("fastigheter_count").value = 0;
        var option = {};
        option['option-adress'] = this.options[this.selectedIndex].text;
        option['option-area'] = "";
        fastigheter_do_ajax(option, false);
    });
}

function fastigheter_change_area(select){
    var selectValue = select.value;
    if ( selectValue == "all" ) {
        resetFastighetsListning();
    }
	document.getElementById("fastigheter_count").value = 0;
	document.getElementById("fastigheter_old_area").value = select.options[select.selectedIndex].value;
	var option = {};
	option['option-area'] = select.options[select.selectedIndex].value;
	option['option-adress'] = "";
	fastigheter_do_ajax(option, false);
}

function fastigheter_do_ajax(option, append_data){
	var postData = new Array;
	postData.push(option);
	var to_push = {};
	to_push['count'] = document.getElementById("fastigheter_count").value;
    
	to_push['iterator'] = document.getElementById("fastigheter_iterator").value;
	postData.push(to_push);

	document.getElementById("fastigheter_count").value = parseInt(document.getElementById("fastigheter_count").value) + parseInt(document.getElementById("fastigheter_iterator").value);

	postData = JSON.stringify(postData);

    var xhttp;
    xhttp = new XMLHttpRequest();
    startSpinner();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            // Hide the "Ladda fler fastigheter"-button
            if ( xhttp.responseText ) {
                var temp = xhttp.responseText;
                //var count = (temp.match(/m-real-estat-block/g) || []).length;
                var items = temp.match(/data-count\=(.*)/g);
                var lastItem = items[items.length-1];
                var cleanup = lastItem.replace('data-count="','');
                cleanup = cleanup.replace('\">','');
                cleanup = cleanup.split("|");
                count = cleanup[1] - cleanup[0];

                toggleTheLoadMoreBtn(count);
            }
            
            
            var append = document.getElementById("fastigheter_append");
        	if(append_data == true){
        		append.insertAdjacentHTML('beforeend', xhttp.responseText);
        	}
        	else{
        		append.innerHTML = xhttp.responseText;
        	}
            
        }
    };
    xhttp.open("POST", STAD_SCRIPT_VARS_F['url']+"?action=get_fastigheter_html", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(postData);
}

function resetFastighetsListning() {
    document.getElementById("fastigheter_old_area").value = 'all';
    location.reload();
}
function toggleTheLoadMoreBtn(count){
    var button = document.querySelector(".o-real-estat .button");
    if ( count == 0 ) {
        button.classList.add('hide');
    } else {
        button.classList.remove('hide');
    }
    
}

function getElementsByClassName(node,classname) {
    if (node.getElementsByClassName) { // use native implementation if available
      return node.getElementsByClassName(classname);
    } else {
      return (function getElementsByClass(searchClass,node) {
          if ( node == null )
            node = document;
          var classElements = [],
              els = node.getElementsByTagName("*"),
              elsLen = els.length,
              pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)"), i, j;
  
          for (i = 0, j = 0; i < elsLen; i++) {
            if ( pattern.test(els[i].className) ) {
                classElements[j] = els[i];
                j++;
            }
          }
          return classElements;
      })(classname, node);
    }
  }