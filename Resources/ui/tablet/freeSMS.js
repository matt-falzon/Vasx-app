//Vol.00.00		M Falzon 	Initial revision
//Vol.01.00		M Falzon	26/7/13
//moved getContacts method to commonFunctions.js
function open(sid){
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/webService.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/commonFunctions.js');

theme("red");
var win = Titanium.UI.createWindow({
	backgroundColor:'pink',
	left: '15%'
});

win.backgroundColor = Ti.App.backgroundColor;

Ti.App.theMessage;//Saves the message being sent as a global variable so if the box is closed it will re open with the message


var textField = Ti.UI.createTextField({
	hintText: 'Enter phone number',
  	color: 'black',
  	top: '5%',
  	right: '20%',
  	height: '12%',
  	left: '12%',
  	font: {fontSize: 24, fontWeight : 'bold'},
  	backgroundColor :'white',
  	textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
  	keyboardType : Titanium.UI.KEYBOARD_PHONE_PAD
});

var toLabel = Ti.UI.createLabel({
	text: 'To:',
	top: '7%',
	left: '3%',
	font: {fontSize: 30, fontWeight : 'bold'},
});

var callButton = Ti.UI.createButton({
	title: 'Send',
	top: '5%',
	right: '3%',
	width: '15%',
	height: '12%'
});

var table = Ti.UI.createTableView({
	data: getContacts(),
	backgroundColor: 'transparent',
	separatorColor : Ti.App.backgroundColor
});

var smsArea = Ti.UI.createTextArea({
	top: '20%',
	bottom: '1.5%',
	left: '1.5%',
	right: '1.5%',
  	font: {fontSize: 30},
});

//EVENT LISTENERS
textField.addEventListener('click', function(){
	textField.blur();
	textField.keyboardType = Titanium.UI.KEYBOARD_PHONE_PAD;
	textField.focus();
});

//puts the number selected into the text field at the top
table.addEventListener('click', function(e){
    // event data
	var number = e.rowData.msisdn;
	//var callContact = getContacts();
    Ti.API.info(number);
	textField.setValue(number);
});

//sends the message
callButton.addEventListener("click", function(e){
	if(textField.getValue() == '')//check that the user has entered a number
		alert("Select a phone number first");
	else{
		sendSMS(sid, "en", textField.getValue(), Ti.App.theMessage, 1);//success!
		Ti.API.info(Ti.App.theMessage);
		Ti.App.theMessage = '';//remove message
		if(Ti.App.freeSMS > 0)
			Ti.App.freeSMS--;
		}
});

//VIEWS
var header = Ti.UI.createView({
    height:Ti.UI.SIZE, 
    layout:'vertical', 
    backgroundColor:Ti.App.backgroundColor,
    });
    
var headerView = Ti.UI.createView({
    backgroundColor:Ti.App.foregroundColor,
    height:'51.5%', 
    left:'3%', 
    right:'3%',
    top: '1.5%',
    borderRadius:10
});

titleBar(header, 'FreeSMS', Ti.App.foregroundColor, Ti.App.BackgroundColor);

//for user convenience
headerView.addEventListener('swipe', function(e){
	if (e.direction == 'down')
		textField.blur();
	else if (e.direction == 'up')
		textField.focus();
});


var bottomView = Ti.UI.createView({
    backgroundColor:Ti.App.foregroundColor,
    top: '5%', 
    left:'3%', 
    right:'3%',
    bottom: '5%',
    borderRadius:10
});

function sendSMS(id, lang, recipient, message, vn){

var client = Ti.Network.createHTTPClient();

client.onerror = function(){
        Ti.API.error(this.status + ' - ' + this.statusText);
};
var parameters = [{SessionID: id, LanguageCode: lang,Recipient: recipient, Message: message, VirtualNetwork: vn}];

var xml = generateXML("http://service.adminportal.vasx.com/", 'sendSMS', parameters);

client.open('POST', 'http://192.168.20.3:12080/vx_adminportal/AdminPortal');
client.setRequestHeader("Content-Type", 'text/xml');
client.setRequestHeader('Content-Length', xml.length);
client.setRequestHeader('SOAPAction', '"sendSMS"');
client.send(xml);

client.onload = function() {
    var results = client.responseXML.documentElement.getElementsByTagName("sendSMSResponse");
	Ti.API.info(results.item(0).text);
	if (results && results.length>0) {
		var xml_doc = Ti.XML.parseString(results.item(0).text);
	    var message = xml_doc.getElementsByTagName('Message');
	    alert(message.item(0).text);
	}
    //manually parse the SOAP XML document
};
	  	
};  
swipeWindow(win);
closeMenu(win);
headerView.add(textField);
headerView.add(toLabel);
headerView.add(smsArea);
win.add(header);
header.add(headerView);
header.add(bottomView);
headerView.add(callButton);
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
