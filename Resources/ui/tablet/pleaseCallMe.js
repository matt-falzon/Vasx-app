//Vol.00.00		M Falzon 	Initial revision
function open(){
var win = Titanium.UI.createWindow({
	backgroundColor:'pink',
	left: '15%'
});
swipeWindow(win);
closeMenu(win);
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/webService.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/commonFunctions.js');
theme("red");
win.backgroundColor = Ti.App.backgroundColor;

//VIEWS
var header = Ti.UI.createView({
    height:Ti.UI.SIZE, 
    layout:'vertical', 
    backgroundColor:Ti.App.backgroundColor,
    top: '3%'
    });
    
var headerView = Ti.UI.createView({
    backgroundColor:Ti.App.foregroundColor,
    height:'51.5%', 
    left:'3%', 
    right:'3%',
    borderRadius:10
});

var bottomView = Ti.UI.createView({
    backgroundColor:Ti.App.foregroundColor,
    top: '5%', 
    left:'3%', 
    right:'3%',
    bottom: '5%',
    borderRadius:10
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
	separatorColor : Ti.App.backgroundColor
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

headerView.add(textField);
win.add(header);
header.add(headerView);
header.add(bottomView);
headerView.add(callButton);
headerView.add(contactsButton);
bottomView.add(table);
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
