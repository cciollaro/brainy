function updateViews() {
	updateOutputView();
	updateDataView();
	updateCodeView();
	updateScriptsView();
}

function updateScriptsView() {
	for(var i = 0; i < scripts.length; i++) {
		$("#scripts").html(scripts[i].toHTML());
	}
}

function updateDataView() {
	var result = "";
	for(var i = 0; i < currentInterpreter.data.length; i++) {
		if(currentInterpreter.data_ptr == i) {
			result += "<div class=\"datablock activedatablock\">" + currentInterpreter.data[i] + "</div>";
		} else {
			result += "<div class=\"datablock\">" + currentInterpreter.data[i] + "</div>";
		}
	}
	$("#datacontent").html(result);
}

function updateOutputView() {
	var result = "";
	for(var i = 0; i < currentInterpreter.output.length; i++) {
		result += currentInterpreter.output[i];
	}
	outputEditor.setValue(result);
}

function updateCodeView() {

}
