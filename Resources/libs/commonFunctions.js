//Vol.01.00		M Falzon 	Initial revision
//added theme function to control color scheme of app
Ti.include('webService.js');

var	details = [];

function theme(colour){
	if(colour == "green"){
		Ti.App.backgroundColor = '#50C223';
		Ti.App.foregroundColor = '#96CF80';
	}
	if(colour == "orange"){
		Ti.App.backgroundColor = '#FF8000';
		Ti.App.foregroundColor = '#F2AE6B';
	}
	if(colour == "red"){
		Ti.App.backgroundColor = '#F70505';
		Ti.App.foregroundColor = '#F5A9A9';
	}
	if(colour == 'blue'){
		Ti.App.backgroundColor = '#1BA5E0';
		Ti.App.foregroundColor = '#BDDBDB';		
	}
	if(colour == 'white'){
		Ti.App.backgroundColor = '#BDDBDB';
		Ti.App.foregroundColor = 'white';		
	}
}
function newUser(msisdn){
	alert('As this is the first time you have logged in on this phone you will need to register');
	Ti.API.info('\n \n \n new user \n \n \n ');

	
	var client = Ti.Network.createHTTPClient();

	client.onerror = function(){
	        Ti.API.error(this.status + ' - ' + this.statusText);
	};
	var params;
	var xml = generateXML("http://ws.proxy.mobile.vasx.com/", 'getNetworkInformation', params);
	  
	client.open('POST', 'http://192.168.20.3:12080/mobile-proxy/MobileProxyService');
	client.setRequestHeader("Content-Type", 'text/xml');
	client.setRequestHeader('Content-Length', xml.length);
	client.setRequestHeader('SOAPAction', '"getNetworkInformation"');
	client.send(xml);
	
	client.onload = function() {
	        var results = client.responseXML.documentElement.getElementsByTagName('getNetworkInformationResponse');//parse xml response
	        var languageInfo = [];
	        var tableInfo = [];
	        if (results && results.length>0) {
	        	var xml_doc = Ti.XML.parseString(results.item(0).text);
	    		var xml_country = xml_doc.getElementsByTagName('Country');//get countryname tag element
	        	var xml_siteName = xml_doc.getElementsByTagName('SiteName');//get site name tag element
	        	var xml_siteUrl = xml_doc.getElementsByTagName('SiteURL');//get site url tag element
	        	var xml_languages = xml_doc.getElementsByTagName('Languages');
	        	var xml_vnUID = xml_doc.getElementsByTagName('vnUID');
	        	var xml_name = xml_doc.getElementsByTagName('Name');
	        	var xml_code = xml_doc.getElementsByTagName('Code');
	        	var xml_default = xml_doc.getElementsByTagName('Default');


	        	for (var i=0; i < xml_country.length; i++){ //iterate through results
	        		for(var j = 0; j < xml_languages.item(i).getElementsByTagName("Name").length; j++){//iterate through the length of language elements
	        			var name = xml_languages.item(i).getElementsByTagName("Name").item(j).text;
	        			var code = xml_languages.item(i).getElementsByTagName("Code").item(j).text;
	        			var def = xml_languages.item(i).getElementsByTagName("Default").item(j).text;
	        			languageInfo.push({name: name, code: code, def: def});//push name code and default to array
	        		}	
	        		tableInfo.push({country: xml_country.item(i).text, 
	        						network: xml_siteName.item(i).text, 
	        						url: xml_siteUrl.item(i).text, 
	        						language: languageInfo,
	        						vnUID: xml_vnUID.item(i).text
	        						});
	        		languageInfo = [];//clear array
	        	}
	        	var reg = require('ui/common/registerUser');
	        	var regWin = reg.registerUser(tableInfo, msisdn);
				
	        } else {//if web service doesnt return anything
				tableInfo.push({country: "Network ERROR", network: "", url: ""});//probably if the user is not connected to the internet
	        	var reg = require('ui/common/registerUser');
	        	var regWin = reg.registerUser(tableInfo, msisdn);
	        }

	    };
	

}

