//Vol.00.00		M Falzon 	Initial revision
//displays current names in table
//Vol.01.00
//added setDisplayNames
//Vol.02.00
//auto updates without reopening the window
function open(){
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/webService.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/commonFunctions.js');

theme("blue");
var win = Titanium.UI.createWindow({
	backgroundColor:'pink',
	left: '51%'
});

win.backgroundColor = Ti.App.backgroundColor;
getDisplayNames(Ti.App.Session, Ti.App.Language, 1);
var msisdnField = Ti.UI.createTextField({
	hintText: 'Enter phone number',
  	color: 'black',
  	top: '13%',
  	width: '80%',
  	height: '20%',
  	font: {fontSize: 24, fontWeight : 'bold'},
  	backgroundColor :'white',
  	textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
});

var nameField = Ti.UI.createTextField({
	hintText: 'Enter name',
  	color: 'black',
  	top: '40%',
  	width: '80%',
  	height: '20%',
  	font: {fontSize: 24, fontWeight : 'bold'},
  	backgroundColor :'white',
  	textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
	autocorrect: false
});

var table = Ti.UI.createTableView({
	backgroundColor: 'transparent',
	separatorColor : Ti.App.backgroundColor,
	editable: true,
	editing: true
});

var addButton = Ti.UI.createButton({
	title: 'Add',
	top: '70%',
	width: '35%',
	bottom: '10%'
});

var tableView = Ti.UI.createView({
    backgroundColor:Ti.App.foregroundColor,
    top: '51.5%', 
    left:'3%', 
    right:'3%',
   	bottom: '3%',
   	borderRadius:10
});

//VIEWS
    
var topView = Ti.UI.createView({
    backgroundColor:Ti.App.foregroundColor,
    height:'45.5%', 
    left:'3%', 
    right:'3%',
    top: '3%',
    borderRadius:10
});

addButton.addEventListener('click', function(e){
	setDisplayName(Ti.App.Session, Ti.App.Language, msisdnField.getValue(), nameField.getValue(), 1);
	//getDisplayNames(win.myId, Ti.App.Language, 1)
	getDisplayNames(Ti.App.Session, Ti.App.Language, 1);	
});

msisdnField.addEventListener('click', function(){
	msisdnField.blur();
	msisdnField.keyboardType = Titanium.UI.KEYBOARD_PHONE_PAD;
	msisdnField.focus();
});

function getDisplayNames(id, lang, vn){

var client = Ti.Network.createHTTPClient();

client.onerror = function(){
        Ti.API.error(this.status + ' - ' + this.statusText);
};
var parameters = [{SessionID: id, LanguageCode: lang, VirtualNetwork: vn}];

var xml = generateXML("http://service.adminportal.vasx.com/", 'getDisplayNames', parameters);

client.open('POST', 'http://192.168.20.3:12080/vx_adminportal/AdminPortal');
client.setRequestHeader("Content-Type", 'text/xml');
client.setRequestHeader('Content-Length', xml.length);
client.setRequestHeader('SOAPAction', '"getDisplayNames"');
client.send(xml);

client.onload = function() {
	var tableInfo = [];
    var results = client.responseXML.documentElement.getElementsByTagName("getDisplayNamesResponse");
	Ti.API.info(results.item(0).text);
	if (results && results.length>0) {
		var xml_doc = Ti.XML.parseString(results.item(0).text);
	    var name = xml_doc.getElementsByTagName('Name');
	    
	    for (var i=0; i < name.length; i++){
	    	for(var j = 0; j < name.item(i).getElementsByTagName("DisplayName").length; j++){
	    		var xml_name = name.item(i).getElementsByTagName("DisplayName").item(j).text;
	    		var xml_number = name.item(i).getElementsByTagName("OtherParty").item(j).text;
				tableInfo.push({name: xml_name, number: xml_number});
	    	}
	    }
	    var tableContent = [];
		for(var i =0; i < tableInfo.length; i++){
			var row = Ti.UI.createTableViewRow({
	   		selectedBackgroundColor:'transparent',
	    	height: 40,
			});
			
			
			var textLabel = Ti.UI.createLabel({
				text: tableInfo[i].name + ": " +tableInfo[i].number,
				color: 'black',
				font: { fontSize: "16pt", fontWeight : 'bold'},
				left: '2%', right: '2%'
			});
			
			row.add(textLabel);
			tableContent.push(row);
	}
	    table.setData(tableContent);
	}
    //manually parse the SOAP XML document
};
	  	
};  

function setDisplayName(id, lang, number, name, vn){
var client = Ti.Network.createHTTPClient();

client.onerror = function(){
        Ti.API.error(this.status + ' - ' + this.statusText);
};
var parameters = [{SessionID: id, LanguageCode: lang, CalledNumber: number, DisplayName: name, VirtualNetwork: vn}];

var xml = generateXML("http://service.adminportal.vasx.com/", 'setDisplayName', parameters);

client.open('POST', 'http://192.168.20.3:12080/vx_adminportal/AdminPortal');
client.setRequestHeader("Content-Type", 'text/xml');
client.setRequestHeader('Content-Length', xml.length);
client.setRequestHeader('SOAPAction', '"setDisplayName"');
client.send(xml);

client.onload = function() {
    var results = client.responseXML.documentElement.getElementsByTagName("setDisplayNameResponse");
	if (results && results.length>0) {
		Ti.API.info(results.item(0).text);
		var xml_doc = Ti.XML.parseString(results.item(0).text);
		alert(xml_doc.getElementsByTagName("Message").item(0).text);

	}
    //manually parse the SOAP XML document
};
};
phoneSwipeWindow(win);
closeMenu(win);	
topView.add(nameField);
topView.add(msisdnField);
win.add(topView);
win.add(tableView);
topView.add(addButton);
tableView.add(table);
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