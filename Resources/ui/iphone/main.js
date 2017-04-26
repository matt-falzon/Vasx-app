/**
 * Indicator window with a spinner and a label
 * 
 * @param {Object} args
 */
function main(sessionID, msisdn, freesms, firstName, surname, lang) {
	//global variables
	var sid = sessionID;
	Ti.App.Session = sessionID;
	Ti.App.freeSMS = freesms;
	Ti.App.msisdn = msisdn;
	Ti.App.firstName = firstName;
	Ti.App.Language = lang;
	Ti.App.swipePosition = 0;
	
	//main window
	Ti.App.mainWin = Titanium.UI.createWindow({
		backgroundColor:'black',
		opacity: 0
	});
	
	//left side menu
	var sideMenu = Ti.UI.createView({
		left: 0,
		width: '51%',
		bottom: 0,
		backgroundColor: '#BEBBBF',
		visible: false
	});
	
	//right side menu
	var rightSideMenu = Ti.UI.createView({
		left: '60%',
		width: '40%',
		bottom: 0,
		backgroundColor: '#BEBBBF',
		visible:false
	});	
	
	//set up menu label names for users language
	if(lang == 'en')
		var tableData = [{title:'Home', url: 'ui/iphone/home'},{title:'Usage', url: 'ui/iphone/usage'},{title:'Bills', url: 'ui/iphone/bills'},{title:'Free SMS', url: 'ui/iphone/freeSMS'},{title:'Please Call Me', url: 'ui/iphone/pleaseCallMe'},{title:'My Details', url: 'ui/iphone/viewDetails'},
				{title:'Friendly Names', url: 'ui/iphone/friendlyNames'},{title:'Documents', url: 'ui/iphone/allDocuments'},{title:'Call Details', url: 'ui/iphone/callDetails'},{title:'Recharge', url: 'ui/iphone/voucherRecharge'},{title:'Password Hints', url: 'ui/iphone/passwordHints'}
				, {title:'Display Names', url: 'ui/iphone/displayNames'},{title:'Log out', url: 'logout'}];
	else if (lang == 'pt')
		var tableData = [{title:'Casa', url: 'ui/iphone/home'},{title:'Usage', url: 'ui/iphone/usage'},{title:'Notas', url: 'ui/iphone/bills'},{title:'sms grátis', url: 'ui/iphone/freeSMS'},{title:'Por favor, me chame', url: 'ui/iphone/pleaseCallMe'},{title:'Meus dados', url: 'ui/iphone/viewDetails'},
				{title:'Nomes amigáveis', url: 'ui/iphone/friendlyNames'},{title:'Documents', url: 'ui/iphone/allDocuments'},{title:'Call Details', url: 'ui/iphone/callDetails'},{title:'Recharge', url: 'ui/iphone/voucherRecharge'},{title:'Password Hints', url: 'ui/iphone/passwordHints'}
				, {title:'Display Names', url: 'ui/iphone/displayNames'},{title:'Log out', url: 'logout'}];
	else if(lang == 'fr')
		var tableData = [{title:'Home', url: 'ui/iphone/home'},{title:'Usage', url: 'ui/iphone/usage'},{title:'Notas', url: 'ui/iphone/bills'},{title:'Free SMS', url: 'ui/iphone/freeSMS'},{title:'Please Call Me', url: 'ui/iphone/pleaseCallMe'},{title:'My details', url: 'ui/iphone/viewDetails'},
				{title:'Nomes amigáveis', url: 'ui/iphone/friendlyNames'},{title:'Documents', url: 'ui/iphone/allDocuments'},{title:'Call Details', url: 'ui/iphone/callDetails'},{title:'Recharge', url: 'ui/iphone/voucherRecharge'},{title:'Password Hints', url: 'ui/iphone/passwordHints'}
				, {title:'Display Names', url: 'ui/iphone/displayNames'},{title:'Log out', url: 'logout'}];
	
	var tableContent = [];
	//image names for left side menu
	var images = ['home','usage', 'bills', 'freeSMS', 'pleaseCallMe', 'detail', 'FriendlyNames', 'documents', 'callDetails', 'recharge', 'password', 'logout'];
	var rightTableData = ['Subscriber1', 'Subscriber2', 'Subscriber3', 'Subscriber4', 'Subscriber5', 'Subscriber6', 'Subscriber7', 'Subscriber8', 'Subscriber9', 'Subscriber10', 'Subscriber11', 'Subscriber12'];

		for(var i = 0; i < tableData.length; i++){//populate data in right side menu
		
		var row = Ti.UI.createTableViewRow({
   			selectedBackgroundColor:'transparent',
    		height: '11%',
    		selectedBackgroundColor: Ti.App.foregroundColor
  		});
  		
  		var textLabel = Ti.UI.createLabel({//label
			text: rightTableData[i],
			color: 'white',
			font: { fontSize: "16pt", fontWeight : 'bold'},
  			textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
  			left: '3%'
		});
		
		var image = Ti.UI.createImageView({//image
			image:'images/tablet/sidemenu/'+images[i]+'.png',
			top: '10%',
			right: '3%',
			left: '75%',
			bottom: '20%'
		});
		
		row.add(textLabel);
		//row.add(image);
		tableContent.push(row);
	}
	
	var rightTable = Ti.UI.createTableView({
		data: tableContent,
		rowHeight: '20%',
		backgroundColor: 'transparent',
		fontColor: 'white',
		allowsSelection: true,
		showVerticalScrollIndicator: false
	});
	
	tableContent = [];
	
	for(var i = 0; i < tableData.length; i++){//populate data in left side menu
		
		var row = Ti.UI.createTableViewRow({
   			selectedBackgroundColor:'transparent',
    		height: '11%',
    		url: tableData[i].url,
    		selectedBackgroundColor: Ti.App.foregroundColor
  		});
  		
  		var textLabel = Ti.UI.createLabel({//label
			text: tableData[i].title,
			color: 'white',
			font: { fontSize: "12pt", fontWeight : 'bold'},
  			textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
  			left: '3%'
		});
		
		var image = Ti.UI.createImageView({//image
			image:'images/tablet/sidemenu/'+images[i]+'.png',
			top: '10%',
			right: '3%',
			left: '60%',
			bottom: '20%'
		});
		
		row.add(textLabel);
		row.add(image);
		tableContent.push(row);
	}
	var table = Ti.UI.createTableView({//add data to table
		data: tableContent,
		rowHeight: '20%',
		backgroundColor: 'transparent',
		fontColor: 'white',
		allowsSelection: true,
		showVerticalScrollIndicator: false
	});
	
	setTimeout(function() {//delay visibility while main view loads
    	sideMenu.setVisible(true);
    	rightSideMenu.setVisible(true);
	},400);
	
	sideMenu.add(table);
	Ti.App.mainWin.add(sideMenu);
	Ti.App.mainWin.add(rightSideMenu);
	rightSideMenu.add(rightTable);
	
	var newWin = require('ui/iphone/home');//open home window
	Ti.App.mainWin.open();
		var open = new newWin.open(0, Ti.App.Session, 'en', Ti.App.msisdn, Ti.App.firstName, surname);
		open.openWin();
		
	table.addEventListener('click', function(e){//left menu event handler
		Ti.App.swipePosition = 0;
		if(e.rowData.url == 'logout'){
			open.close();
			endSession();
	   	 	Ti.App.mainWin.close();
		}
   		else if(e.rowData.url == 'ui/iphone/home'){
	   		newWin = require(e.rowData.url);
	   		open1 = new newWin.open(15, Ti.App.Session, 'en', Ti.App.msisdn, Ti.App.firstName, surname, Ti.App.freeSMS);
	   		open1.openWin();
   			setTimeout(function() {
            	open.close(); 
            	open = open1;
        	},400);	   		
   		}
   		else if(e.rowData.url == 'ui/iphone/freeSMS'){
	   		newWin = require(e.rowData.url);
	   		open1 = new newWin.open(Ti.App.Session);
	   		open1.openWin();
   			setTimeout(function() {
            	open.close(); 
            	open = open1;
        	},400);	   		
   		}
   		else if(e.rowData.url == 'ui/iphone/bills'){  			
	   		newWin = require(e.rowData.url);
	   		open1 = new newWin.open(Ti.App.Session, Ti.App.freeSMS);
	   		open1.openWin();
   			setTimeout(function() {
            	open.close(); 
            	open = open1;
        	},400);
   		}else{
  			
   		   	newWin = require(e.rowData.url);
   			open1 = new newWin.open();	
   			open1.openWin();
   			setTimeout(function() {
            	open.close(); 
            	open = open1;
        	},400);
   		}
	});
}



// Public interface
exports.main = main;
