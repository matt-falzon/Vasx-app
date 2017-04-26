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

function open(left, session, lang, msisdn, firstName, surname, freesms){
	Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/webService.js');
	Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/commonFunctions.js');
	Ti.include(Titanium.Filesystem.resourcesDirectory+'/ui/tablet/ApplicationWindow.js');
	Ti.include(Titanium.Filesystem.resourcesDirectory+'/ui/tablet/usageView.js');
	Ti.App.backgroundColor;
	Ti.App.foregroundColor;

	Ti.API.info('Free SMS: ' + Ti.App.freeSMS);
	theme("white");
	
	Ti.API.info('Your session ID is: ' + Ti.App.Session);
	Ti.API.info('Your MSISDN is: ' + Ti.App.msisdn);

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
	if(left == 0)
		var win = Titanium.UI.createWindow({
			backgroundColor:'pink',
			left: left+'%'
		});
	else
		var win = Titanium.UI.createWindow({
			backgroundColor:'pink',
			left: '51%'
		});
		
	if (lang=="pt")
		Ti.App.Language = "pt";
	else if (lang=="fr")
		Ti.App.Language = "fr";
	else
		Ti.App.Language = "en";
		
/*	
var tableContent = [{title:'View my details', url: 'viewDetails.js', myId: session},{title:'Change my details', url: 'changeDetails.js'},{title:'Contact groups', url: 'contactGroups.js'}];
	
// create table view
var tableView = Titanium.UI.createTableView({
	data:tableContent,
	backgroundColor: 'transparent',
	scrollable: false,
	separatorColor : Ti.App.backgroundColor
});*/

var theScrollView = Ti.UI.createScrollView({
	backgroundColor: Ti.App.backgroundColor,
	top: 0,
	horizontalBounce: false,
	horizontalWrap: false,
	//opacity: 0
});

var mainView = Ti.UI.createView({
	height: '100.5%',//there has to be a better way to do this :S,
	backgroundImage: Titanium.Filesystem.resourcesDirectory+'/images/common/background.png'
});

var updateView = Ti.UI.createView({//view appears when user drags down
	height: '70%',
	top:'-70%',
	backgroundColor: '#BDDBDB'
});


var activityIndicator = Ti.UI.createActivityIndicator({//activity indicator for update view
  color: 'white',
  font: {fontFamily:'Helvetica Neue', fontSize:26, fontWeight:'bold'},
  message: 'Updating...',
  style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
  bottom:10,
});
activityIndicator.show();

//add views
var headerWrapper = Ti.UI.createView({
	backgrondColor: 'transparent',
	height:'15%', 
	left:'3%', 
	right:'3%',
	top: '3%',
});
var headerView = Ti.UI.createView({
	backgroundColor: 'white',
	opacity: .4
	//borderRadius:10
	});

var middleViewWrapper = Ti.UI.createView({
	top: '21%',
	backgroundColor:'transparent',
	height:'24.5%', 
    left:'3%', 
    right:'3%',
	//borderRadius:10
});

var middleView = Ti.UI.createView({
	backgroundColor: 'white',
	opacity: .4
	//borderRadius:10
	});

var bottomViewWrapper = Ti.UI.createView({
	bottom: '23.5%',
	backgroundColor:'transparent',
	height:'28.5%', 
    left:'3%', 
    right:'3%',
	//borderRadius:10
});

var bottomView = Ti.UI.createView({
	backgroundColor: 'white',
	opacity: .4
	//borderRadius:10
	});


var languageViewWrapper = Ti.UI.createView({
    backgroundColor:'transparent',
	height:'18%', 
	left:'3%', 
	right:'3%',
	bottom: '3%',
    //borderRadius:10
});

var languageView = Ti.UI.createView({
	backgroundColor: 'white',
	opacity: .4
	//borderRadius:10
	});

//flag images
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
	height: '40%', width: '18%'
});

var headerLabel = Ti.UI.createLabel({
	color:'#000', 
	top:'25%',
	textAlign:'center', 
	height:'auto', 
	text:'Welcome ' + firstName + '!',
	opacity: 1
});

var myPlanLabel = Ti.UI.createLabel({
	font:{fontSize:'18sp', fontWeight:'bold'},
	text: 'My Plan: ' ,
	height:'auto',
	width:'auto',
	top: '18%',
	left: '4.5%',
	color:Ti.App.foregroundColor
});

