//Vol.06.00		M Falzon 	Initial revision
//added swipe up and swipe down top open and close keyboard
//Register connects to getNetworkInformation web service
//Register window has flags
//FirstView Component Constructor
//keychain support
//network information and msisdn stored in local db
//Vol.07.00 1/7/13 remembers users choice for remembering credentials 
function login() {
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/webService.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/commonFunctions.js');
var keychain = require('com.obscure.keychain');
Ti.Database.install('local.db', 'local');
//create object instance, a parasitic subclass of Observable
var self = Ti.UI.createView();
Ti.App.msisdn;//users msisdn
Ti.App.network;//name of users network
Ti.App.url;//network url
Ti.App.country;//country of network
Ti.App.language;//users language
getVersion();//version of admin portal

var lang = Ti.Locale.getCurrentLanguage();//gets current langauge on phone

var usernameHint, passwordHint, keychainLabelText, keychainLabelTextLeft, checkBoxLeft;//variable affected by language changes

// Load the Indictor Window module
var uie = require('libs/IndicatorWindow');

// Create an instance of an indicator window
var indicator = uie.createIndicatorWindow();

if (lang=="pt"){//changes language login screen if users phone language is one supported
	usernameHint = "número de telefone";
	passwordHint = "senha";
	keychainLabelText = "salvar minhas credenciais";
	keychainLabelTextLeft = "17%";
	checkBoxLeft = "80%";
	usernameTextField.setHintText("nome de usuário");
	passwordTextField.setHintText("senha");
}
else if (lang=="fr"){
	usernameHint = "numéro de téléphone";
	passwordHint = "passe";
	keychainLabelText = "sauver mes lettres de créance";
	keychainLabelTextLeft = "10%";
	checkBoxLeft = "83%";
	usernameTextField.setHintText("Nom d'utilisateur");
	passwordTextField.setHintText("Passe");
}
else{
	usernameHint = "Phone number";
	passwordHint = "Password";
	keychainLabelText = "Save my credentials";
	keychainLabelTextLeft = "35%";
	checkBoxLeft = "62%";
}

// Create or fetch the keychain items that store the username
// and password.
var msisdnKeychainItem = keychain.createKeychainItem('msisdn');
var passwordKeychainItem = keychain.createKeychainItem('password');

//Vas-x image
var image = Ti.UI.createImageView({
    image:'images/common/banner.png',
    top: '11%',
    height: '20%',
    width : '60%'
});

//to be the Id of the user logged in
var theId;

//connect to database
Ti.Database.install('local.db','local');
//bootstrap the database
var db = Ti.Database.open('local');
//NUKE THE DB
//db.execute('DROP TABLE IF EXISTS data');
//db.execute('DROP TABLE IF EXISTS friendly_names');
//db.execute('DROP TABLE IF EXISTS user_language');
db.execute('CREATE TABLE IF NOT EXISTS data(msisdn VARCHAR PRIMARY KEY NOT NULL, url VARCHAR NOT NULL, country VARCHAR NOT NULL, site_name VARCHAR NOT NULL, account_type VARCHAR, lang_code VARCHAR, lang_name VARCHAR)');
db.execute('CREATE TABLE IF NOT EXISTS friendly_names(uid INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, contact_id INTEGER NOT NULL, msisdn VARCHAR, user_msisdn VARCHAR)');
db.execute('CREATE TABLE IF NOT EXISTS user_language(uid INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, msisdn VARCHAR, lang_code VARCHAR, lang_name VARCHAR)');
var e = db.execute('SELECT * FROM user_language');
while(e.isValidRow()){
	Ti.API.info('msisdn: ' + e.fieldByName('msisdn') + ' lang: ' + e.fieldByName('lang_code'));
	e.next();
}
db.close();



var forgotPasswordLabel = Ti.UI.createLabel({
	text: "Forgot password",
	color: "teal",
	font:{fontSize:'20sp'},
	top: '82%'
});
//username log in
var usernameTextField = Ti.UI.createTextField({
	hintText: usernameHint,
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	color: '#336699',
	top: '44%', 
	width: '30%', height: '5%',
	autocapitalization: 0,
	autocorrect: false,
	value: msisdnKeychainItem.valueData	
});

//password text field for log in
var passwordTextField = Ti.UI.createTextField({
	hintText: passwordHint,
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	color: '#336699',
    top: '50%', 
    width: '30%', height: '5%',
	passwordMask:true,
	value: passwordKeychainItem.valueData
});
//checkbox to save login details to keychain
var check_box = Ti.UI.createView({
    backgroundImage:'images/common/checkbox.png',
    width:'4%',
    height:'3%',
    top: '68%',
    left: checkBoxLeft
});

//keychain label
var keychainLabel = Ti.UI.createLabel({
	text: keychainLabelText,
	top: '67%',
	left: keychainLabelTextLeft,
	height: '5%',
  	font:{fontSize:'22sp'},
});

//button used to execute login method
var loginButton = Ti.UI.createImageView({
	image:'images/common/loginButton.png',
	top: '60%',
	width: '30%',
	height: '5%'
});

//register button 
var registerButton = Ti.UI.createImageView({
image:'images/common/registerButton.png',
    top: '75%',
    width: '30%',
    height: '5%'
});

checkBoxOnLoad();   

function authenticateUser(msisdn, lang, password, vn){//checks the username and password entered with the authenticateUser web service
	var client = Ti.Network.createHTTPClient();
	Ti.App.Language = lang;
	var params = [{MSISDN: msisdn, LanguageCode: lang, Password: password, VirtualNetwork: 1}];
	var xml = generateXML("http://service.adminportal.vasx.com/", 'authenticateUser', params);
  
	client.open('POST', 'http://192.168.20.3:12080/vx_adminportal/AdminPortal');
	client.setRequestHeader("Content-Type", 'text/xml');
	client.setRequestHeader('Content-Length', xml.length);
	client.setRequestHeader('SOAPAction', '"authenticateUser"');
	client.send(xml);

	client.onload = function() {
    	var doc = client.responseXML.documentElement.getElementsByTagName("authenticateUserResponse");//parsing xml response
		Ti.API.info(doc.item(0).text);
		var xml_doc = Ti.XML.parseString(doc.item(0).text);
		var message = xml_doc.getElementsByTagName('Message');
		var sessionID = xml_doc.getElementsByTagName('SessionID');
		var code = xml_doc.getElementsByTagName('Code');
		var passwordExpired = xml_doc.getElementsByTagName('PasswordExpired');
		var masterUser = xml_doc.getElementsByTagName('MasterUser');
		var firstName = xml_doc.getElementsByTagName('FirstName');
		var lastName = xml_doc.getElementsByTagName('LastName');
		var freesms = xml_doc.getElementsByTagName('AvailableSMS');
			if(code.item(0).text == "AP-Success"){
				if(check_box.getBackgroundImage() == 'images/common/checkbox-checked.png'){//if the checkbox is checked save password
    			msisdnKeychainItem.valueData = usernameTextField.getValue();
    			passwordKeychainItem.valueData = passwordTextField.getValue();
    		}
 			else{//otherwise forget it
 				msisdnKeychainItem.valueData = "";
    			passwordKeychainItem.valueData = "";
 			}
 			var ui = require('ui/common/ui');
 			setTimeout(function() {
            	indicator.closeIndicator();
            	Ti.App.mainWin.setOpacity(1);
        	},1500);
	        	var reg = require('ui/tablet/main');
	        	var regWin = reg.main(sessionID.item(0).text, usernameTextField.getValue(), freesms.item(0).text, firstName.item(0).text, lastName.item(0).text, lang);
			}
			else{
				alert(message.item(0).text);
				indicator.closeIndicator();
			}
    	//manually parse the SOAP XML document
	};
};

function getNetworkInformation(){//gets information on all networks
	
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
	        //Ti.API.info(results.item(i).text + " <- results item " +i);
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
	        	var reg = require('ui/common/register');
	        	var regWin = reg.registerWindow(tableInfo);
				indicator.closeIndicator();
				
	        } else {//if web service doesnt return anything
				tableInfo.push({country: "Network ERROR", network: "", url: ""});//probably if the user is not connected to the internet
				var reg = require('ui/common/register');
				indicator.closeIndicator();
	        	var regWin = reg.registerWindow(tableInfo);
	        }

	    };
	
}

