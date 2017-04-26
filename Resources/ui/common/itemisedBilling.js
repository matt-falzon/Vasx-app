//Vol.00.00		M Falzon 	Initial revision
//Vol.00.00		
//created GUI 
var win = Ti.UI.currentWindow;
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/webService.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/commonFunctions.js');
theme("red");
win.backgroundColor = Ti.App.backgroundColor;

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

var billIDTextField = Ti.UI.createTextField({
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
	
var billView = Ti.UI.createView({
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
	getItemisedBilling(win.id, Ti.App.Language, billIDTextField.getValue(), 1);
});

function getItemisedBilling(id, lang, billID, vn){
var client = Ti.Network.createHTTPClient();

client.onerror = function(){
        Ti.API.error(this.status + ' - ' + this.statusText);
};
var parameters = [{SessionID: id, LanguageCode: lang, BillRunID: billID, VirtualNetwork: vn}];

var xml = generateXML("http://service.adminportal.vasx.com/", 'getItemisedBilling', parameters);

client.open('POST', 'http://192.168.20.3:12080/vx_adminportal/AdminPortal');
client.setRequestHeader("Content-Type", 'text/xml');
client.setRequestHeader('Content-Length', xml.length);
client.setRequestHeader('SOAPAction', '"getItemisedBilling"');
client.send(xml);

client.onload = function() {
    var results = client.responseXML.documentElement.getElementsByTagName("getItemisedBillingResponse");
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
codeView.add(billIDTextField);
win.add(billView);

