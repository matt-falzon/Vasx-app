//Vol.00.00		M Falzon 	Initial revision	24/7/13
function forgotPassword(){

//Gets password hints
	var t = Titanium.UI.create2DMatrix();
	t = t.scale(0);
	
	var w = Titanium.UI.createWindow({
		backgroundColor:'#336699',
		borderWidth:8,
		borderColor:'#999',
		height:'25%',
		width:'65%',
		top: '15%',		
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
	var b = Titanium.UI.createButton({
		title:'Done',
		height:'20%',
		width:'60%',
		bottom: '12%'
	});
	w.add(b);
	//event for button to close window when clicked
	b.addEventListener('click', function()
	{
		resetPassword(msisdnTextField.getValue(), "en", 1);
		var t3 = Titanium.UI.create2DMatrix();
		t3 = t3.scale(0);
		w.close({transform:t3,duration:300});
	});
		

	w.add(msisdnView);
	msisdnView.add(msisdnTextField);
	w.add(forgotLabel);
	w.open(a);
}

function resetPassword(msisdn, lang, vn){

var client = Ti.Network.createHTTPClient();

client.onerror = function(){
        Ti.API.error(this.status + ' - ' + this.statusText);
};
var parameters = [{MSISDN: msisdn, LanguageCode: lang, VirtualNetwork: vn}];

var xml = generateXML("http://service.adminportal.vasx.com/", 'resetPassword', parameters);

client.open('POST', 'http://192.168.20.3:12080/vx_adminportal/AdminPortal');
client.setRequestHeader("Content-Type", 'text/xml');
client.setRequestHeader('Content-Length', xml.length);
client.setRequestHeader('SOAPAction', '"resetPassword"');
client.send(xml);

client.onload = function() {
    var results = client.responseXML.documentElement.getElementsByTagName("resetPasswordResponse");
	Ti.API.info(results.item(0).text);
	if (results && results.length>0) {
		var xml_doc = Ti.XML.parseString(results.item(0).text);
	    var message = xml_doc.getElementsByTagName('Message');
	    alert(message.item(0).text);
	}
    //manually parse the SOAP XML document
};
}; 

//forgot password views and fields	
var forgotLabel = Ti.UI.createLabel({
	text: 'Forgot your password',
	top: '8%',
	font:{fontSize: '12sp', fontWeight: 'bold'},
	color: 'white'
});

var msisdnView = Ti.UI.createView({
	layout:'vertical', 
	backgroundColor:'#E3E8E8',
	top: '28%',
	height: '30%',
	left: '8%',
	right: '8%',
	borderRadius:10
});

var msisdnTextField = Ti.UI.createTextField({
	top: '25%',
	left: '3%', right: '3%',
	bottom: '18%',
	font:{fontSize:'12sp', fontWeight:'bold'},
	hintText: "Enter your phone number",
  	textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
});

msisdnTextField.keyboardType = Titanium.UI.KEYBOARD_PHONE_PAD;

exports.forgotPassword = forgotPassword;