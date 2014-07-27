var Save = function(brainyInterpreter, currentlyStepping) {
	this.name = "save 0";
	this.interpreter = brainyInterpreter || new BrainyInterpreter();
	this.currentlyStepping = currentlyStepping;
};

Save.prototype.newInterpreter = function() {
	var interpreter = new BrainyInterpreter();
	this.interpreter = interpreter;
	return interpreter;
}; 

Save.prototype.toHTML = function() {
	return "<div class=\"saverow\">" + this.name + "</div>";
};
