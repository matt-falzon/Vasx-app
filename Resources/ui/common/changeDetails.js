//Vol.00.00		M Falzon 	Initial revision
var win = Ti.UI.currentWindow;
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/webService.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/commonFunctions.js');
theme("orange");

win.backgroundColor = Ti.App.backgroundColor;
myId = win.myId;
//Labels
firstNameLabel = Ti.UI.createLabel({
	text: 'First Name: ' + win.firstName
});

surnameLabel = Ti.UI.createLabel({
	text: 'Surname: ' + win.lastName
});

passwordLabel = Ti.UI.createLabel({
	text: 'Change Password'
});

contactNo1Label = Ti.UI.createLabel({
	text: 'First contact number: 0424 837 502'
});

contactNo2Label = Ti.UI.createLabel({
	text: 'Second contact number: 0421 827 146'
});

addressLabel = Ti.UI.createLabel({
	text: 'Change Address'
});

//Views

var firstNameView = Ti.UI.createView({
	backgroundColor:Ti.App.foregroundColor,
	height:'9%', 
	left: '3%', 
	right:'3%',
	top: '3%',
	borderRadius:10
});

var surnameView = Ti.UI.createView({
	backgroundColor:Ti.App.foregroundColor,
	height:'9%', 
	left: '3%', 
	right:'3%',
	top: '15%',
	borderRadius:10
});

var addressView = Ti.UI.createView({
	backgroundColor:Ti.App.foregroundColor,
	height:'9%', 
	left: '3%', 
	right:'3%',
	top: '27%',
	borderRadius:10
});

var passwordView = Ti.UI.createView({
	backgroundColor:Ti.App.foregroundColor,
	height:'9%', 
	left: '3%', 
	right:'3%',
	top: '39%',
	borderRadius:10
});

var contactNo1View = Ti.UI.createView({
	backgroundColor:Ti.App.foregroundColor,
	height:'9%', 
	left: '3%', 
	right:'3%',
	top: '51%',
	borderRadius:10
});

var contactNo2View = Ti.UI.createView({
	backgroundColor:Ti.App.foregroundColor,
	height:'9%', 
	left: '3%', 
	right:'3%',
	top: '63%',
	borderRadius:10
});


