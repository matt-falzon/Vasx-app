//Vol.01.00     M Falzon    Initial revision
//Vol.02.00		M Falzon
//removed usage graphs
//added theme support
//Vol.03.00 
//language changes no longer require app to be restarted
var win = Ti.UI.currentWindow;
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/webService.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/commonFunctions.js');
var myId = win.id;//ID number of user
win.backgroundColor = '#1BA5E0';
var myTabGroup = Ti.UI.currentWindow.tabGroup;

appLanguage();

theme("green");

var tableInfo = [{title: 'Amount'}, {title: 'Date'}];

var tableData = [];


var mainView = Ti.UI.createView({
	backgroundColor: Ti.App.backgroundColor
});

//Back button for title
var logout = Ti.UI.createButton({
    title: "Log out",
    style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});

//Last payment title label
var lastPaymentLabel = Ti.UI.createLabel({
    text: lastPaymentText,
    top: '15%'
});
//LAST PAYMENT TABLE VIEW
var amountLabel = Ti.UI.createLabel({
  	font: { fontSize: 22, fontWeight : 'bold'},
	right: 15,
	color: Ti.App.backgroundColor
});

var dateLabel = Ti.UI.createLabel({
  	font: { fontSize: 24, fontWeight : 'bold'},
	right: 15,
	color: Ti.App.backgroundColor
});


function setLastPaymentTable(){//fills data into the last payment table
	
	lastPaymentLabel.setText(lastPaymentText);
	
var row = Ti.UI.createTableViewRow({
    selectedBackgroundColor:'transparent',
    title: amountText,
    height: 40,
});

amountLabel.setText('$67.65');

row.add(amountLabel);
tableData.push(row);

var row = Ti.UI.createTableViewRow({
    selectedBackgroundColor:'transparent',
    title: dateText,
    height: 40,
	width: '70%',
});

dateLabel.setText('15/6/13');
row.add(dateLabel);
tableData.push(row);

table.setData(tableData);
tableData = [];
};


var table = Ti.UI.createTableView({
	data: tableData,
	backgroundColor: 'transparent',
	scrollable: false,
	allowsSelection : false,
	separatorColor : Ti.App.foregroundColor
});
var balanceLabel = Ti.UI.createLabel({
  	font: { fontSize: 24, fontWeight : 'bold'},
	right: 15,
	color: Ti.App.backgroundColor
});

//END OF LAST PAYMENT TABLE VIEW
////////////////////////////////

//Current Balance Title Label
var currentBalanceLabel = Ti.UI.createLabel({
	text: currentBalanceText,
	top: '15%'
});


var CurrentBalanceDateLabel = Ti.UI.createLabel({
	text: '...',
  	font: { fontSize: 24, fontWeight : 'bold'},
	right: 15,
	color: Ti.App.backgroundColor
});
//CURRENT BALANCE TABLE VIEW
function setCurrentBalanceTable(){//fills data into the current balance table
	
	currentBalanceLabel.setText(currentBalanceText);
	
var row = Ti.UI.createTableViewRow({
    selectedBackgroundColor:'transparent',
    title:totalDueText,
    height: 40
});

balanceLabel.setText('...');
getBalance(win.id, "en", 1);

row.add(balanceLabel);
tableData.push(row);

var row = Ti.UI.createTableViewRow({
    selectedBackgroundColor:'transparent',
    title:paymentDueDateText,
    height: 40
});



CurrentBalanceDateLabel.setText('17/8/13');

row.add(CurrentBalanceDateLabel);
tableData.push(row);
totalTable.setData(tableData);
tableData = [];
}
var totalTable = Ti.UI.createTableView({
	data: tableData,
	backgroundColor: 'transparent',
	scrollable: false,
	allowsSelection : false,
	separatorColor : Ti.App.foregroundColor
});

//End of current balance table view
///////////////////////////////////


//Bottom Table View
function setBottomTable(){
var bottomTableInfo = [{hasDetail:true, title: viewAsPdfText, url: 'pdfPrint.js'}, {hasDetail:true, title: viewAllDocumentsText, url: 'allDocuments.js'}];
bottomTable.setData(bottomTableInfo);	
}

