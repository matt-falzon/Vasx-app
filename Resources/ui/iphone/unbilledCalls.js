//Vol.00.00		M Falzon 	Initial revision
function open(){
	
var win = Titanium.UI.createWindow({
	backgroundColor:'pink',
	left: '90%',
	backgroundImage: Titanium.Filesystem.resourcesDirectory+'/images/common/background.png'
});

Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/commonFunctions.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/webService.js');
theme("white");

win.setBackgroundColor(Ti.App.backgroundColor);
var tableData = [];
for(var i=1; i<25;i++){
	var row = Ti.UI.createTableViewRow({
    	selectedBackgroundColor:'transparent',
    	title:'Description',
    	height: 40
	});

	var label = Ti.UI.createLabel({
		text: '$' + Math.floor(Math.random()*100) + '.' + Math.floor(Math.random()*99),
  		font: { fontSize: 24, fontWeight : 'bold'},
		right: 15,
		color: 'white'
	});
	row.add(label);
	tableData.push(row);
}

var table = Ti.UI.createTableView({
	data: tableData,
	backgroundColor: 'transparent',
	scrollable: true,
	allowsSelection : false,
	separatorColor : Ti.App.backgroundColor
});

var theView = Ti.UI.createView({
    backgroundColor:'white',
    opacity: 0.4
});

var theViewWrapper = Ti.UI.createView({
    backgroundColor:'transparent',
    top: '3%',
    bottom: '3%',
    left: '3%',
    right: '3%',
    borderRadius:10,
});
theViewWrapper.add(theView);
win.add(theViewWrapper);
theViewWrapper.add(table);

tableSwipeWindow(win);
closeMenu(win);
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