//POPUP WINDOW
function popUp(theLabel){
	var t = Titanium.UI.create2DMatrix();
	t = t.scale(0);
	if(theLabel.getText() == passwordLabel.getText())
		var w = Titanium.UI.createWindow({
			backgroundColor:'#336699',
			borderWidth:8,
			borderColor:'#999',
			height:'50%',
			width:'70%',
			top: '15%',
			borderRadius:10,
			opacity:0.92,
			transform:t
		});
	else
		var w = Titanium.UI.createWindow({
			backgroundColor:'#336699',
			borderWidth:8,
			borderColor:'#999',
			height:'25%',
			width:'70%',
			top: '25%',
			borderRadius:10,
			opacity:0.92,
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
	if(theLabel.getText() == passwordLabel.getText())
		var b = Titanium.UI.createButton({
			title:'Done',
			height:'10%',
			width:'35%',
			bottom: '5%'
		});
	else
		var b = Titanium.UI.createButton({
			title:'Done',
			height:'20%',
			width:'50%',
			bottom: '8%'
		});
	w.add(b);
	//event for button to close window when clicked
	b.addEventListener('click', function()
	{
		if(theLabel.getText() == passwordLabel.getText()){
			if(messageField.getValue().length>0 && newPassword.getValue().length>0 && newPasswordConfirm.getValue().length>0){
				if(newPasswordConfirm.getValue() == newPassword.getValue()){
					setPassword(myId, Ti.App.Language,messageField.getValue(), newPassword.getValue(), 1);
					
				}else
					alert("New passwords do not match");
			}else
				alert("Fill all fields");
		}
		theLabel.setText(messageField.getValue());
		var t3 = Titanium.UI.create2DMatrix();
		t3 = t3.scale(0);
		w.close({transform:t3,duration:300});
	});
	var s = theLabel.getText();
	if(s.indexOf(":") >= 0){
		s = s.substring(s.length, s.indexOf(':'));
		s = s.substr(2);
	}
	if(theLabel.getText() == passwordLabel.getText()){
		messageField = Ti.UI.createTextField({
			top: '10%',
			left: '5%',
			right: '5%',
			height: '20%',
			editable: true,
			hintText: 'Enter old Password',
			font: { fontSize: 18},
			backgroundColor :'white',
			autocorrect: false
		});
			newPassword = Ti.UI.createTextField({
			top: '35%',
			left: '5%',
			right: '5%',
			height: '20%',
			editable: true,
			hintText: 'Enter new password',
			font: { fontSize: 18},
			backgroundColor :'white',
			autocorrect: false
		});
			newPasswordConfirm = Ti.UI.createTextField({
			top: '60%',
			left: '5%',
			right: '5%',
			height: '20%',
			editable: true,
			hintText: 'Confirm New Password',
			font: { fontSize: 18},
			backgroundColor :'white',
			autocorrect: false
		});
		w.add(messageField);
		w.add(newPassword);
		w.add(newPasswordConfirm);
		}
	else{
		messageField = Ti.UI.createTextField({
			top: '35%',
			left: '5%',
			right: '5%',
			bottom: '35%',
			editable: true,
			hintText: 'Enter your message',
			font: { fontSize: 18},
			backgroundColor :'white',
			autocorrect: false,
			value: s
		});
		w.add(messageField);
	}
		

	w.open(a);
	if(theLabel.getText() == passwordLabel.getText()){
	messageField.keyboardType = Titanium.UI.KEYBOARD_ASCII;
	messageField.appearance = Titanium.UI.KEYBOARD_APPEARANCE_ALERT;
	messageField.enableReturnKey = false;
	messageField.returnKeyType = Titanium.UI.RETURNKEY_DONE;
	
	newPassword.keyboardType = Titanium.UI.KEYBOARD_ASCII;
	newPassword.appearance = Titanium.UI.KEYBOARD_APPEARANCE_ALERT;
	newPassword.enableReturnKey = false;
	newPassword.returnKeyType = Titanium.UI.RETURNKEY_DONE;
	
	newPasswordConfirm.keyboardType = Titanium.UI.KEYBOARD_ASCII;
	newPasswordConfirm.appearance = Titanium.UI.KEYBOARD_APPEARANCE_ALERT;
	newPasswordConfirm.enableReturnKey = false;
	newPasswordConfirm.returnKeyType = Titanium.UI.RETURNKEY_DONE;
	}
	else{
	messageField.keyboardType = Titanium.UI.KEYBOARD_ASCII;
	messageField.appearance = Titanium.UI.KEYBOARD_APPEARANCE_ALERT;
	messageField.enableReturnKey = false;
	messageField.returnKeyType = Titanium.UI.RETURNKEY_DONE;
	messageField.focus();
	}
	//swipe down to close keyboard, swipe up to open again
	messageField.addEventListener("swipe", function(e){
		if (e.direction == 'down'){
			messageField.blur();
			newPassword.blur();
			newPasswordConfirm.blur();
		}
		else if (e.direction == 'up'){
			messageField.focus();
			newPassword.focus();
			newPasswordConfirm.focus();
		}
	});

	w.addEventListener("swipe", function(e){
		if (e.direction == 'down'){
			messageField.blur();
			newPassword.blur();
			newPasswordConfirm.blur();
		}
		else if (e.direction == 'up'){
			messageField.focus();
			newPassword.focus();
			newPasswordConfirm.focus();
		}
	});
};

function setPassword(sessionID, lang, oldPass, newPass, vn){
	var client = Ti.Network.createHTTPClient();
	params = [{SessionID: sessionID, LanguageCode: lang, OldPassword: oldPass, NewPassword: newPass, VirtualNetwork: vn}];
	var soapRequest = generateXML('http://service.adminportal.vasx.com/', 'setPassword', params);
	
	client.open('POST', 'http://192.168.20.3:12080/vx_adminportal/AdminPortal');
	client.setRequestHeader("Content-Type", 'text/xml');
	client.setRequestHeader('Content-Length', soapRequest.length);
	client.setRequestHeader('SOAPAction', '"setPassword"');
	client.send(soapRequest);
	
	client.onload = function() {
	    var doc = client.responseXML.documentElement.getElementsByTagName("setPasswordResponse");
		var xml_doc = Ti.XML.parseString(doc.item(0).text);
		var message = xml_doc.getElementsByTagName('Message');
		alert(message.item(0).text);
	    //manually parse the SOAP XML document
	};
	
	client.onerror = function(){
	        Ti.API.error(this.status + ' - ' + this.statusText);
	};
	
}

function getPasswordHints(sessionID, lang, vn){
	var client = Ti.Network.createHTTPClient();
	params = [{SessionID: sessionID, LanguageCode: lang, OldPassword: oldPass, NewPassword: newPass, VirtualNetwork: vn}];
	var soapRequest = generateXML('http://service.adminportal.vasx.com/', 'getPasswordHints', params);
	
	client.open('POST', 'http://192.168.20.3:12080/vx_adminportal/AdminPortal');
	client.setRequestHeader("Content-Type", 'text/xml');
	client.setRequestHeader('Content-Length', soapRequest.length);
	client.setRequestHeader('SOAPAction', '"getPasswordHints"');
	client.send(soapRequest);
	
	client.onload = function() {
	    var doc = client.responseXML.documentElement.getElementsByTagName("getPasswordHintsResponse");
		var xml_doc = Ti.XML.parseString(doc.item(0).text);
		var message = xml_doc.getElementsByTagName('Message');
		alert(message.item(0).text);
	    //manually parse the SOAP XML document
	};
	
	client.onerror = function(){
	        Ti.API.error(this.status + ' - ' + this.statusText);
	};
	
}

firstNameView.addEventListener("click", function(e){
	popUp(firstNameLabel);
});

surnameView.addEventListener("click", function(e){
	popUp(surnameLabel);
});

passwordView.addEventListener("click", function(e){
	popUp(passwordLabel);
});

contactNo1View.addEventListener("click", function(e){
	popUp(contactNo1Label);
});

contactNo2View.addEventListener("click", function(e){
	popUp(contactNo2Label);
});

addressView.addEventListener("click", function(e){
	popUp(addressLabel);
});




firstNameView.add(firstNameLabel);
surnameView.add(surnameLabel);
passwordView.add(passwordLabel);
contactNo1View.add(contactNo1Label);
contactNo2View.add(contactNo2Label);
addressView.add(addressLabel);

win.add(firstNameView);
win.add(surnameView);
win.add(passwordView);
win.add(contactNo1View);
win.add(contactNo2View);
win.add(addressView);