var myPlanInfoLabel = Ti.UI.createLabel({
	font:{fontSize:'14sp'},
	text: "You are on the " + 'myPlan' + ' plan' ,
	height:'auto',
	width:'auto',
	top: '50%',
	left: '4.5%',
	color: 'black'
});


var logout = Ti.UI.createButton({
    title: "Log out",
    style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});

appLanguage();//set language

logout.addEventListener('click', function(e){
endSession();
});

//flag event listeners
enFlag.addEventListener("click", function(e){
    alert("English");
    Ti.App.Language = "en";
    setLanguage(Ti.App.Session, Ti.App.Language, 1);
	appLanguage();
	var db = Ti.Database.open('local');
	db.execute('DELETE FROM user_language WHERE msisdn =?', Ti.App.msisdn);
	db.execute('INSERT INTO user_language (msisdn, lang_code, lang_name) VALUES(?,?,?)', Ti.App.msisdn, "en", "English");
	db.close();
});

ptFlag.addEventListener("click", function(e){
    alert("Portuguese");
	Ti.App.Language = "pt";
    setLanguage(Ti.App.Session, Ti.App.Language, 1);
	appLanguage();
	var db = Ti.Database.open('local');
	db.execute('DELETE FROM user_language WHERE msisdn =?', Ti.App.msisdn);
	db.execute('INSERT INTO user_language (msisdn, lang_code, lang_name) VALUES(?,?,?)', Ti.App.msisdn, "pt", "Portuguese");
	db.close();
});

frFlag.addEventListener("click", function(e){
	alert("French");
	Ti.App.Language = "fr";
	setLanguage(Ti.App.Session, Ti.App.Language, 1);
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
		tableData = [{hasDetail:true,title:'Ver meu detalhes', url: 'viewDetails.js', myId: session},{hasDetail:true,title:'Alterar meu detalhes', url: 'changeDetails.js'},{hasDetail:true,title:'grupos de contatos', url: 'contactGroups.js', id: session}];
		//tableView.setData(tableData);
	}
	else if(Ti.App.Language == "fr"){
		myPlanLabel.setText("Mon plan");
		myPlanInfoLabel.setText("vous êtes sur la " + ' myplan ' + 'plano');
		headerLabel.setText("accueil " + firstName + "!");
		tableData = [{hasDetail:true,title:'Affichage de mes informations', url: 'viewDetails.js', myId: session},{hasDetail:true,title:'changer mes informations', url: 'changeDetails.js'},{hasDetail:true,title:'groupes de contact', url: 'contactGroups.js', id: session}];
		//tableView.setData(tableData);	
	}
	else if(Ti.App.Language == "en"){
		myPlanLabel.setText("My Plan");
		myPlanInfoLabel.setText("You are on the" + ' myplan ' + 'plan');
		headerLabel.setText("Welcome " + firstName + "!");
		tableData = [{hasDetail:true,title:'View my details', url: 'viewDetails.js', myId: session},{hasDetail:true,title:'Change my details', url: 'changeDetails.js'},{hasDetail:true,title:'Contact groups', url: 'contactGroups.js', id: session}];
		//tableView.setData(tableData);
	}
}
mainView.add(headerWrapper);
mainView.add(middleViewWrapper);
mainView.add(bottomViewWrapper);
mainView.add(languageViewWrapper);

headerWrapper.add(headerView);
middleViewWrapper.add(middleView);
bottomViewWrapper.add(bottomView);
languageViewWrapper.add(languageView);

closeMenu(win);
phoneSwipeWindow(win);
updateSwipe(theScrollView);
headerWrapper.add(headerLabel);

middleViewWrapper.add(myPlanInfoLabel);
middleViewWrapper.add(myPlanLabel);



theScrollView.add(mainView);
//bottomViewWrapper.add(tableView);

languageViewWrapper.add(enFlag);
languageViewWrapper.add(ptFlag);
languageViewWrapper.add(frFlag);

win.setLeftNavButton(logout);
win.add(theScrollView);
theScrollView.add(updateView);
updateView.add(activityIndicator);
	
function openWin(){
	if(left == 0)
		win.open({transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
	else
		win.open();
}
win.openWin = openWin;	

function close(){
	win.close();
	dataView.close();
}
win.close = close;
	
return win;
}
exports.open = open;
