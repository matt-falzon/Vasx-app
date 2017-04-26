//Vol.04.00		M Falzon 	Initial revision
//flags added as well as event listeners for them
//everything now scales the same for any device
//added language detection
//Vol.05.00
//language settings now save to database 
//added view my details
//Vol.06.00
//cleaned up GUI
//added theme method
var win = Ti.UI.currentWindow;
var myTabGroup = Ti.UI.currentWindow.tabGroup;
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/webService.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/commonFunctions.js');
Ti.App.Language;
Ti.App.backgroundColor;
Ti.App.foregroundColor;
Ti.App.freeSMS = win.sms;
Ti.App.Session = win.id;
Ti.API.info('free sms: ' + Ti.App.freeSMS);
Ti.App.msisdn = win.msisdn;
theme("orange");
var myId = win.id;
Ti.API.info('Your session ID is: ' + myId);
Ti.API.info('Your MSISDN is: ' + Ti.App.msisdn);
var firstName = win.firstName;
var surname =  win.lastName;

Ti.App.msisdn = win.msisdn;

win.backgroundColor = Ti.App.backgroundColor;

var db = Ti.Database.open('local');
//db.execute('INSERT INTO user_language (msisdn, lang_code, lang_name) VALUES(?,?,?)', Ti.App.msisdn, "pt", "port");
var c = db.execute('SELECT lang_name, lang_code FROM user_language where msisdn = ?', Ti.App.msisdn);
Ti.API.info('Language: ' + c.fieldByName('lang_name'));
var lang = c.fieldByName('lang_code');
var d = db.execute('SELECT country, site_name, url FROM data where msisdn = ?', Ti.App.msisdn);
Ti.API.info('Country: ' + d.fieldByName('country'));
Ti.API.info('Site Name: ' + d.fieldByName('site_name'));
Ti.API.info('URL: ' + d.fieldByName('url'));
/*
var rows = db.execute('SELECT * FROM user_language'); //Prints out the user_language database to console
while (rows.isValidRow()){
  Ti.API.info('msisdn: ' + rows.fieldByName('msisdn') + ', lang_nane: ' + rows.fieldByName('lang_name') + ', code: ' + rows.fieldByName('lang_code') );
  rows.next();
}*/
db.close();

if (lang=="pt")
	Ti.App.Language = "pt";
else if (lang=="fr")
	Ti.App.Language = "fr";
else
	Ti.App.Language = "en";
	

var tableContent = [{hasDetail:true,title:'View my details', url: 'viewDetails.js', myId: myId},{hasDetail:true,title:'Change my details', url: 'changeDetails.js'},{hasDetail:true,title:'Contact groups', url: 'contactGroups.js'}];

// create table view
var tableView = Titanium.UI.createTableView({
	data:tableContent,
	backgroundColor: 'transparent',
	scrollable: false,
	separatorColor : Ti.App.backgroundColor
});

var mainView = Ti.UI.createView({
	backgroundColor: Ti.App.backgroundColor
});

var topView = Ti.UI.createView({
	backgroundColor: Ti.App.backgroundColor,
	height: '21%',
	top:0
});

var headerView = Ti.UI.createView({
	backgroundColor:Ti.App.foregroundColor,
	height:'70%', 
	left:'3%', 
	right:'3%',
	top: '15%',
	//borderRadius:10
	});

var middleView = Ti.UI.createView({
	top: '21%',
	backgroundColor:Ti.App.foregroundColor,
	height:'17%', 
    left:'3%', 
    right:'3%',
	//borderRadius:10
});

var bottomView = Ti.UI.createView({
	bottom: '24%',
	backgroundColor:Ti.App.foregroundColor,
	height:'35.5%', 
    left:'3%', 
    right:'3%',
	//borderRadius:10
});

var languageView = Ti.UI.createView({
    backgroundColor:Ti.App.foregroundColor,
	height:'18%', 
	left:'3%', 
	right:'3%',
	bottom: '3%',
    //borderRadius:10
});

var enFlag = Ti.UI.createImageView({
    image: '/images/flags/enFlag.png',
    left: '15%',
    height: '40%', width: '18%'
});

var ptFlag = Ti.UI.createImageView({
    image: '/images/flags/portFlag.png',
    right: '15%',
    height: '40%', width: '18%'
});

var frFlag = Ti.UI.createImageView({
	image: '/images/flags/frFlag.png',
	height: '40%', width: '18%',
	
});

var headerLabel = Ti.UI.createLabel({
	color:'#000', 
	top:'25%',
	textAlign:'center', 
	height:'auto', 
	text:'Welcome ' + firstName + '!'
});

