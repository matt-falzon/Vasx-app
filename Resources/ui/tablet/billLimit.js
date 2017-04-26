//Vol.00.00		M Falzon 	Initial revision

function billLimit(theView){
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/webService.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/commonFunctions.js');
theme("green");


var win = Titanium.UI.createView({
	backgroundColor:'pink',
	left: '15%'
});
win.backgroundColor = Ti.App.backgroundColor;
swipeWindow(win);
closeMenu(win);
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
	var limit = slider.getValue();
	limit = Math.round(slider.getValue().toFixed(0) / 10) * 10;
	label.setText("Your bill limit is $" + Math.round(slider.getValue().toFixed(0) / 10) * 10);
});

//VIEWS
var headerView = Ti.UI.createView({
	backgroundColor:Ti.App.foregroundColor,
	height:'18%', 
	top: '0%',
	borderRadius:10
	});
	
var mainView = Ti.UI.createView({
	backgroundColor:Ti.App.foregroundColor,
	height:'25%', 
	top: '22%',
	borderRadius:10
	});
	
var submitView = Ti.UI.createView({
	backgroundColor:Ti.App.foregroundColor,
	color: Ti.App.backgroundColor,
	height:'22%', 
	top: '51%',
	borderRadius:10
	});


win.add(headerView);
win.add(mainView);
win.add(submitView);
headerView.add(label);
mainView.add(slider);
mainView.add(valueLabel);
submitView.add(updateButton);
theView.add(win);
}