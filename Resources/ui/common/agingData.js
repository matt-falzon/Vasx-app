//Vol.00.00		M Falzon 	Initial revision
//Vol.01.00
//added language conversions
//moved view unbilled calls from home screen
//Vol.02.00		M Falzon	24/7/13
//added status indicator
var win = Ti.UI.currentWindow;
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/webService.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/commonFunctions.js');
theme("green");

win.setBackgroundColor(Ti.App.backgroundColor);
var mainView = Ti.UI.createView({
    backgroundColor:Ti.App.foregroundColor,
    top:'3%', 
    bottom:'3%', 
    right:'3%',
    left: '3%',
    borderRadius:10
});

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

	activityIndicator.setVisible(true);


getAgingData(Ti.App.Session, Ti.App.Language, 1);//call getAgingData function

function getAgingData(id, lang, vn){//gets aging data from web service

var client = Ti.Network.createHTTPClient();

client.onerror = function(){
        Ti.API.error(this.status + ' - ' + this.statusText);
};
var parameters = [{SessionID: id, LanguageCode: lang, VirtualNetwork: vn}];

var xml = generateXML("http://service.adminportal.vasx.com/", 'getAgingData', parameters);

client.open('POST', 'http://192.168.20.3:12080/vx_adminportal/AdminPortal');
client.setRequestHeader("Content-Type", 'text/xml');
client.setRequestHeader('Content-Length', xml.length);
client.setRequestHeader('SOAPAction', '"getAgingData"');
client.send(xml);

client.onload = function() {
    var results = client.responseXML.documentElement.getElementsByTagName("getAgingDataResponse");//parse xml
	Ti.API.info(results.item(0).text);
	if (results && results.length>0) {
		var tableData = [];
		var rowTitles = [];
		var xml_doc = Ti.XML.parseString(results.item(0).text);
	    var message = xml_doc.getElementsByTagName('Message');
	    var currentBalance = xml_doc.getElementsByTagName('CurrentBalance');
	    var outstanding30Days = xml_doc.getElementsByTagName('Outstanding30Days');
	    var outstanding60Days = xml_doc.getElementsByTagName('Outstanding60Days');
	    var outstanding90Days = xml_doc.getElementsByTagName('Outstanding90Days');
	    var outstanding120Days = xml_doc.getElementsByTagName('Outstanding120Days');
	    var unbilledUsage = xml_doc.getElementsByTagName('UnbilledUsage');
	    var unbillSubs = xml_doc.getElementsByTagName('UnbilledSubs');
	    tableData.push(currentBalance.item(0).text);
	    rowTitles.push("Current Balance: ");
	    tableData.push(outstanding30Days.item(0).text);
	    rowTitles.push("Outstanding 30 days: ");
	    tableData.push(outstanding60Days.item(0).text);
	    rowTitles.push("Outstanding 60 days: ");
	    tableData.push(outstanding90Days.item(0).text);
	    rowTitles.push("Outstanding 90 days: ");
	    tableData.push(outstanding120Days.item(0).text);
	    rowTitles.push("Outstanding 120 days: ");	    
	    tableData.push(unbilledUsage.item(0).text);
	    rowTitles.push("Unbilled Usage: ");	    
	    tableData.push(unbillSubs.item(0).text);
	    rowTitles.push("Unbilled Subscribers: "); 
	    var tableContent = [];
	    
		for(var i =0; i < tableData.length; i++){//inserts data into rows for table
			var row = Ti.UI.createTableViewRow({
	   		selectedBackgroundColor:'transparent',
	    	height: 40,
			});
			
			
			var textLabel = Ti.UI.createLabel({
				text: rowTitles[i],
				color: 'black',
				font: { fontSize: "16pt", fontWeight : 'bold'},
				left: '2%', right: '2%'
			});
			
			var dataLabel = Ti.UI.createLabel({
				text: "$" + tableData[i],
  				font: { fontSize: "19pt", fontWeight : 'bold'},
				right: '2%',
				color: Ti.App.backgroundColor
			});
			
			row.add(textLabel);
			row.add(dataLabel);
			tableContent.push(row);
	}
		var table = Ti.UI.createTableView({
			backgroundColor: 'transparent',
			data: tableContent,//add data to the table
			separatorColor : Ti.App.backgroundColor
			});
			mainView.add(table);//add table to view
			win.add(mainView);
			activityIndicator.setVisible(false);
	}
	
    //manually parse the SOAP XML document
};
};
win.add(activityIndicator);

