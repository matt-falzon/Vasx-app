//Vol.00.00		M Falzon 	Initial revision
//Vol.01.00		M Falzon
//gets personal information
//Vol.02.00
//also gets services
var win = Ti.UI.currentWindow;
myId = win.myId;
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/webService.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/commonFunctions.js');
theme("orange");

win.backgroundColor = Ti.App.backgroundColor;

var mainView = Ti.UI.createView({
    backgroundColor:Ti.App.foregroundColor,
    left:'3%', 
    right:'3%',
    top: '3%',
    bottom: '3%',
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

win.addEventListener('focus', function(e){//activity indicator while data is being downloaded from web services
    activityIndicator.setVisible(true);
});

getAccountData(myId, "en", 1);
function getAccountData(sessionID, LanguageCode, vn){
var client = Ti.Network.createHTTPClient();

client.onerror = function(){
        Ti.API.error(this.status + ' - ' + this.statusText);
};
var parameters = [{SessionID: sessionID, LanguageCode: LanguageCode, VirtualNetwork: vn}];

var xml = generateXML("http://service.adminportal.vasx.com/", 'getAccountData', parameters);

client.open('POST', 'http://192.168.20.3:12080/vx_adminportal/AdminPortal');
client.setRequestHeader("Content-Type", 'text/xml');
client.setRequestHeader('Content-Length', xml.length);
client.setRequestHeader('SOAPAction', '"getAccountData"');
client.send(xml);

client.onload = function() {
    var results = client.responseXML.documentElement.getElementsByTagName("getAccountDataResponse");
	Ti.API.info(results.item(0).text);
	if (results && results.length>0) {
		var tableData = [];
		var rowTitles = [];
		var xml_doc = Ti.XML.parseString(results.item(0).text);
	    var message = xml_doc.getElementsByTagName('Message');
	    var accountNumber = xml_doc.getElementsByTagName('AccountNumber');
	    var accountName = xml_doc.getElementsByTagName('AccountName');
	    var emailAddress = xml_doc.getElementsByTagName('EmailAddress');
	    var line1 = xml_doc.getElementsByTagName('Line1');
	    var line2 = xml_doc.getElementsByTagName('Line2');
	    var line3 = xml_doc.getElementsByTagName('Line3');
	    var line4 = xml_doc.getElementsByTagName('Line4');
	    var line5 = xml_doc.getElementsByTagName('Line5');
	    tableData.push(accountNumber.item(0).text);
	    rowTitles.push("Account Number: ");
	    tableData.push(accountName.item(0).text);
	    rowTitles.push("Account Name: ");
	    if(emailAddress.item(0).text != ""){
	    tableData.push(emailAddress.item(0).text);
	    rowTitles.push("Email Address: ");
	    }
	    tableData.push("");
	    rowTitles.push("");
	    tableData.push("");
	    rowTitles.push("Address");
	    tableData.push(line1.item(0).text);
	    rowTitles.push("");
	    if(line2.item(0).text != ""){
	    tableData.push(line2.item(0).text);
	    rowTitles.push("");	    
	    }
	    if(line3.item(0).text != ""){
	    tableData.push(line3.item(0).text);
	    rowTitles.push("");	   
	    }
	    if(line4.item(0).text != ""){ 
	    tableData.push(line4.item(0).text);
	    rowTitles.push("");	
	    }
	    if(line5.item(0).text != ""){    
	    tableData.push(line5.item(0).text);
	    rowTitles.push("");	  
	    }
	      
		getServices(sessionID, LanguageCode, Ti.App.msisdn, vn, tableData, rowTitles);
		
	
    //manually parse the SOAP XML document
};
};
function getServices(id, lang, msisdn, vn, tableData, rowTitles){//to be implemented
var client = Ti.Network.createHTTPClient();

client.onerror = function(){
        Ti.API.error(this.status + ' - ' + this.statusText);
};
var parameters = [{SessionID: id, LanguageCode: lang, Msisdn: msisdn, VirtualNetwork: vn}];

var xml = generateXML("http://service.adminportal.vasx.com/", 'getServices', parameters);

client.open('POST', 'http://192.168.20.3:12080/vx_adminportal/AdminPortal');
client.setRequestHeader("Content-Type", 'text/xml');
client.setRequestHeader('Content-Length', xml.length);
client.setRequestHeader('SOAPAction', '"getServices"');
client.send(xml);

client.onload = function() {
    var results = client.responseXML.documentElement.getElementsByTagName("getServicesResponse");
	if (results && results.length>0) {
		Ti.API.info(results.item(0).text);
		var xml_doc = Ti.XML.parseString(results.item(0).text);
		var serviceCode = xml_doc.getElementsByTagName("ServiceCode").item(0).text;
		var serviceID = xml_doc.getElementsByTagName("ServiceID").item(0).text;
		var serviceName = xml_doc.getElementsByTagName("ServiceName").item(0).text;
		var activeService = xml_doc.getElementsByTagName("ActiveService").item(0).text;
		var activeFrom = xml_doc.getElementsByTagName("ActiveFrom").item(0).text;
		var administerable = xml_doc.getElementsByTagName("Administerable").item(0).text;
		var subCharge = xml_doc.getElementsByTagName("SubscriptionCharge").item(0).text;
		
		tableData.push('');
		rowTitles.push('');
		tableData.push('');
		rowTitles.push('Services');
		tableData.push(serviceName);
		rowTitles.push('ServiceName: ');
		tableData.push(serviceCode);
		rowTitles.push('Code: ' );
		tableData.push(serviceID);
		rowTitles.push('ID: ');
		tableData.push(activeService);
		rowTitles.push('Active: ');
		tableData.push(activeFrom);
		rowTitles.push('Active from: ');
		tableData.push(administerable);
		rowTitles.push('Administerable: ');
		tableData.push(subCharge);
		rowTitles.push('Subscription charge: ');

	    var tableContent = [];
		for(var i =0; i < tableData.length; i++){//putting data into table rows
			var row = Ti.UI.createTableViewRow({
	   		selectedBackgroundColor:'transparent',
	    	height: 40,
			});
			
			
			var textLabel = Ti.UI.createLabel({
				text: rowTitles[i] + tableData[i],
				color: 'black',
				font: { fontSize: "16pt", fontWeight : 'bold'},
				left: '2%', right: '2%'
			});
			
			row.add(textLabel);
			tableContent.push(row);
	}
	
	var table = Ti.UI.createTableView({
		backgroundColor: 'transparent',
		data: tableContent,
		separatorColor : Ti.App.backgroundColor
		});
	win.add(mainView);
	mainView.add(table);
	activityIndicator.setVisible(false);
	}

};
    //manually parse the SOAP XML document
};
}
win.add(activityIndicator);
