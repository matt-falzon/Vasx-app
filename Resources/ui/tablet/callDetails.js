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
theme("green");

win.backgroundColor = Ti.App.backgroundColor;

getCallDetails(Ti.App.Session, Ti.App.Language, 1);

var style;
if (Ti.Platform.name === 'iPhone OS'){//activity indicator setup
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

win.addEventListener('focus', function(e){//activity indicator visible when window opened
	activityIndicator.setVisible(true);
});

var table = Ti.UI.createTableView({
	backgroundColor: 'transparent',
	scrollable: true,
	allowsSelection : false,
	separatorColor : Ti.App.backgroundColor
});

var mainView = Ti.UI.createView({
    backgroundColor:Ti.App.foregroundColor,
    top: '3%',
    bottom: '3%',
    left: '3%',
    right: '3%',
    borderRadius:10,
});

function getCallDetails(id, lang, vn){
var client = Ti.Network.createHTTPClient();

client.onerror = function(){
        Ti.API.error(this.status + ' - ' + this.statusText);
};
var parameters = [{SessionID: id, LanguageCode: lang, VirtualNetwork: vn}];

var xml = generateXML("http://service.adminportal.vasx.com/", 'getCallDetails', parameters);

client.open('POST', 'http://192.168.20.3:12080/vx_adminportal/AdminPortal');
client.setRequestHeader("Content-Type", 'text/xml');
client.setRequestHeader('Content-Length', xml.length);
client.setRequestHeader('SOAPAction', '"getCallDetails"');
client.send(xml);

client.onload = function() {
    var results = client.responseXML.documentElement.getElementsByTagName("getCallDetailsResponse");
	if (results && results.length>0) {
		Ti.API.info(results.item(0).text);
		var xml_doc = Ti.XML.parseString(results.item(0).text);
		var tableData = [{title: xml_doc.getElementsByTagName('Message').item(0).text}];
		activityIndicator.setVisible(false);//activity indicator invisible when operation is complete
		table.setData(tableData);
		mainView.add(table);
		win.add(mainView);

	}
    //manually parse the SOAP XML document
};
}

win.add(activityIndicator);
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
