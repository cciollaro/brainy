var gridster,
	codeEditor,
	inputEditor,
	outputEditor,
	scripts = [],
	currentScript,
	currentSave,
	currentInterpreter;

$(function() {
	$('#execute').on("click", function() {
		currentInterpreter.execute();
		updateViews();
	});

	$('#step').on("click", function() {
		currentInterpreter.step()
		updateViews();
	});

	$('#reset').on("click", function() {
		currentInterpreter.resetState();
		updateViews();
	});

	$('#save').on("click", function() {
		
	});

	$("#newscript").on("click", function() {
		newScript();
	});

	gridster = $(".gridster ul").gridster({
		widget_base_dimensions: [100, 120],
		widget_margins: [5, 5],
		draggable: {
			handle: 'header'
		},
		helper: 'clone',
		resize: {
			enabled: true
		}
	}).data('gridster');

	codeEditor = CodeMirror.fromTextArea(document.getElementById("code"), {
		lineWrapping: true,
		mode: "text/x-csrc",
		vimMode: true,
		matchBrackets: true,
		showCursorWhenSelecting: true
	});

	codeEditor.on("change", function(obj, change) {
		currentInterpreter.script = obj.getValue();
		updateViews();
	});

	inputEditor = CodeMirror.fromTextArea(document.getElementById("input"), {
		lineWrapping: true,
		mode: "text/x-csrc",
		vimMode: true,
		matchBrackets: true,
		showCursorWhenSelecting: true
	});

	inputEditor.on("change", function(obj, change) {
		currentInterpreter.input = obj.getValue().split("\n");
	});

	outputEditor = CodeMirror.fromTextArea(document.getElementById("output"), {
		lineWrapping: true,
		mode: "text/x-csrc",
		vimMode: true,
		matchBrackets: true,
		showCursorWhenSelecting: true
	});

	loadState();
	if(scripts.length == 0) {
		firstScript();
	}
	updateViews();
	
});


function loadState() {
	
}

function saveState() {

}

function firstScript() {
	currentScript = new Script();
	scripts.push(currentScript);
	currentSave = currentScript.newSave();
	currentInterpreter = currentSave.newInterpreter();
	currentInterpreter.input = inputEditor.getValue();
	updateViews();
}

$(window).on("keydown", function(event) {
	if (!((event.which == 115 || event.which == 83) && event.ctrlKey) && !(event.which == 19)) return true;
	alert("Ctrl-S pressed");
	event.preventDefault();
	return false;
});

