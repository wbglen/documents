function openLegal(e) {
	var legal = document.getElementById("legal");
	legal.className = "open";
	e.preventDefault();
	e.stopPropagation();
}

function closeLegal(e) {
	var legal = document.getElementById("legal");
	legal.className = "close";
	e.preventDefault();
	e.stopPropagation();
}

var $ = function(idname){
	return document.getElementById(idname);
}

