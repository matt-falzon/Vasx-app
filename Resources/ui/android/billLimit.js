//Vol.00.00		M Falzon 	Initial revision
var win = Ti.UI.currentWindow;
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/webService.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/commonFunctions.js');
theme("red");
win.backgroundColor = Ti.App.backgroundColor;

var limit = 150;

label = Ti.UI.createLabel({
	text: "Your bill limit is currently $" + limit,
	color: 'black'
});

slider = Ti.UI.createSlider({//Slider will be used to set bill limit amount
	min: 20,
	max: 300,
	top: '65%',
	width: '90%',
	value: limit
});

valueLabel = Ti.UI.createLabel({//Label = Value of slider
	text: slider.getValue(),
	color: 'black',
	top: '20%'
});

slider.addEventListener("change", function(e){//tracks the value of the slider
	valueLabel.text = '$' + Math.round(slider.getValue().toFixed(0) / 10) * 10;
});

updateButton = Ti.UI.createButton({//updates the users account with new bill limit
	title: 'Update',
	top: '20%'
});

updateButton.addEventListener("click", function(e){//success!
	alert("Your bill limit has been updated to $" + Math.round(slider.getValue().toFixed(0) / 10) * 10);
	var limit = slider.getValue();
	limit = Math.round(slider.getValue().toFixed(0) / 10) * 10;
	label.setText("Your bill limit is $" + Math.round(slider.getValue().toFixed(0) / 10) * 10);
});

//VIEWS
var headerView = Ti.UI.createView({
	backgroundColor:Ti.App.foregroundColor,
	height:'18%', 
	left:'3%', 
	right:'3%',
	top: '3%',
	borderRadius:10
	});
	
var mainView = Ti.UI.createView({
	backgroundColor:Ti.App.foregroundColor,
	height:'25%', 
	left:'3%', 
	right:'3%',
	top: '24%',
	borderRadius:10
	});
	
var submitView = Ti.UI.createView({
	backgroundColor:Ti.App.foregroundColor,
	height:'18%', 
	left:'3%', 
	right:'3%',
	top: '52%',
	borderRadius:10
	});
	
win.add(headerView);
win.add(mainView);
win.add(submitView);
headerView.add(label);
mainView.add(slider);
mainView.add(valueLabel);
submitView.add(updateButton);
