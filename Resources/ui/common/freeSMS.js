//Vol.00.00		M Falzon 	Initial revision
//Vol.01.00		M Falzon	26/7/13
//moved getContacts method to commonFunctions.js
var win = Ti.UI.currentWindow;
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/webService.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/commonFunctions.js');
theme("red");
win.backgroundColor = Ti.App.backgroundColor;

Ti.App.theMessage;//Saves the message being sent as a global variable so if the box is closed it will re open with the message


var textField = Ti.UI.createTextField({
	hintText: 'Enter phone number',
  	color: 'black',
  	top: '13%',
  	width: '80%',
  	height: '30%',
  	font: {fontSize: 24, fontWeight : 'bold'},
  	backgroundColor :'white',
  	textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
});

var messageButton = Ti.UI.createButton({
	title: 'Compose',
	top: '65%',
	left: '10%',
	width: '35%',
	bottom: '10%'
});

var callButton = Ti.UI.createButton({
	title: 'Send',
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
		sendSMS(win.id, "en", textField.getValue(), Ti.App.theMessage, 1);//success!
		Ti.API.info(Ti.App.theMessage);
		Ti.App.theMessage = '';//remove message
		if(Ti.App.freeSMS > 0)
			Ti.App.freeSMS--;
		}
});

//MESSAGE BUTTON EVENT POPUP WINDOW
messageButton.addEventListener('click', function(e){
		var t = Titanium.UI.create2DMatrix();
		t = t.scale(0);
	
		var w = Titanium.UI.createWindow({
			backgroundColor:Ti.App.backgroundColor,
			borderWidth:8,
			borderColor:Ti.App.foregroundColor,
			height:'89%',
			width:'93%',
			borderRadius:10,
			opacity:0.7,
			transform:t
		});
	
		// create first transform to go beyond normal size
		var t1 = Titanium.UI.create2DMatrix();
		t1 = t1.scale(1.1);
		var a = Titanium.UI.createAnimation();
		a.transform = t1;
		a.duration = 200;
	
		// when this animation completes, scale to normal size
		a.addEventListener('complete', function()
		{
			Titanium.API.info('here in complete');
			var t2 = Titanium.UI.create2DMatrix();
			t2 = t2.scale(1.0);
			w.animate({transform:t2, duration:200});
	
		});
	
		// create a button to close window
		var b = Titanium.UI.createButton({
			title:'Done',
			height:'7%',
			width:'50%',
			bottom: '8%'
		});
		w.add(b);
		//event for button to close window when clicked
		b.addEventListener('click', function()
		{
			Ti.App.theMessage = messageField.getValue();
			var t3 = Titanium.UI.create2DMatrix();
			t3 = t3.scale(0);
			w.close({transform:t3,duration:300});
		});
		
		messageField = Ti.UI.createTextArea({
			top: '5%',
			left: '5%',
			right: '5%',
			bottom: '18%',
			editable: true,
			hintText: 'Enter your message',
			font: { fontSize: 18},
			backgroundColor :'white',
			value: Ti.App.theMessage
		});
		
		w.add(messageField);
		w.open(a);
		messageField.keyboardType = Titanium.UI.KEYBOARD_ASCII;
		messageField.appearance = Titanium.UI.KEYBOARD_APPEARANCE_ALERT;
		messageField.enableReturnKey = false;
		messageField.returnKeyType = Titanium.UI.RETURNKEY_DONE;
		messageField.focus();
		
		//swipe down to close keyboard, swipe up to open again
		messageField.addEventListener("swipe", function(e){
			if (e.direction == 'down')
				messageField.blur();
			else if (e.direction == 'up'){
				messageField.focus();
			}
		});

});
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

headerView.add(textField);
win.add(header);
header.add(headerView);
header.add(bottomView);
headerView.add(callButton);
headerView.add(messageButton);
bottomView.add(table);
