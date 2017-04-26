var win = Ti.UI.currentWindow;
var myId = win.id;
win.backgroundColor = 'black';

var db = Ti.Database.open('users');
var rows = db.execute("SELECT currentPlan, dataUsageMB FROM people WHERE id =" + myId + "");
var myPlan = '' + rows.fieldByName('currentPlan');
var myUsage = '' + rows.fieldByName('dataUsageMB');
var rows = db.execute("SELECT planName, planCost, data FROM phoneCaps WHERE id =" + myPlan + "");
var myPlan = '' + rows.fieldByName('planName');
var planCost = '' + rows.fieldByName('planCost');
var myData = '' + rows.fieldByName('data');
db.close();
	

	var label = Ti.UI.createLabel({
		color:'#008000',
		text: 'you are currently on the ' + myPlan + ' plan costing $' + planCost + ' per month, you have used ' + myUsage + 'mb this month out of ' + myData + 'mb',
		height:'auto',
		width:'auto',
		top: 70
	});
	
	var webView = Ti.UI.createWebView({
	url:'testUsage.html',
	top: 120,
	left:40,
	height: 450, 
	width: 400,
	DisableBounce: true,
	touchEnabled: false

});

webView.addEventListener('load', function(e) {
    Ti.App.fireEvent('graphData:fromTitanium', { message: '' + myUsage + ',' + myData + ''});
});

	win.add(label);
	win.add(webView);