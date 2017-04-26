//Vol.00.00		M Falzon 	Initial revision
/* 
 * 
 *Tabs
 * 
 */
function createMainWindow(sessionID, firstName, lastName, sms, lang, msisdn){
// create tab group
Ti.App.tabGroup = Titanium.UI.createTabGroup();

//
// create base UI tab and root window
//

//home window
var win1 = Titanium.UI.createWindow({  
    title:'Home',
    backgroundColor:'#fff',
    url: 'ui/common/home.js',
    id: sessionID,
    msisdn: msisdn,
    firstName: firstName,
    lastName: lastName,
    sms: sms
});

var tab1 = Titanium.UI.createTab({  
    icon:'images/common/house.png',
    title:'Home',
    window:win1
});

//
// create controls tab and root window
//

//usage window
var win2 = Titanium.UI.createWindow({  
    title:'Usage',
    backgroundColor:'#fff',
   	url: 'ui/common/usage.js',
    id: sessionID,
    firstName: firstName,
    lastName: lastName
});
var tab2 = Titanium.UI.createTab({  
    icon:'images/common/pie-chart.png',
    title:'Usage',
    window:win2
});

//
// create controls tab and root window
//

//bills window
var win3 = Titanium.UI.createWindow({  
    title:'Bills',
    backgroundColor:'#fff',
    url: 'ui/common/bills.js',
    id:sessionID,
    firstName: firstName,
    lastName: lastName
});
var tab3 = Titanium.UI.createTab({  
    icon:'images/common/no-cash.png',
    title:'Bills',
    window:win3
});

//
// create controls tab and root window
//

//services window
var win4 = Titanium.UI.createWindow({  
    title:'Services',
    backgroundColor:'#fff',
    url: 'ui/common/servicesMenu.js',
    id:sessionID,
    firstName: firstName,
    lastName: lastName
});
var tab4 = Titanium.UI.createTab({  
    icon:'images/common/KS_nav_ui.png',
    title:'Services',
    window:win4
});

//LANGUAGE
if (lang=="pt"){
	win1.setTitle("Casa");
	tab1.setTitle("Casa");
	win2.setTitle("Uso");
	tab2.setTitle("Uso");
	win3.setTitle("notas");
	tab3.setTitle("notas");
	win4.setTitle("serviços");
	tab4.setTitle("serviços");
}
else if (lang=="fr"){
	win1.setTitle("maison");
	tab1.setTitle("maison");
	win2.setTitle("Utilisation");
	tab2.setTitle("utilisation");
	win3.setTitle("Factures");
	tab3.setTitle("Factures");
}
else
	lang = "en";
//
//  add tabs
//
Ti.App.tabGroup.addTab(tab1);  
Ti.App.tabGroup.addTab(tab2);  
Ti.App.tabGroup.addTab(tab3); 
Ti.App.tabGroup.addTab(tab4); 
// open tab group
Ti.App.tabGroup.open({
	transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});

};

// Public interface
exports.createMainWindow = createMainWindow;