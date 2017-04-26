//Vol.00.00		M Falzon 	Initial revision
//Vol.00.00		
//created GUI 
function open(){
	
var win = Titanium.UI.createWindow({
	backgroundColor:'pink',
	left: '90%'
});

Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/commonFunctions.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/webService.js');
theme("blue");

win.setBackgroundColor(Ti.App.backgroundColor);

//var iokit = require('au.com.isobaraustralia.titaniummodules.iokitextension');
//Ti.API.info("*** IMEI =====> " + iokit.imei());


var codeView = Ti.UI.createView({
    layout:'vertical', 
    backgroundColor:Ti.App.foregroundColor,
    top: '3%',
    height: '20%',
    left: '3%',
    right: '3%',
    borderRadius:10
});

var codeTextField = Ti.UI.createTextField({
	top: '10%', bottom: '10%',
	width: '90%',
  	textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
  	hintText: 'Enter your bundle code',
  	backgroundColor: 'white',
  	font:{fontSize:'24sp', fontWeight:'bold'},
  	color: Ti.App.backgroundColor,
  	autocorrect: false
});
	
var submitView = Ti.UI.createView({
	backgroundColor:Ti.App.foregroundColor,
	height:'18%', 
	left:'3%', 
	right:'3%',
	bottom: '3%',
	borderRadius:10
	});
	
var bundleView = Ti.UI.createView({
	top: '26%',
	bottom: '24%',
	left: '3%', right: '3%', 
	backgroundColor: Ti.App.foregroundColor,
	borderRadius:10
});

var submitButton = Ti.UI.createButton({//updates the users account with new bill limit
	title: 'get bundle',
	top: '20%'
});

submitButton.addEventListener('click', function(e){
	getOnNetBundle(win.id, Ti.App.Language, codeTextField.getValue(), 1);
});

function getOnNetBundle(id, lang, code, vn){
var client = Ti.Network.createHTTPClient();

client.onerror = function(){
        Ti.API.error(this.status + ' - ' + this.statusText);
};
var parameters = [{SessionID: id, LanguageCode: lang, Code: code, VirtualNetwork: vn}];

var xml = generateXML("http://service.adminportal.vasx.com/", 'getOnNetBundle', parameters);

client.open('POST', 'http://192.168.20.3:12080/vx_adminportal/AdminPortal');
client.setRequestHeader("Content-Type", 'text/xml');
client.setRequestHeader('Content-Length', xml.length);
client.setRequestHeader('SOAPAction', '"getOnNetBundle"');
client.send(xml);

client.onload = function() {
    var results = client.responseXML.documentElement.getElementsByTagName("getOnNetBundleResponse");
	if (results && results.length>0) {
		var xml_doc = Ti.XML.parseString(results.item(0).text);
		alert(xml_doc.getElementsByTagName("Message").item(0).text);

	}
    //manually parse the SOAP XML document
};
}
	
win.add(codeView);
win.add(submitView);
submitView.add(submitButton);
codeView.add(codeTextField);
win.add(bundleView);
tableSwipeWindow(win);
closeMenu(win);
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

