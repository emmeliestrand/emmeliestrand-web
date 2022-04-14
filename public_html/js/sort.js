function setSortBtns() {
    var btn = document.querySelectorAll('.sort .icon');
    for ( var i = 0; i < btn.length; i++ ) {
        btn[i].addEventListener("click", function(event) {
            this.classList.toggle('is-active');
            var siblings = getSiblings(this);
            for (var i = 0; i < siblings.length; i++ ) {
                siblings[i].classList.toggle('is-active');
            }
        });
    }
}
setSortBtns();

function getSiblings(elem) {
    var siblings = [];
	var sibling = elem.parentNode.firstChild;
	for (; sibling; sibling = sibling.nextSibling) {
		if (sibling.nodeType !== 1 || sibling === elem) continue;
		siblings.push(sibling);
	}
	return siblings;
}