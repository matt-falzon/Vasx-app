//Vol.00.00		M Falzon 	Initial revision
var win = Ti.UI.currentWindow;
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/webService.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/commonFunctions.js');
theme("green");

win.backgroundColor = Ti.App.backgroundColor;

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
		color: Ti.App.backgroundColor
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
    backgroundColor:Ti.App.foregroundColor,
    top: '3%',
    bottom: '3%',
    left: '3%',
    right: '3%',
    borderRadius:10,
});

win.add(theView);
theView.add(table);
