//Vol.00.00		M Falzon 	Initial revision
//Vol.00.00		
//created GUI 
function open(){
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/webService.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/commonFunctions.js');

theme("white");
var win = Titanium.UI.createWindow({
	backgroundColor:'pink',
	left: '51%',
	backgroundImage: Titanium.Filesystem.resourcesDirectory+'/images/common/background.png'
});

win.backgroundColor = Ti.App.backgroundColor;

//var iokit = require('au.com.isobaraustralia.titaniummodules.iokitextension');
//Ti.API.info("*** IMEI =====> " + iokit.imei());

var theScrollView = Ti.UI.createScrollView({
	backgroundColor: 'transparent',
	top: 0,
	horizontalBounce: false,
	horizontalWrap: false
});

var mainView = Ti.UI.createView({
	height: '100.5%',//there has to be a better way to do this :S
	backgroundColor: 'transparent'
});

var updateView = Ti.UI.createView({
	height: '70%',
	top:'-70%',
	backgroundColor: Ti.UI.backgroundColor
});

Ti.API.info(Ti.UI.backgroundColor);

var activityIndicator = Ti.UI.createActivityIndicator({
  color: 'white',
  font: {fontFamily:'Helvetica Neue', fontSize:26, fontWeight:'bold'},
  message: 'Updating...',
  style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
  bottom:10,
});
activityIndicator.show();


var codeView = Ti.UI.createView({
    backgroundColor:Ti.App.foregroundColor,
    opacity:0.4,
    top: '3%',
    height: '20%',
    left: '3%', right: '3%',
    borderRadius:10
});

var codeViewWrapper = Ti.UI.createView({
    layout:'vertical', 
    backgroundColor:'transparent',
    top: '3%',
    height: '20%',
    left: '3%',
    right: '3%',
    borderRadius:10
});

var rechargeTextField = Ti.UI.createTextField({
	top: '10%', bottom: '10%',
	width: '90%',
  	textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
  	hintText: 'Enter your recharge code',
  	backgroundColor: 'white',
  	font:{fontSize:'24sp', fontWeight:'bold'},
  	color: Ti.App.backgroundColor,
  	autocorrect: false
});
	
var submitView = Ti.UI.createView({
	backgroundColor:Ti.App.foregroundColor,
	opacity:0.4
	});

var submitViewWrapper = Ti.UI.createView({
	backgroundColor:'transparent',
	height:'18%', 
	left:'3%', 
	right:'3%',
	top: '26%',
	borderRadius:10
	});

var submitButton = Ti.UI.createButton({//updates the users account with new bill limit
	title: 'Submit',
	top: '20%'
});

submitButton.addEventListener('click', function(e){
	recharge(win.id, Ti.App.Language, rechargeTextField.getValue(), 1);
});

function recharge(id, lang, pin, vn){
var client = Ti.Network.createHTTPClient();

client.onerror = function(){
        Ti.API.error(this.status + ' - ' + this.statusText);
};
var parameters = [{SessionID: id, LanguageCode: lang, PinNumber: pin, VirtualNetwork: vn}];

var xml = generateXML("http://service.adminportal.vasx.com/", 'getRecharge', parameters);

client.open('POST', 'http://192.168.20.3:12080/vx_adminportal/AdminPortal');
client.setRequestHeader("Content-Type", 'text/xml');
client.setRequestHeader('Content-Length', xml.length);
client.setRequestHeader('SOAPAction', '"getRecharge"');
client.send(xml);

client.onload = function() {
    var results = client.responseXML.documentElement.getElementsByTagName("getRechargeResponse");
	if (results && results.length>0) {
		var xml_doc = Ti.XML.parseString(results.item(0).text);
		alert(xml_doc.getElementsByTagName("Message").item(0).text);

	}
    //manually parse the SOAP XML document
};
}
phoneSwipeWindow(win);
closeMenu(win);	
win.add(theScrollView);

theScrollView.add(mainView);
theScrollView.add(updateView);
updateView.add(activityIndicator);

mainView.add(codeViewWrapper);
mainView.add(submitViewWrapper);
mainView.add(codeView);

submitViewWrapper.add(submitView);
submitViewWrapper.add(submitButton);
mainView.add(submitViewWrapper);

//codeViewWrapper.add(codeView);
codeViewWrapper.add(rechargeTextField);
//codeViewWrapper.add(codeView);

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