//returns the list of contacts in an array of strings
function getContacts (){//I have no idea how i eventually got this to work
	var contacts = [{name:" ", msisdn: ""}];
	var singleValue = ['fullName', 'recordId'];
	var multiValue = ['phone'];
	var people = Ti.Contacts.getAllPeople();
	Ti.API.info('Total contacts: ' + people.length);
	Ti.API.info('---------------------');
	for (var i=0, ilen=people.length; i<ilen; i++){
		var person = people[i];
		for (var j=0, jlen=singleValue.length; j<jlen; j++){
	  	}
		for (var j=0, jlen=multiValue.length; j<jlen; j++){
		    var msisdn = JSON.stringify(person[multiValue[j]]);
		    msisdn = msisdn.replace(/\D/g,'');
		    contacts.push({name: person[singleValue[j]], msisdn: msisdn, id: person[singleValue[j+1]]});
	  	}
	}
	Ti.App.checks = 0;
	var theContacts = [];
	for(var i = 1; i < contacts.length; i++){
		theContacts.push({title:contacts[i].name, msisdn: contacts[i].msisdn, id: contacts[i].id});
		Ti.API.info("name: " + contacts[i].name + " msisdn: " + contacts[i].msisdn + "id: " + contacts[i].id);
	}
	return theContacts;
};

function endSession(){
disconnectSession(Ti.App.Session, Ti.App.Language, 1);
}

function updateSwipe(win){
	win.addEventListener("dragEnd", function(e){
			Ti.API.info('update');
			//alert('update');
	});
};

function swipeWindow(win){//swipe to open and close side menu
win.addEventListener("swipe", function(e){
	if (e.direction == 'right'){
	    var transform = Ti.UI.create2DMatrix();
   		transform = transform.scale(1);
    	win.animate({
        	transform : transform,
        	duration : 500,
        	left: '15%'
   		 });
	};
	if (e.direction == 'left'){
	    var transform = Ti.UI.create2DMatrix();
   		transform = transform.scale(1);
    	win.animate({
        	transform : transform,
        	duration : 500,
        	left: 0
   		 });
	};

});
}
function phoneSwipeWindowNoMaster(win){//swipe to open and close side menu
win.addEventListener("swipe", function(e){
	if (e.direction == 'right'){
		if(Ti.App.swipePosition == 40){
		    var transform = Ti.UI.create2DMatrix();
	   		transform = transform.scale(1);
	    	win.animate({
	        	transform : transform,
	        	duration : 500,
	        	right: 0
	   		 });
	   		 Ti.App.swipePosition = 0;			
		}
		else if(Ti.App.swipePosition == 0){		
		    var transform = Ti.UI.create2DMatrix();
	   		transform = transform.scale(1);
	    	win.animate({
	        	transform : transform,
	        	duration : 500,
	        	left: '51%'
	   		 });
	   		 Ti.App.swipePosition = 60;
   		}
	};
	
	if (e.direction == 'left'){
		if(Ti.App.swipePosition == 60){
		    var transform = Ti.UI.create2DMatrix();
	   		transform = transform.scale(1);
	    	win.animate({
	        	transform : transform,
	        	duration : 500,
	        	left: 0
	   		 });
	   		 Ti.App.swipePosition = 0;
   		}
	};


});
}

function phoneSwipeWindow(win){//swipe to open and close side menu
win.addEventListener("swipe", function(e){
	if (e.direction == 'right'){
		if(Ti.App.swipePosition == 40){
		    var transform = Ti.UI.create2DMatrix();
	   		transform = transform.scale(1);
	    	win.animate({
	        	transform : transform,
	        	duration : 500,
	        	right: 0
	   		 });
	   		 Ti.App.swipePosition = 0;			
		}
		else if(Ti.App.swipePosition == 0){		
		    var transform = Ti.UI.create2DMatrix();
	   		transform = transform.scale(1);
	    	win.animate({
	        	transform : transform,
	        	duration : 500,
	        	left: '51%'
	   		 });
	   		 Ti.App.swipePosition = 60;
   		}
	};
	
	if (e.direction == 'left'){
		if(Ti.App.swipePosition == 0){
		    var transform = Ti.UI.create2DMatrix();
	   		transform = transform.scale(1);
	    	win.animate({
	        	transform : transform,
	        	duration : 500,
	        	right: '40%'
	   		 });	
	   		 Ti.App.swipePosition = 40;		
		}
		else if(Ti.App.swipePosition == 60){
	    var transform = Ti.UI.create2DMatrix();
   		transform = transform.scale(1);
    	win.animate({
        	transform : transform,
        	duration : 500,
        	left: 0
   		 });
   		 Ti.App.swipePosition = 0;
   		}
	};


});
}

