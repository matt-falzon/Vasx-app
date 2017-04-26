//Vol.00.00		M Falzon 	Initial revision
//Vol.01.00
//added language conversions
//moved view unbilled calls from home screen
function open(){
	
var win = Titanium.UI.createWindow({
	backgroundColor:'pink',
	left: '60%',
	backgroundImage: Titanium.Filesystem.resourcesDirectory+'/images/common/background.png'
});

Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/webService.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/commonFunctions.js');
theme("white");

win.backgroundColor = Ti.App.backgroundColor;

win.addEventListener('focus', function(e){//every time window is opened checks language settings
if(Ti.App.Language=='en')//Language
	var tableData = [{hasDetail:true, title: 'View aging data', url: 'ui/iphone/agingData'},{hasDetail:true,title:'View unbilled calls', url: 'ui/iphone/unbilledCalls'},{hasDetail:true,title:'Document List', url: 'ui/iphone/documentList'},{hasDetail:true,title:'On net bundle', url: 'ui/iphone/onNetBundle'},{hasDetail:true,title:'Itemised Billing', url: 'ui/iphone/itemisedBilling'},{hasDetail:true,title:'Balance Enquiry', url: 'ui/iphone/balance'}];
else if(Ti.App.Language == 'fr')
	var tableData = [{hasDetail:true, title: 'Afficher vieillissement données', url: 'agingData.js'},{hasDetail:true,title:'Voir non facturés appels', url: 'unbilledCalls.js'},{hasDetail:true,title:'Liste des documents', url: 'documentList.js'}];
else 
	var tableData = [{hasDetail:true, title: 'Ver envelhecimento dados', url: 'agingData.js'},{hasDetail:true,title:'Ver não faturada chamadas', url: 'unbilledCalls.js'},{hasDetail:true,title:'lista de documento', url: 'documentList.js'}];
	table.setData(tableData);	
});

var table = Ti.UI.createTableView({
	backgroundColor: 'transparent',
	color: 'black'
	});


var mainView = Ti.UI.createView({
    backgroundColor:Ti.App.foregroundColor,
    opacity: 0.4
});

var mainViewWrapper = Ti.UI.createView({
    backgroundColor:'transparent',
    top:'3%', 
    bottom:'3%', 
    right:'3%',
    left: '3%',
    borderRadius:10
});

table.addEventListener('click', function(e){//opens window when row clicked
	newWin = require(e.rowData.url);
	open = new newWin.open();
	open.openWin();
	setTimeout(function() {
		//close();
	},1000);   	
});
phoneSwipeWindow(win);
closeMenu(win);
win.add(mainViewWrapper);
mainViewWrapper.add(mainView);
mainViewWrapper.add(table);

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
