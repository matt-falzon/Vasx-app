//Vol.00.00		M Falzon 	Initial revision
//Vol.01.00		M Falzon
//added activity indicator
var win = Ti.UI.currentWindow;
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/webService.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/commonFunctions.js');
theme("orange");

win.backgroundColor = Ti.App.backgroundColor;

var style;
if (Ti.Platform.name === 'iPhone OS'){
  style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
}
else {
  style = Ti.UI.ActivityIndicatorStyle.DARK;
}

var activityIndicator = Ti.UI.createActivityIndicator({
  color: Ti.App.foregroundColor,
  font: {fontFamily:'Helvetica Neue', fontSize:26, fontWeight:'bold'},
  message: 'Loading...',
  style:style,
  height:Ti.UI.SIZE,
  width:Ti.UI.SIZE,
  visible: false
});

win.addEventListener('focus', function(e){//activity indicator is visible when windows opened
	activityIndicator.setVisible(true);
});


var table = Ti.UI.createTableView({
	backgroundColor: 'transparent',
	scrollable: true,
	allowsSelection : false,
	separatorColor : Ti.App.backgroundColor
});

var theView = Ti.UI.createView({
    backgroundColor:Ti.App.foregroundColor,
    top: '3%',
    bottom: '3%',
    left: '3%',
    right: '3%',
    borderRadius:10,
});

getContactGroups(win.myId, Ti.App.Language, 1);

function getContactGroups(id, lang, vn){
var client = Ti.Network.createHTTPClient();

client.onerror = function(){
        Ti.API.error(this.status + ' - ' + this.statusText);
};
var parameters = [{SessionID: id, LanguageCode: lang, VirtualNetwork: vn}];

var xml = generateXML("http://service.adminportal.vasx.com/", 'getContactGroups', parameters);

client.open('POST', 'http://192.168.20.3:12080/vx_adminportal/AdminPortal');
client.setRequestHeader("Content-Type", 'text/xml');
client.setRequestHeader('Content-Length', xml.length);
client.setRequestHeader('SOAPAction', '"getContactGroups"');
client.send(xml);

client.onload = function() {
    var results = client.responseXML.documentElement.getElementsByTagName("getContactGroupsResponse");
	if (results && results.length>0) {
		var tableData = [];
		Ti.API.info(results.item(0).text);
		var xml_doc = Ti.XML.parseString(results.item(0).text);
		tableData = [{title: xml_doc.getElementsByTagName("Message").item(0).text}];
		table.setData(tableData);
		win.add(theView);
		theView.add(table);
		activityIndicator.setVisible(false);//make activity indicator invisible when operation completes

	}
    //manually parse the SOAP XML document
};
}
win.add(activityIndicator);

