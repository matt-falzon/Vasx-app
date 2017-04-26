//Vol.00.00		M Falzon 	Initial revision
//Vol.01.00
//added language conversions
//moved view unbilled calls from home screen
//Vol.02.00
//added loading screen
var win = Ti.UI.currentWindow;
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/webService.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/commonFunctions.js');
theme("green");

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

win.addEventListener('focus', function(e){
    activityIndicator.setVisible(true);
});
	
var table = Ti.UI.createTableView({
	backgroundColor: 'transparent',
	});

getDocumentList(Ti.App.Session, Ti.App.Language, Ti.App.msisdn, 1);//call getDocumentList method

var mainView = Ti.UI.createView({
    backgroundColor:Ti.App.foregroundColor,
    top:'3%', 
    bottom:'3%', 
    right:'3%',
    left: '3%',
    borderRadius:10
});

table.addEventListener('click', function(e){//clicking table row opens corresponding window
   if(e.rowData.url){
   	
   	var newWin = Ti.UI.createWindow({
   		backgroundColor: '#fff',
   		title: e.rowData.title,
   		url: e.rowData.url,
   		id: win.id
   	});
   }
   	Ti.UI.currentTab.open(newWin);
   	
});

function getDocumentList(id, lang, msisdn, vn){//gets list of documents and adds them to the table
var client = Ti.Network.createHTTPClient();

client.onerror = function(){
        Ti.API.error(this.status + ' - ' + this.statusText);
};
var parameters = [{SessionID: id, LanguageCode: lang, ForMSISDN: msisdn, VirtualNetwork: vn}];

var xml = generateXML("http://service.adminportal.vasx.com/", 'getDocumentList', parameters);

client.open('POST', 'http://192.168.20.3:12080/vx_adminportal/AdminPortal');
client.setRequestHeader("Content-Type", 'text/xml');
client.setRequestHeader('Content-Length', xml.length);
client.setRequestHeader('SOAPAction', '"getDocumentList"');
client.send(xml);

client.onload = function() {

    var results = client.responseXML.documentElement.getElementsByTagName("getDocumentListResponse");
	if (results && results.length>0) {
		Ti.API.info(results.item(0).text);
		var xml_doc = Ti.XML.parseString(results.item(0).text);
		Ti.API.info(xml_doc.getElementsByTagName('Message').item(0).text);
		var tableData = [{title: xml_doc.getElementsByTagName('Message').item(0).text}];
		table.setData(tableData);
		mainView.add(table);
		win.add(mainView);
		activityIndicator.setVisible(false);//hide activity indicator when done
	}
    //manually parse the SOAP XML document
};
};

win.add(activityIndicator);
