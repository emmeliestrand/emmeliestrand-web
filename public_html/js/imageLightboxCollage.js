// Bind single element manually
WAMediaBox.bind(document.querySelector(".single-image-collage"));

// Bind all child elements
WAMediaBox.bindAll(document.querySelector(".parent-collage"));

// Translate - set before any binding
WAMediaBox.lang = {
	prev: "Previous",
	next: "Next",
	close: "Close",
	openInNew: "Open in new window"
};