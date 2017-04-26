//Vol.00.00		M Falzon 	Initial revision
var win = Ti.UI.currentWindow;
var myId = win.id;
win.backgroundColor = '#1BA5E0';
var myTabGroup = Ti.UI.currentWindow.tabGroup;
	
var tableInfo = [//add dashboard items
{hasDetail:true, title: 'Free SMS', url: 'freeSMS.js'}, 
{hasDetail:true, title: 'Please call me', url: 'pleaseCallMe.js'}, 
{hasDetail:true, title: 'Voucher recharge', url: 'voucherRecharge.js'}, 
{hasDetail:true, title: 'Friendly Names', url: 'friendlyNames.js'}, 
{hasDetail:true, title: 'Bill Limit', url: 'billLimit.js'}, 
{hasDetail:true, title: 'Services Menu', url: 'servicesMenu.js'}
];

var logout = Ti.UI.createButton({
    title: "Log out",
    style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});



var table = Ti.UI.createTableView({
	data: tableInfo,
	backgroundColor: 'transparent'
});

//VIEWS
	
var theView = Ti.UI.createView({
	backgroundColor:'#E3E8E8',
	height:347, 
	left:10, 
	right:10,
	borderRadius:10,
	top:10
	});


logout.addEventListener('click', function(e){
	Ti.App.tabGroup.removeTab(Ti.UI.currentTab);
    Ti.App.tabGroup.close({transition: Titanium.UI.iPhone.AnimationStyle.NONE});
});

table.addEventListener('click', function(e){
   if(e.rowData.url){
   	
   	var newWin = Ti.UI.createWindow({
   		backgroundColor: '#fff',
   		title: e.rowData.title,
   		url: e.rowData.url
   	});
   }
   	Ti.UI.currentTab.open(newWin);
   	Ti.App.theMessage = '';//forget free sms message
   	
});

theView.add(table);
win.add(theView);
win.setLeftNavButton(logout);
