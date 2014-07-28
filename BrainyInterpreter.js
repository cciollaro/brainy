var BrainyInterpreter = function() {
	this.resetState();
	this.input = "";
	this.script = "";
};

//resets all but script and input
BrainyInterpreter.prototype.resetState = function() {
	this.MAX_INSTRUCTIONS = 2500;
	this.data = [0];
	this.data_ptr = 0;
	this.script_ptr = 0;
	this.instruction_ctr = 0;
	this.callstack = new Stack();
	this.input_ptr = 0;
	this.output = [];
};

BrainyInterpreter.prototype.addOutput = function(o) {
	this.output.push(o);
};

BrainyInterpreter.prototype.extendDataArray = function() {
	var len = this.data.length;
	for(var i = 0; i < len; i++) {
		this.data[len + i] = 0;
	}
};

BrainyInterpreter.prototype.execute = function() {
	while(this.script_ptr < this.script.length && this.instruction_ctr < this.MAX_INSTRUCTIONS) {
		this.step();
	}
};

BrainyInterpreter.prototype.step = function() {
	if(this.script_ptr >= this.script.length) return false;
	switch(this.script.charAt(this.script_ptr)) {
		case ">":
			if(this.data_ptr == this.data.length - 1) {
				this.extendDataArray();
			}
			this.data_ptr++;
			break; 
		case "<":
			this.data_ptr--;
			break;
		case "+":
			this.data[this.data_ptr]++;
			break;
		case "-":
			this.data[this.data_ptr]--;
			break;
		case ",":
			this.data[this.data_ptr] = this.input.charCodeAt(this.input_ptr++);
			break;
		case ".":
			this.addOutput(this.data[this.data_ptr]);
			break;
		case "[":
			if(this.data[this.data_ptr] == 0) {
				//proceed to the associated closing bracket
				var braces = 0;
				while(this.script_ptr < this.script.length && this.script.charAt(this.script_ptr) != "]" && braces != 0) {
					this.script_ptr++;
					if(this.script.charAt(this.script_ptr) == "[") braces++;
					if(this.script.charAt(this.script_ptr) == "]") braces--;
				}
			} else {
				this.callstack.push(this.script_ptr);
			}
			break;
		case "]":
			if(this.data[this.data_ptr] == 0) {
				this.callstack.pop();
			} else {
				this.script_ptr = this.callstack.peek();
			}
			break;
		default:
	}
	this.script_ptr++;
	this.instruction_ctr++;
};