//add everything to view
	
self.add(usernameTextField);
self.add(passwordTextField);
self.add(loginButton);
self.add(image);
self.add(registerButton);
self.add(check_box);
self.add(keychainLabel);

self.add(forgotPasswordLabel);
//event listeners


loginButton.addEventListener('click',function(e){
	indicator.openIndicator();
	var db = Ti.Database.open('local');
	var c = db.execute('SELECT lang_name, lang_code FROM user_language where msisdn = ?', usernameTextField.getValue());
	if(c.isValidRow()){
	var savedLang = c.fieldByName('lang_code');
	db.close();
	Ti.API.info('saved lang: ' + savedLang);
	}else
		var savedLang = '';
	if(savedLang.length > 0){
		if(savedLang == 'au')
			savedLang = 'en';
				authenticateUser(usernameTextField.value.toString(), savedLang, passwordTextField.value.toString(), 1);
	}else
		authenticateUser(usernameTextField.value.toString(), 'en', passwordTextField.value.toString(), 1);
});
	
registerButton.addEventListener('click',function(e){
	getNetworkInformation();
});
	
image.addEventListener('click',function(e){
	usernameTextField.blur();
	passwordTextField.blur();	
});

keychainLabel.addEventListener('click',function(){//check and uncheck the check_box
	if(check_box.getBackgroundImage() == 'images/common/checkbox.png') 
    	check_box.setBackgroundImage('images/common/checkbox-checked.png');
    else 
        check_box.setBackgroundImage('images/common/checkbox.png');
});


check_box.addEventListener('click',function(){//check and uncheck the check_box
	if(check_box.getBackgroundImage() == 'images/common/checkbox.png') 
    	check_box.setBackgroundImage('images/common/checkbox-checked.png');
    else 
        check_box.setBackgroundImage('images/common/checkbox.png');
});

usernameTextField.addEventListener('click', function(){
	usernameTextField.blur();
	passwordTextField.blur();
	usernameTextField.keyboardType = Titanium.UI.KEYBOARD_PHONE_PAD;
	usernameTextField.focus();
});


forgotPasswordLabel.addEventListener('click', function(e){
 	var forgot = require('ui/common/forgotPassword');
	var forgotPasswordWindow = forgot.forgotPassword();
});
  

function checkBoxOnLoad(){//if the user previously had check box checked , will be checked next time app is loaded
	if(usernameTextField.value.length > 0 && passwordTextField.value.length > 0)
		check_box.setBackgroundImage('images/common/checkbox-checked.png');
};

  
//swipe down to close keyboard, swipe up to open again
self.addEventListener("swipe", function(e){
    if (e.direction == 'down')
        usernameTextField.blur();
    else if (e.direction == 'up'){
        usernameTextField.focus();
    }
});
        
	return self;
	
};

module.exports = login;
