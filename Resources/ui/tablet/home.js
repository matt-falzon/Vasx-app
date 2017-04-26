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

	Ti.API.info('free sms: ' + Ti.App.freeSMS);
	theme("blue");
	setDate();//for date label
	
	Ti.API.info('Your session ID is: ' + Ti.App.Session);
	Ti.API.info('Your MSISDN is: ' + Ti.App.msisdn);
	var theMonth, theDay;
	//win.backgroundColor = Ti.App.backgroundColor;
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
			left: '15%'
		});
		
		
	closeMenu(win);
	swipeWindow(win);
	
	if (lang=="pt")
		Ti.App.Language = "pt";
	else if (lang=="fr")
		Ti.App.Language = "fr";
	else
		Ti.App.Language = "en";
		
	
	var tableContent = [{title:'View my details', url: 'viewDetails.js', myId: session},{title:'Change my details', url: 'changeDetails.js'},{title:'Contact groups', url: 'contactGroups.js'}];
	
	// create table view
	var tableView = Titanium.UI.createTableView({
		data:tableContent,
		backgroundColor: 'transparent',
		scrollable: false,
		separatorColor : Ti.App.backgroundColor,
		left: '50%',
		top: 0,
		bottom: 0,
		rowHeight: 57
	});
	
	var mainView = Ti.UI.createView({
		backgroundColor: Ti.App.backgroundColor,
		top: '7%'
	});
	
	var topView = Ti.UI.createView({
		top: '1.5%%',
		backgroundColor:Ti.App.foregroundColor,
		height:'17.7%', 
	    left:'1.5%', 
	    right:'1.5%',
		//borderRadius:10
	});
	
	var middleView = Ti.UI.createView({
		top: '19.5%',
		backgroundColor:Ti.App.foregroundColor,
		bottom:'13%', 
	    left:'1.5%', 
	    right:'1.5%',
		//borderRadius:10
	});
	
	var languageView = Ti.UI.createView({
	    backgroundColor:Ti.App.foregroundColor,
		height:'10%', 
		left:'1.5%', 
		right:'1.5%',
		bottom: '1.5%',
	    //borderRadius:10
	});
	
	var enFlag = Ti.UI.createImageView({
	    image: '/images/flags/enFlag.png',
	    left: '15%',
	    height: '40%', width: '12%'
	});
	
	var ptFlag = Ti.UI.createImageView({
	    image: '/images/flags/portFlag.png',
	    right: '15%',
	    height: '40%', width: '12%'
	});
	
	var frFlag = Ti.UI.createImageView({
		image: '/images/flags/frFlag.png',
		height: '40%', width: '12%',
		
	});
	
	var headerLabel = Ti.UI.createLabel({
		color:'#000', 
		top:'25%',
		textAlign:'center', 
		height:'auto', 
		text:'Welcome ' + Ti.App.firstName + '!'
	});
	
	var myPlanLabel = Ti.UI.createLabel({
		font:{fontSize:'30sp', fontWeight:'bold'},
		text: 'My Plan: ' ,
		height:'auto',
		width:'auto',
		top: '18%',
		left: '1.5%',
		color:Ti.App.backgroundColor
	});
	
	var myPlanInfoLabel = Ti.UI.createLabel({
		font:{fontSize:'26sp'},
		text: "You are on the " + 'myPlan' + ' plan' ,
		height:'auto',
		width:'auto',
		top: '50%',
		left: '1.5%',
		color: '#5A5D5E'
	});
	
	var theDateLabel = Ti.UI.createLabel({
		font:{fontSize:'45sp'},
		text: 'Todays Date',
		height:'auto',
		width:'auto',
		top: '15%',
		left: '55%',
		right: '1.5%',
		color: '#5A5D5E',
  		textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER		
	});
	
	var dateLabel = Ti.UI.createLabel({
		font:{fontSize:'50sp', fontWeight : 'bold'},
		text: theMonth + ' ' + theDay,
		height:'auto',
		width:'auto',
		top: '40%',
		left: '55%',
		right: '1.5%',
		color: '#5A5D5E',
  		textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER		
	});
	
	var logout = Ti.UI.createButton({
	    title: "Log out",
	    style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	
	titleBar(win, 'home', Ti.App.foregroundColor, Ti.App.BackgroundColor);
	
	appLanguage();//set language
	
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

	
	function setDate(){
		var day = getDay();
		var month = getMonth();
		day=day.toString();
		var firstChar = day.slice(-1);
		var secondChar = day.charAt(0);
		Ti.API.info(secondChar);
		Ti.API.info(firstChar);
		switch(firstChar){
			case '1':
				if(secondChar = 1)
					firstChar = 'th';
				else
				firstChar = 'st';
				break;
			case '2':
				if(secondChar = 1)
					firstChar = 'th';
				else
					firstChar = 'nd';
				break;
			case '3':
				if(secondChar = 1)
					firstChar = 'th';
				else
				firstChar = 'rd';
				break;
			default:
				firstChar = 'th';
				break;
		}
		switch (month){
			case 1:
				month = 'January';
				break;
			case 2:
				month = 'February';
				break;
			case 3:
				month = 'March';
				break;
			case 4:
				month = 'April';
				break;
			case 5:
				month = 'May';
				break;
			case 6:
				month = 'June';
				break;
			case 7: 
				month = 'July';
				break;
			case 8:
				month = 'August';
				break;
			case 9: 
				month = 'September';
				break;
			case 10:
				month = 'Octobor';
				break;
			case 11:
				month = 'November';
				break;
			case 12:
				month = 'Decemter';
				break;
			default:
				month = 'January';
				
		}
		theDay = day + firstChar;
		theMonth = month;
	}
	
	//LANGUAGE
	function appLanguage(){
		if(Ti.App.Language == "pt"){
			myPlanLabel.setText("meu Plano");
			myPlanInfoLabel.setText("você é no a " + ' myplan ' + 'plano');
			headerLabel.setText("boas-vindas " + Ti.App.firstName + "!");
			tableData = [{hasDetail:true,title:'Ver meu detalhes', url: 'viewDetails.js', myId: session},{hasDetail:true,title:'Alterar meu detalhes', url: 'changeDetails.js'},{hasDetail:true,title:'grupos de contatos', url: 'contactGroups.js', id: session}];
			tableView.setData(tableData);
			//usageLanguage();
		}
		else if(Ti.App.Language == "fr"){
			myPlanLabel.setText("Mon plan");
			myPlanInfoLabel.setText("vous êtes sur la " + ' myplan ' + 'plano');
			headerLabel.setText("accueil " + Ti.App.firstName + "!");
			tableData = [{hasDetail:true,title:'Affichage de mes informations', url: 'viewDetails.js', myId: session},{hasDetail:true,title:'changer mes informations', url: 'changeDetails.js'},{hasDetail:true,title:'groupes de contact', url: 'contactGroups.js', id: session}];
			tableView.setData(tableData);	
			//usageLanguage();
		}
		else if(Ti.App.Language == "en"){
			myPlanLabel.setText("My Plan");
			myPlanInfoLabel.setText("You are on the" + ' myplan ' + 'plan');
			headerLabel.setText("Welcome " + Ti.App.firstName + "!");
			tableData = [{hasDetail:true,title:'View my details', url: 'viewDetails.js', myId: session},{hasDetail:true,title:'Change my details', url: 'changeDetails.js'},{hasDetail:true,title:'Contact groups', url: 'contactGroups.js', id: session}];
			tableView.setData(tableData);
			//usageLanguage();
		}
	}
	dataView(middleView);

	topView.add(dateLabel);
	topView.add(theDateLabel);	
	topView.add(myPlanInfoLabel);
	topView.add(myPlanLabel);
	
	mainView.add(topView);
	mainView.add(middleView);
	mainView.add(languageView);

	languageView.add(enFlag);
	languageView.add(ptFlag);
	languageView.add(frFlag);
	
	win.setLeftNavButton(logout);
	win.add(mainView);
	
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