function tableSwipeWindow(win){//swipe to open and close side menu
win.addEventListener("swipe", function(e){
	if (e.direction == 'right'){
	    var transform = Ti.UI.create2DMatrix();
   		transform = transform.scale(1);
    	win.animate({
        	transform : transform,
        	duration : 500,
        	left: '100%'
   		 });
    setTimeout(function() {
		 win.close();
	},550);
   		
	};
});
}

function closeMenu(win){
    var transform = Ti.UI.create2DMatrix();
	transform = transform.scale(1);
	win.animate({
    	transform : transform,
    	duration : 500,
    	left: 0
	 });	
}

function closeWin(win){
	win.close();
}

function getMonth() {//returns the current month

	var currentTime = new Date();
	var month = currentTime.getMonth() + 1;
	
	return month;
 
}

function getDay() {//returns the current day
	
	var currentTime = new Date();
	var day = currentTime.getDate();
	 
	return day;
 
}

function getYear() {//returns the current year
	
	var currentTime = new Date();
	var year = currentTime.getFullYear();
	 
	return year;
 
}

function titleBar(theView, title, barColor, fontColor){
	barView = Ti.UI.createView({
		top: 0,
		height: '7%',
		backgroundColor: barColor
	});
	
	var title = Ti.UI.createLabel({
		text: title,
		font:{fontSize:'26sp', fontWeight : 'bold'},
		color: fontColor
	});
	
	var logoutButton = Ti.UI.createButton({
		title: 'Log out',
		color: barColor,
		backgroundColor: fontColor,
		left: '2%',
		top: '20%',
		bottom: '20%',
		borderWidth: 0,
		borderRadius: 10
	});
	
	logoutButton.addEventListener('click', function(e){
		closeWin(theView);
		endSession();
	    Ti.App.mainWin.close();
	});
	
	barView.add(logoutButton);
	barView.add(title);
	theView.add(barView);
}

function titleBarSave(theView, title, barColor, fontColor){
	barView = Ti.UI.createView({
		top: 0,
		height: '7%',
		backgroundColor: barColor
	});
	
	var title = Ti.UI.createLabel({
		text: title,
		font:{fontSize:'26sp', fontWeight : 'bold'},
		color: fontColor
	});
	
	var logoutButton = Ti.UI.createButton({
		title: 'Log out',
		color: barColor,
		backgroundColor: fontColor,
		left: '2%',
		top: '20%',
		bottom: '20%',
		borderWidth: 0,
		borderRadius: 10
	});
	
	var saveButton = Ti.UI.createButton({
		title: 'Save',
		color: barColor,
		backgroundColor: fontColor,
		right: '2%',
		top: '20%',
		bottom: '20%',
		borderWidth: 0,
		borderRadius: 10
	});
	var theDetails = getSecretQuestionDetails();
	saveButton.addEventListener('click', function(e){
		setPasswordHints(Ti.App.Session, Ti.App.Language, details[0], details[1], details[2], details[3], details[4], details[5], details[6]);
	});
	
	logoutButton.addEventListener('click', function(e){
		closeWin(theView);
		endSession();
	    Ti.App.mainWin.close();
	});
	
	barView.add(logoutButton);
	barView.add(title);
	barView.add(saveButton);
	theView.add(barView);
}




function setPasswordHints(id, lang, vn){
var values = getHints();
var client = Ti.Network.createHTTPClient();
var vn = 1;
client.onerror = function(){
        Ti.API.error(this.status + ' - ' + this.statusText);
};
var parameters = [{SessionID: id, LanguageCode: lang, QuestionCode1: values[0], Answer1: values[1], QuestionCode2: values[2], Answer2: values[3], QuestionCode3: values[4], Answer3: values[5], VirtualNetwork: vn}];

var xml = generateXML("http://service.adminportal.vasx.com/", 'setPasswordHints', parameters);

client.open('POST', 'http://192.168.20.3:12080/vx_adminportal/AdminPortal');
client.setRequestHeader("Content-Type", 'text/xml');
client.setRequestHeader('Content-Length', xml.length);
client.setRequestHeader('SOAPAction', '"setPasswordHints"');
client.send(xml);

client.onload = function() {
    var results = client.responseXML.documentElement.getElementsByTagName("setPasswordHintsResponse");
	if (results && results.length>0) {
		Ti.API.info(results.item(0).text);
		var xml_doc = Ti.XML.parseString(results.item(0).text);
		alert(xml_doc.getElementsByTagName("Message").item(0).text);

	}
    //manually parse the SOAP XML document
};
	  	
};  