var bottomTable = Ti.UI.createTableView({
	backgroundColor: 'transparent',
	scrollable: false,
	allowsSelection : true,
	separatorColor : Ti.App.foregroundColor
});


//////////Event Listeners

bottomTable.addEventListener('click', function(e){
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

win.addEventListener('focus', function(e){//checks the langauge every time windows is opened
	appLanguage();
	setBottomTable();
	setCurrentBalanceTable();
	setLastPaymentTable();
});

logout.addEventListener('click', function(e){
endSession();
});

//VIEWS
    
var theView = Ti.UI.createView({
    backgroundColor:Ti.App.foregroundColor,
    height:80, 
    left:10, 
    right:10,
    borderRadius:10,
    top:50
});

var titleView = Ti.UI.createView({
    backgroundColor:Ti.App.foregroundColor,
    height:50, 
    left:10, 
    right:10,
    //borderRadius:10,
    top:10
});
    
var titleView2 = Ti.UI.createView({
    backgroundColor:Ti.App.foregroundColor,
    height:50, 
    left:10, 
    right:10,
    //borderRadius:10,
    top:140
});

var bottomMenuView = Ti.UI.createView({
    backgroundColor:Ti.App.foregroundColor,
    height:89, 
    left:10, 
    right:10,
    //borderRadius:10,
    top:270
});
  
var totalBalanceView = Ti.UI.createView({
    backgroundColor:Ti.App.foregroundColor,
    height:80, 
    left:10, 
    right:10,
    borderRadius:10,
    top:180
});

var seperatorView = Ti.UI.createView({
	backgroundColor: Ti.App.backgroundColor,
	height: '4%',
	width: '100%',
	bottom: '20%'
});

var seperatorView2 = Ti.UI.createView({
	backgroundColor: Ti.App.backgroundColor,
	height: '4%',
	width: '100%',
	bottom: '20%'
});

function appLanguage(){//language settings
	if (Ti.App.Language=="pt"){
	amountText = "quantidade";
	dateText = "data";
	lastPaymentText = "último pagamento";
	currentBalanceText = "saldo atual";
	totalDueText = "total devido";
	paymentDueDateText = "data de vencimento";
	viewAsPdfText = "ver em pdf";
	viewAllDocumentsText = "ver todos os documentos";
	
}
else if (Ti.App.Language=="fr"){
	amountText = "chamadas: ";
	dateText = "dados: ";
	lastPaymentText = "tempo de sobra: ";
	currentBalanceText = "solde courant";
	totalDueText = "total dû";
	paymentDueDateText = "paiement date d'échéance";
	viewAsPdfText = "Afficher au format PDF";
	viewAllDocumentsText = "Voir tous les documents";
}
else{
	amountText = "Amount";
	dateText = "Date";
	lastPaymentText = "Last Payment";
	currentBalanceText = "Current Balance";
	totalDueText = "Total Due";
	paymentDueDateText = "Payment Due Date";
	viewAsPdfText = "View as PDF";
	viewAllDocumentsText = "View All Documents";
}
}

function getBalance(id, lang, vn){//calls the getAgingData web service and gets the current balance element

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
    var results = client.responseXML.documentElement.getElementsByTagName("getAgingDataResponse");
	Ti.API.info(results.item(0).text);
	if (results && results.length>0) {
		var xml_doc = Ti.XML.parseString(results.item(0).text);
	    var message = xml_doc.getElementsByTagName('Message');
	    var currentBalance = xml_doc.getElementsByTagName('CurrentBalance');
	    balanceLabel.setText('$' + currentBalance.item(0).text);
	}
    //manually parse the SOAP XML document
};
	  	
};


mainView.add(bottomMenuView);
bottomMenuView.add(bottomTable);
totalBalanceView.add(totalTable);
mainView.add(totalBalanceView);
mainView.add(titleView2);
titleView.add(seperatorView);
titleView2.add(seperatorView2);
mainView.add(titleView);
titleView.add(lastPaymentLabel);
titleView2.add(currentBalanceLabel);
theView.add(table);
mainView.add(theView);
win.setLeftNavButton(logout);
win.add(mainView);