var myPlanLabel = Ti.UI.createLabel({
	font:{fontSize:'18sp', fontWeight:'bold'},
	text: 'My Plan: ' ,
	height:'auto',
	width:'auto',
	top: '18%',
	left: '4.5%',
	color:Ti.App.backgroundColor
});

var myPlanInfoLabel = Ti.UI.createLabel({
	font:{fontSize:'14sp'},
	text: "You are on the " + 'myPlan' + ' plan' ,
	height:'auto',
	width:'auto',
	top: '50%',
	left: '4.5%',
	color: '#5A5D5E'
});


var logout = Ti.UI.createButton({
    title: "Log out",
    style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});

appLanguage();//set language

logout.addEventListener('click', function(e){
endSession();
});

tableView.addEventListener('click', function(e){
   if(e.rowData.url){
   	
   	var newWin = Ti.UI.createWindow({
   		backgroundColor: '#fff',
   		title: e.rowData.title,
   		url: e.rowData.url,
   		firstName: firstName,
   		lastName: surname,
   		myId: myId
   	});
   }
   	Ti.UI.currentTab.open(newWin);
   	
});

enFlag.addEventListener("click", function(e){
    alert("English");
    Ti.App.Language = "en";
    setLanguage(myId, Ti.App.Language, 1);
	appLanguage();
	var db = Ti.Database.open('local');
	db.execute('DELETE FROM user_language WHERE msisdn =?', Ti.App.msisdn);
	db.execute('INSERT INTO user_language (msisdn, lang_code, lang_name) VALUES(?,?,?)', Ti.App.msisdn, "en", "English");
	db.close();
});

ptFlag.addEventListener("click", function(e){
    alert("Portuguese");
	Ti.App.Language = "pt";
    setLanguage(myId, Ti.App.Language, 1);
	appLanguage();
	var db = Ti.Database.open('local');
	db.execute('DELETE FROM user_language WHERE msisdn =?', Ti.App.msisdn);
	db.execute('INSERT INTO user_language (msisdn, lang_code, lang_name) VALUES(?,?,?)', Ti.App.msisdn, "pt", "Portuguese");
	db.close();
});

frFlag.addEventListener("click", function(e){
	alert("French");
	Ti.App.Language = "fr";
	setLanguage(myId, Ti.App.Language, 1);
	appLanguage();
	var db = Ti.Database.open('local');
	db.execute('DELETE FROM user_language WHERE msisdn =?', Ti.App.msisdn);
	db.execute('INSERT INTO user_language (msisdn, lang_code, lang_name) VALUES(?,?,?)', Ti.App.msisdn, "fr", "French");
	db.close();
});


//LANGUAGE
function appLanguage(){
	if(Ti.App.Language == "pt"){
		myPlanLabel.setText("meu Plano");
		myPlanInfoLabel.setText("você é no a " + ' myplan ' + 'plano');
		headerLabel.setText("boas-vindas " + firstName + "!");
		tableData = [{hasDetail:true,title:'Ver meu detalhes', url: 'viewDetails.js', myId: myId},{hasDetail:true,title:'Alterar meu detalhes', url: 'changeDetails.js'},{hasDetail:true,title:'grupos de contatos', url: 'contactGroups.js', id: myId}];
		tableView.setData(tableData);
	}
	else if(Ti.App.Language == "fr"){
		myPlanLabel.setText("Mon plan");
		myPlanInfoLabel.setText("vous êtes sur la " + ' myplan ' + 'plano');
		headerLabel.setText("accueil " + firstName + "!");
		tableData = [{hasDetail:true,title:'Affichage de mes informations', url: 'viewDetails.js', myId: myId},{hasDetail:true,title:'changer mes informations', url: 'changeDetails.js'},{hasDetail:true,title:'groupes de contact', url: 'contactGroups.js', id: myId}];
		tableView.setData(tableData);	
	}
	else if(Ti.App.Language == "en"){
		myPlanLabel.setText("My Plan");
		myPlanInfoLabel.setText("You are on the" + ' myplan ' + 'plan');
		headerLabel.setText("Welcome " + firstName + "!");
		tableData = [{hasDetail:true,title:'View my details', url: 'viewDetails.js', myId: myId},{hasDetail:true,title:'Change my details', url: 'changeDetails.js'},{hasDetail:true,title:'Contact groups', url: 'contactGroups.js', id: myId}];
		tableView.setData(tableData);
	}
}

headerView.add(headerLabel);

middleView.add(myPlanInfoLabel);
middleView.add(myPlanLabel);
topView.add(headerView);
mainView.add(middleView);
mainView.add(bottomView);
mainView.add(languageView);
bottomView.add(tableView);

languageView.add(enFlag);
languageView.add(ptFlag);
languageView.add(frFlag);

win.setLeftNavButton(logout);
win.add(mainView);
win.add(topView);
