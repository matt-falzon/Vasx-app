/**
 * Indicator window with a spinner and a label
 * 
 * @param {Object} args
 */
function main(sessionID, msisdn, freesms, firstName, surname, lang) {
	var sid = sessionID;
	Ti.App.Session = sessionID;
	Ti.App.freeSMS = freesms;
	Ti.App.msisdn = msisdn;
	Ti.App.firstName = firstName;
	var msisdn = msisdn;
	var freeSMS = freesms;
	var firstName = firstName;
	var lastName = surname;
	var newWin, open;
	Ti.App.Language = lang;
	
	Ti.API.info('free SMS: ' + Ti.App.freeSMS);
	
	Ti.App.mainWin = Titanium.UI.createWindow({
		backgroundColor:'black',
		opacity: 0
	});
	
	var sideMenu = Ti.UI.createView({
		left: 0,
		width: '15%',
		bottom: 0,
		backgroundColor: '#BEBBBF'
	});
	
	if(lang == 'en')
		var tableData = [{title:'Home', url: 'ui/tablet/home'},{title:'Bills', url: 'ui/tablet/bills'},{title:'Free SMS', url: 'ui/tablet/freeSMS'},{title:'Please Call Me', url: 'ui/tablet/pleaseCallMe'},{title:'My details', url: 'ui/tablet/viewDetails'},
				{title:'Friendly Names', url: 'ui/tablet/friendlyNames'},{title:'Documents', url: 'ui/tablet/documentList'},{title:'Call Details', url: 'ui/tablet/callDetails'},{title:'blank'},{title:'blank'},{title:'blank'}];
	else if (lang == 'pt')
		var tableData = [{title:'Casa', url: 'ui/tablet/home'},{title:'Notas', url: 'ui/tablet/bills'},{title:'sms grátis', url: 'ui/tablet/freeSMS'},{title:'Por favor, me chame', url: 'ui/tablet/pleaseCallMe'},{title:'Meus dados', url: 'ui/tablet/viewDetails'},
				{title:'Nomes amigáveis', url: 'ui/tablet/friendlyNames'},{title:'em branco'},{title:'em branco'},{title:'em branco'},{title:'em branco'},{title:'em branco'}];
	else if(lang == 'fr')
		var tableData = [{title:'Home', url: 'ui/tablet/home'},{title:'Notas', url: 'ui/tablet/bills'},{title:'Free SMS', url: 'ui/tablet/freeSMS'},{title:'Please Call Me', url: 'ui/tablet/pleaseCallMe'},{title:'My details', url: 'ui/tablet/viewDetails'},
				{title:'Nomes amigáveis', url: 'ui/tablet/friendlyNames'},{title:'blank'},{title:'blank'},{title:'blank'},{title:'blank'},{title:'blank'},{title:'blank'}];
	
	var tableContent = [];
	var images = ['home', 'bills', 'freeSMS', 'pleaseCallMe', 'detail', 'FriendlyNames', 'documents', 'callDetails'];
		
	for(var i = 0; i < tableData.length; i++){
		
		var row = Ti.UI.createTableViewRow({
   			selectedBackgroundColor:'transparent',
    		height: '11%',
    		url: tableData[i].url,
    		selectedBackgroundColor: Ti.App.foregroundColor
  		});
  		
  		var textLabel = Ti.UI.createLabel({
			text: tableData[i].title,
			color: 'white',
			font: { fontSize: "16pt", fontWeight : 'bold'},
  			textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
  			bottom: '5%'
		});
		
		var image = Ti.UI.createImageView({
			image:'images/tablet/sidemenu/'+images[i]+'.png',
			top: '10%',
			left: '20%',
			right: '20%',
			bottom: '20%'
		});
		
		row.add(textLabel);
		row.add(image);
		tableContent.push(row);
	}
	var table = Ti.UI.createTableView({
		data: tableContent,
		rowHeight: '20%',
		backgroundColor: 'transparent',
		fontColor: 'white',
		allowsSelection: true,
		showVerticalScrollIndicator: false
	});
	
	sideMenu.add(table);
	Ti.App.mainWin.add(sideMenu);
	
	var newWin = require('ui/tablet/home');
	Ti.App.mainWin.open();
		var open = new newWin.open(0, Ti.App.Session, 'en', Ti.App.msisdn, Ti.App.firstName);
		open.openWin();
		
	table.addEventListener('click', function(e){
   		if(e.rowData.url == 'ui/tablet/home'){
   			open.close();
	   		newWin = require(e.rowData.url);
	   		open = new newWin.open(15, Ti.App.Session, 'en', Ti.App.msisdn, Ti.App.firstName, lastName, Ti.App.freeSMS);
	   		open.openWin();
   		}
   		else if(e.rowData.url == 'ui/tablet/freeSMS'){
   			open.close();
	   		newWin = require(e.rowData.url);
	   		open = new newWin.open(Ti.App.Session);
	   		open.openWin();
   		}
   		else if(e.rowData.url == 'ui/tablet/bills'){
   			open.close();   			
	   		newWin = require(e.rowData.url);
	   		open = new newWin.open(Ti.App.Session, Ti.App.freeSMS);
	   		open.openWin();
   		}else{
   			open.close();   			
   		   	newWin = require(e.rowData.url);
   			open = new newWin.open();	
   			open.openWin();
   		}
   		
   	
	});
}



// Public interface
exports.main = main;
