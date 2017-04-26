//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies
	var FirstView = require('ui/tablet/login');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'white'
	});
	
	//construct UI
	var firstView = new FirstView();
	self.add(firstView);
	
	return self;
}

//make constructor function the public component interface
exports = ApplicationWindow;
