//Vol.01.00     M Falzon    Initial revision
//Vol.02.00		M Falzon
//removed usage graphs
//added theme support
//Vol.03.00 
//language changes no longer require app to be restarted
function open(){
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/webService.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/commonFunctions.js');

var win = Titanium.UI.createWindow({
	backgroundColor:'pink',
	left: '51%'
});


appLanguage();

theme("white");

var tableInfo = [{title: 'Amount'}, {title: 'Date'}];

var tableData = [];


var theScrollView = Ti.UI.createScrollView({
	backgroundColor: Ti.App.backgroundColor,
	top: 0,
	horizontalBounce: false,
	horizontalWrap: false
});

var mainView = Ti.UI.createView({
	height: '100.5%',//there has to be a better way to do this :S
	backgroundImage: Titanium.Filesystem.resourcesDirectory+'/images/common/background.png'
});

var updateView = Ti.UI.createView({
	height: '70%',
	top:'-70%',
	backgroundColor: Ti.UI.backgroundColor
});


var activityIndicator = Ti.UI.createActivityIndicator({
  color: 'white',
  font: {fontFamily:'Helvetica Neue', fontSize:26, fontWeight:'bold'},
  message: 'Updating...',
  style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
  bottom:10
});
activityIndicator.show();

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
	color: Ti.App.foregroundColor
});

var dateLabel = Ti.UI.createLabel({
  	font: { fontSize: 24, fontWeight : 'bold'},
	right: 15,
	color: Ti.App.foregroundColor
});


function setLastPaymentTable(){//fills data into the last payment table
	
	lastPaymentLabel.setText(lastPaymentText);
	
var row = Ti.UI.createTableViewRow({
    selectedBackgroundColor:'transparent',
    title: amountText,
    height: 40
});

amountLabel.setText('$67.65');

row.add(amountLabel);
tableData.push(row);

var row = Ti.UI.createTableViewRow({
    selectedBackgroundColor:'transparent',
    title: dateText,
    height: 40,
	width: '70%'
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
	color: Ti.App.foregroundColor
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
	color: Ti.App.foregroundColor
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
if(Ti.App.firstName != 'test')
	getBalance(Ti.App.Session, "en", 1);


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
var bottomTableInfo = [{hasDetail:true, title: viewAsPdfText, url: 'pdfPrint.js'}];
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

	appLanguage();
	setBottomTable();
	setCurrentBalanceTable();
	setLastPaymentTable();

logout.addEventListener('click', function(e){
endSession();
});

//VIEWS   
var theView = Ti.UI.createView({
    backgroundColor:Ti.App.foregroundColor,
	opacity: .4,
	//borderRadius: 10
});

theViewWrapper = Ti.UI.createView({
    backgroundColor:'transparent',
    height:'17%', 
    left:'3%', 
    right:'3%',
    //borderRadius:10,
    top:'13%'
});

var titleView = Ti.UI.createView({
    backgroundColor:Ti.App.foregroundColor,
	opacity: .4
});

titleViewWrapper = Ti.UI.createView({
    backgroundColor:'transparent',
    height:'10%', 
    left:'3%', 
    right:'3%',
    //borderRadius:10,
    top:'3%'	
});
    
var titleView2 = Ti.UI.createView({
    backgroundColor:Ti.App.foregroundColor,
	opacity: .4
});

var titleView2Wrapper = Ti.UI.createView({
    backgroundColor:'transparent',
    height:'10%', 
    left:'3%', 
    right:'3%',
    //borderRadius:10,
    top:'33%'
});

var bottomMenuView = Ti.UI.createView({
    backgroundColor:Ti.App.foregroundColor,
	opacity: .4
});
  
var bottomMenuViewWrapper = Ti.UI.createView({
    backgroundColor:'transparent',
    height:'9.2%', 
    left:'3%', 
    right:'3%',
    //borderRadius:10,
    top:'62.5%'
});  
  
var totalBalanceView = Ti.UI.createView({
    backgroundColor:Ti.App.foregroundColor,
	opacity: .4,
	//borderRadius: 10
});

var totalBalanceViewWrapper = Ti.UI.createView({
    backgroundColor:'transparent',
    height:'17%', 
    left:'3%', 
    right:'3%',
    //borderRadius:10,
    top:'42.5%'
});

var seperatorView = Ti.UI.createView({
	backgroundColor: Ti.App.foregroundColor,
	height: '6%',
	width: '100%',
	bottom: '0%'
});

var seperatorView2 = Ti.UI.createView({
	backgroundColor: Ti.App.foregroundColor,
	height: '6%',
	width: '100%',
	bottom: '0%'
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
closeMenu(win);
phoneSwipeWindow(win);

mainView.add(bottomMenuViewWrapper);
bottomMenuViewWrapper.add(bottomMenuView);
bottomMenuViewWrapper.add(bottomTable);

mainView.add(totalBalanceViewWrapper);
totalBalanceViewWrapper.add(totalBalanceView);
totalBalanceViewWrapper.add(totalTable);

mainView.add(titleView2Wrapper);
titleView2Wrapper.add(titleView2);
titleView2Wrapper.add(seperatorView2);
titleView2Wrapper.add(currentBalanceLabel);

mainView.add(titleViewWrapper);
titleViewWrapper.add(titleView);
titleViewWrapper.add(seperatorView);
titleViewWrapper.add(lastPaymentLabel);

mainView.add(theViewWrapper);
theViewWrapper.add(theView);
theViewWrapper.add(table);

win.add(theScrollView);
theScrollView.add(mainView);
theScrollView.add(updateView);
updateView.add(activityIndicator);
	

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
