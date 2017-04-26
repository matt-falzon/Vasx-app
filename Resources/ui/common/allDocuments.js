//Vol.00.00		M Falzon 	Initial revision
//Vol.01.00
//added language conversions
//moved view unbilled calls from home screen
var win = Ti.UI.currentWindow;
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/webService.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/commonFunctions.js');
theme("green");

win.backgroundColor = Ti.App.backgroundColor;

win.addEventListener('focus', function(e){//every time window is opened checks language settings
if(Ti.App.Language=='en')//Language
	var tableData = [{hasDetail:true, title: 'View aging data', url: 'agingData.js'},{hasDetail:true,title:'View unbilled calls', url: 'unbilledCalls.js'},{hasDetail:true,title:'View call details', url: 'callDetails.js'},{hasDetail:true,title:'Document List', url: 'documentList.js'},{hasDetail:true,title:'On net bundle', url: 'onNetBundle.js'},{hasDetail:true,title:'Itemised Billing', url: 'itemisedBilling.js'},{hasDetail:true,title:'Balance Enquiry', url: 'balance.js'}];
else if(Ti.App.Language == 'fr')
	var tableData = [{hasDetail:true, title: 'Afficher vieillissement données', url: 'agingData.js'},{hasDetail:true,title:'Voir non facturés appels', url: 'unbilledCalls.js'},{hasDetail:true,title:'obtenir les détails des appels', url: 'callDetails.js'},{hasDetail:true,title:'Liste des documents', url: 'documentList.js'}];
else 
	var tableData = [{hasDetail:true, title: 'Ver envelhecimento dados', url: 'agingData.js'},{hasDetail:true,title:'Ver não faturada chamadas', url: 'unbilledCalls.js'},{hasDetail:true,title:'ver os detalhes da chamada', url: 'callDetails.js'},{hasDetail:true,title:'lista de documento', url: 'documentList.js'}];
	table.setData(tableData);
});

var table = Ti.UI.createTableView({
	backgroundColor: 'transparent',
	});


var mainView = Ti.UI.createView({
    backgroundColor:Ti.App.foregroundColor,
    top:'3%', 
    bottom:'3%', 
    right:'3%',
    left: '3%',
    borderRadius:10
});

table.addEventListener('click', function(e){//opens window when row clicked
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

win.add(mainView);
mainView.add(table);
