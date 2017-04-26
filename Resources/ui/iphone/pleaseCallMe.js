//Vol.00.00		M Falzon 	Initial revision
function open(){
var win = Titanium.UI.createWindow({
	backgroundColor:'pink',
	left: '51%'
});

Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/webService.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/commonFunctions.js');
theme("white");
win.backgroundColor = Ti.App.backgroundColor;

//VIEWS
var theScrollView = Ti.UI.createScrollView({
	backgroundColor: Ti.App.backgroundColor,
	top: 0,
	horizontalBounce: false,
	horizontalWrap: false
});

var mainView = Ti.UI.createView({
	height: '100.5%',//there has to be a better way to do this :S
	backgroundImage: Titanium.Filesystem.resourcesDirectory+'/images/common/background.png'
});

var updateView = Ti.UI.createView({
	height: '70%',
	top:'-70%',
	backgroundColor: Ti.UI.backgroundColor
});


var activityIndicator = Ti.UI.createActivityIndicator({
  color: 'white',
  font: {fontFamily:'Helvetica Neue', fontSize:26, fontWeight:'bold'},
  message: 'Updating...',
  style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
  bottom:10,
});
activityIndicator.show();


var header = Ti.UI.createView({
    height:Ti.UI.SIZE, 
    layout:'vertical', 
    backgroundColor:'transparent',
    top: '3%'
    });
    
var headerView = Ti.UI.createView({
    backgroundColor:Ti.App.foregroundColor,
    opacity: 0.4
});

headerViewWrapper = Ti.UI.createView({
    backgroundColor:'transparent',
    height:'51.5%', 
    left:'3%', 
    right:'3%',
    borderRadius:10,	
});

var bottomView = Ti.UI.createView({
    backgroundColor:Ti.App.foregroundColor,
    opacity: 0.4
});

var bottomViewWrapper = Ti.UI.createView({
    backgroundColor:'transparent',
    top: '5%', 
    left:'3%', 
    right:'3%',
    bottom: '5%',
    borderRadius:10,
    opacity: 0.4
});

//UI ELEMENTS
var textField = Ti.UI.createTextField({
	hintText: 'Enter phone number',
  	color: 'black',
  	top: '13%',
  	width: '80%',
  	height: '30%',
  	font: { fontSize: 24, fontWeight : 'bold'},
  	backgroundColor :'white',
  	textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
});

var contactsButton = Ti.UI.createButton({
	title: 'Contacts',
	top: '65%',
	left: '10%',
	width: '35%',
	bottom: '10%'
});

var callButton = Ti.UI.createButton({
	title: 'Call Me',
	top: '65%',
	right: '10%',
	width: '35%',
	bottom: '10%'
});

var table = Ti.UI.createTableView({
	data: getContacts(),
	backgroundColor: 'transparent',
	separatorColor : Ti.App.backgroundColor,
	color: 'black'
});

//open keyboard when textField clicked
textField.addEventListener('click', function(){
	textField.blur();
	textField.keyboardType = Titanium.UI.KEYBOARD_PHONE_PAD;
	textField.focus();
});
//close keyboard when contacts button is pressed
contactsButton.addEventListener('click', function(){
	textField.blur();
});

//inserts the number selected into the Text Field
table.addEventListener('click', function(e){
    // event data
    var index = e.index;
    var section = e.section;
    var row = e.row;
    var rowdata = e.rowData;
	var number = e.rowData.msisdn;
	var callContact = getContacts();
    Ti.API.info(number);
	textField.setValue(number);
});

callButton.addEventListener("click", function(e){
	if(textField.getValue() == '')
		alert("Select a phone number first");
	else
		alert("Message sent!");
});
phoneSwipeWindow(win);
closeMenu(win);
headerViewWrapper.add(textField);
mainView.add(header);
header.add(headerViewWrapper);
header.add(bottomViewWrapper);
headerViewWrapper.add(headerView);
bottomViewWrapper.add(bottomView);

headerViewWrapper.add(callButton);
headerViewWrapper.add(contactsButton);
bottomViewWrapper.add(table);

win.add(theScrollView);
theScrollView.add(mainView);
theScrollView.add(updateView);
updateView.add(activityIndicator);
function openWin(){
	win.open();
}
win.openWin = openWin;	

function close(){
	win.close();
}
win.close = close;
	
return win;
}
exports.open = open;
