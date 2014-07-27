var Script = function() {
	this.id = 0;
	this.name = "script 0";
	this.saves = [];
};

Script.prototype.newSave = function() {
	var save = new Save();
	this.saves.push(save);
	return save;
};

Script.prototype.toHTML = function() {
	var result = "<div class=\"scriptrow\">";
	result += "<div class=\"scriptname\">" + this.name + "</div>";
	for(var i = 0; i < this.saves.length; i++) {
		result += this.saves[i].toHTML();
	}
	return result + "</div>";
};
