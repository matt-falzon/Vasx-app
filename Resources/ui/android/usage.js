//Vol.04.00		M Falzon 	Initial revision
//added custom bars
//graphs are now automatic
//configured for every resolution
//Vol.05.00 language now updates without restarting app, usage statistics now update without restarting app
//Handset upgrade changed to free sms
function open(){
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/webService.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/commonFunctions.js');

var win = Titanium.UI.createWindow({
	backgroundColor:'pink',
	left: '51%'
});
theme("white");

var theScrollView = Ti.UI.createScrollView({
	backgroundColor: Ti.App.backgroundColor,
	top: 0,
	horizontalBounce: false,
	horizontalWrap: false
});

var mainView = Ti.UI.createView({
	height: '100.5%',//there has to be a better way to do this :S
	backgroundImage: Titanium.Filesystem.resourcesDirectory+'/images/common/background.png'
});

var updateView = Ti.UI.createView({
	height: '70%',
	top:'-70%',
	backgroundColor: '#2A5DA8'
});


var activityIndicator = Ti.UI.createActivityIndicator({
  color: 'white',
  font: {fontFamily:'Helvetica Neue', fontSize:26, fontWeight:'bold'},
  message: 'Updating...',
  style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
  bottom:10,
});
activityIndicator.show();

function usageLanguage(){//language settings
	if (Ti.App.Language=="pt"){
		callsLabel.setText("chamadas ");
		dataLabel.setText("dados ");
		timeLabel.setText("tempo de sobra ");
		freeSMSLabel.setText("sms grátis utilizados ");
	}
	else if (Ti.App.Language=="fr"){
		callsLabel.setText("appels ");
		dataLabel.setText("données ");
		timeLabel.setText("mise à niveau de téléphone ");
		freeSMSLabel.setText("SMS gratuits utilisés");
	}
	else{
		callsLabel.setText("Calls ");
		dataLabel.setText("Data ");
		timeLabel.setText("Time Left ");
		freeSMSLabel.setText("Free SMS used ");
	} 
}
var callsText, dataText, timeText, upgradeText;

var logout = Ti.UI.createButton({
    title: "Log out",
    style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});

logout.addEventListener('click', function(e){
endSession();
});

win.addEventListener('focus', function(e){
	//Sets the side of all of the bars
	setBarWidth(dataBarTop, dataBarBottom, 242, 1024);
	setBarWidth(callsBarTop, callsBarBottom, 321, 600);
	setBarWidth(timeBarTop, timeBarBottom, 27, 31);
	setBarWidth(freeSMSBarTop, freeSMSBarBottom, 5-Ti.App.freeSMS, 5);
	freeSMSUsageLabel.setText(5-Ti.App.freeSMS + "/5");
	//sets language
	usageLanguage();
});
/*
 * VIEWS
 */


//VIEWS FOR BARS
//CALLS VIEW	
var callsView = Ti.UI.createView({
	backgroundColor:Ti.App.foregroundColor,
	opacity: .4
});

var callsViewWrapper = Ti.UI.createView({
	backgroundColor: 'transparent',
	height:'22%', 
	left: '3%', 
	right:'3%',
	top: '2.5%',
	//borderRadius:10,
});

var callsBarView = Ti.UI.createView({
    height:'32%%', 
    backgroundColor:'#C6CCCC',
    left:'6%', 
    right:'6%',
    top: '35%',
    borderWidth: 1,
    borderColor: '#8C8C8C'
});

var callsBarTop = Ti.UI.createView({ 
    backgroundColor:'#FF0000',
    left: '1.5%', 
    top: '12%',
    bottom: '48%'
});

var callsBarBottom = Ti.UI.createView({
    backgroundColor:'#FF0000',
    left: '1.5%', 
    top: '49%',
    bottom: '12%'
});

callsLabel = Ti.UI.createLabel({
   text: 'Calls',
   top: '8%',
   left: '6%',
   font:{fontSize:'20sp', fontWeight:'bold', fontColor: 'white'},
   color: 'white'
});

callsUsageLabel = Ti.UI.createLabel({
    text: '321' +"/"+ '600',
    bottom: '8.5%',
    right: '4.5%',
    font:{fontSize:'18sp', fontColor: 'white'},
    color: 'white'
});

//DATA VIEW
	
var dataView = Ti.UI.createView({
	backgroundColor:Ti.App.foregroundColor,
	opacity: .4,

});

var dataViewWrapper = Ti.UI.createView({
	backgroundColor: 'transparent',
	top: '27%',
	height:'22%', 
	left:'3%', 
	right:'3%',
	//borderRadius:10
});

var dataBarView = Ti.UI.createView({
    height:'32%%', 
    backgroundColor:'#C6CCCC',
    left:'6%', 
    right:'6%',
    top: '35%',
    borderWidth: 1,
    borderColor: '#8C8C8C'
});

var dataBarTop = Ti.UI.createView({
    backgroundColor:'#FF0000',
    left: '1.5%', 
    top: '12%',
    bottom: '48%'
});

var dataBarBottom = Ti.UI.createView({
    backgroundColor:'#FF0000',
    left: '1.5%', 
    top: '49%',
    bottom: '12%'
});

var dataLabel = Ti.UI.createLabel({
   text: 'Data',
   top: '8%',
   left: '6%',
   font:{fontSize:'20sp', fontWeight:'bold', fontColor: 'white'},
   color: 'white'
});

var dataUsageLabel = Ti.UI.createLabel({
    text: '242' +"/"+ '1024',
    bottom: '7%',
    right: '4.5%',
    font:{fontSize:'18sp', fontColor: 'white'},
    color: 'white'
});

//TIME VIEW
var timeView = Ti.UI.createView({
	backgroundColor:Ti.App.foregroundColor,
	//borderRadius:10,
	opacity: .4,

});

var timeViewWrapper = Ti.UI.createView({
	backgroundColor: 'transparent',
	top: '51.5%',
	height:'22%', 
    left:'3%', 
    right:'3%'	
});
var timeBarView = Ti.UI.createView({
    height:'32%%', 
    backgroundColor:'#C6CCCC',
    left:'6%', 
    right:'6%',
    top: '35%',
    borderWidth: 1,
    borderColor: '#8C8C8C'
});


var timeBarTop = Ti.UI.createView({
    backgroundColor:'#FF0000',
    left: '1.5%', 
    top: '12%',
    bottom: '48%'
});


var timeBarBottom = Ti.UI.createView({
    backgroundColor:'#FF0000',
    left: '1.5%', 
    top: '49%',
    bottom: '12%'
});

var timeLabel = Ti.UI.createLabel({
   text: 'Time Left',
   top: '8%',
   left: '6%',
   font:{fontSize:'20sp', fontWeight:'bold', fontColor: 'white'},
   color: 'white'
});

var timeUsageLabel = Ti.UI.createLabel({
    text: "27/30",
    bottom: '7%',
    right: '4.5%',
    font:{fontSize:'18sp', fontColor: 'white'},
    color: 'white'
});

//UPGRADE VIEW

	
var freeSMSView = Ti.UI.createView({
	backgroundColor:Ti.App.foregroundColor,
	//borderRadius:10,
	opacity: .4,

});

var freeSMSViewWrapper = Ti.UI.createView({
	backgroundColor: 'transparent',
	bottom: '2%',
	height:'22%', 
    left:'3%', 
    right:'3%'
});

var freeSMSBarView = Ti.UI.createView({
    height:'32%%', 
    backgroundColor:'#C6CCCC',
    left:'6%', 
    right:'6%',
    top: '35%',
    borderWidth: 1,
    borderColor: '#8C8C8C'
});

var freeSMSBarTop = Ti.UI.createView({
    backgroundColor:'#FF0000',
    left: '1.5%', 
    top: '12%',
    bottom: '48%'
});


var freeSMSBarBottom = Ti.UI.createView({
    backgroundColor:'#FF0000',
    left: '1.5%', 
    top: '49%',
    bottom: '12%'
});

var freeSMSLabel = Ti.UI.createLabel({
   text: 'Free SMS Used',
   top: '8%',
   left: '6%',
   font:{fontSize:'20sp', fontWeight:'bold', fontColor: 'white'},
   color: 'white'
});

var freeSMSUsageLabel = Ti.UI.createLabel({
    text: 5-Ti.App.freeSMS + "/5",
    bottom: '7%',
    right: '4.5%',
    font:{fontSize:'18sp', fontColor: 'white'},
    color: 'white'
});
	

//Sets the width of the bars
function setBarWidth(TopBarVarName, BottomBarVarName, used, total){
    used = used/total*100;
    if(used <= 40){        
        TopBarVarName.setBackgroundColor('#00FF15');
        BottomBarVarName.setBackgroundColor('#00E813');
    }
    else if (used <= 75 && used > 40){
        TopBarVarName.setBackgroundColor('#FFAA17');
        BottomBarVarName.setBackgroundColor('#E69A17');
    }
    else{
        TopBarVarName.setBackgroundColor('#FF0000');
        BottomBarVarName.setBackgroundColor('#DE0202');
    }
    TopBarVarName.setWidth(used + '%');
    BottomBarVarName.setWidth(used + '%');

};

function getUsage(){
	var client = Ti.Network.createHTTPClient();
	
	client.onerror = function(){
	        Ti.API.error(this.status + ' - ' + this.statusText);
	};
	var parameters = [{SessionID: sid, LanguageCode: lang, VirtualNetwork: vn}];
	var soapRequest = generateXML("http://service.adminportal.vasx.com/", 'getUsage', parameters);
	  
	client.open('POST', 'http://192.168.20.3:12080/vx_adminportal/AdminPortal');
	client.setRequestHeader("Content-Type", 'text/xml');
	client.setRequestHeader('Content-Length', soapRequest.length);
	client.setRequestHeader('SOAPAction', '"getUsage"');
	client.send(soapRequest);
	
	client.onload = function() {
	    var doc = client.responseXML.documentElement.getElementsByTagName("getUsageResponse");
		Ti.API.info(doc.item(0).text);
	    //manually parse the SOAP XML document
	};
};

function getCalls(){
	var client = Ti.Network.createHTTPClient();
	
	client.onerror = function(){
	        Ti.API.error(this.status + ' - ' + this.statusText);
	};
	var parameters = [{SessionID: sid, LanguageCode: lang, VirtualNetwork: vn}];
	var soapRequest = generateXML("http://service.adminportal.vasx.com/", 'getCalls', parameters);
	  
	client.open('POST', 'http://192.168.20.3:12080/vx_adminportal/AdminPortal');
	client.setRequestHeader("Content-Type", 'text/xml');
	client.setRequestHeader('Content-Length', soapRequest.length);
	client.setRequestHeader('SOAPAction', '"getCalls"');
	client.send(soapRequest);
	
	client.onload = function() {
	    var doc = client.responseXML.documentElement.getElementsByTagName("getCallsResponse");
		Ti.API.info(doc.item(0).text);
	    //manually parse the SOAP XML document
	};
};

function timeLeft(){
	var client = Ti.Network.createHTTPClient();
	
	client.onerror = function(){
	        Ti.API.error(this.status + ' - ' + this.statusText);
	};
	var parameters = [{SessionID: sid, LanguageCode: lang, VirtualNetwork: vn}];
	var soapRequest = generateXML("http://service.adminportal.vasx.com/", 'timeLeft', parameters);
	  
	client.open('POST', 'http://192.168.20.3:12080/vx_adminportal/AdminPortal');
	client.setRequestHeader("Content-Type", 'text/xml');
	client.setRequestHeader('Content-Length', soapRequest.length);
	client.setRequestHeader('SOAPAction', '"timeLeft"');
	client.send(soapRequest);
	
	client.onload = function() {
	    var doc = client.responseXML.documentElement.getElementsByTagName("timeLeftResponse");
		Ti.API.info(doc.item(0).text);
	    //manually parse the SOAP XML document
	};
};

//views
mainView.add(callsViewWrapper);
mainView.add(dataViewWrapper);
mainView.add(timeViewWrapper);
mainView.add(freeSMSViewWrapper);

dataViewWrapper.add(dataView);
dataViewWrapper.add(dataBarView);
dataBarView.add(dataBarTop);
dataBarView.add(dataBarBottom);
dataViewWrapper.add(dataUsageLabel);
dataViewWrapper.add(dataLabel);

callsViewWrapper.add(callsView);
callsViewWrapper.add(callsBarView);
callsBarView.add(callsBarBottom);
callsBarView.add(callsBarTop);
callsViewWrapper.add(callsLabel);
callsViewWrapper.add(callsUsageLabel);

timeViewWrapper.add(timeView);
timeViewWrapper.add(timeBarView);
timeBarView.add(timeBarTop);
timeBarView.add(timeBarBottom);
timeViewWrapper.add(timeLabel);
timeViewWrapper.add(timeUsageLabel);

freeSMSViewWrapper.add(freeSMSView);
freeSMSViewWrapper.add(freeSMSBarView);
freeSMSBarView.add(freeSMSBarTop);
freeSMSBarView.add(freeSMSBarBottom);
freeSMSViewWrapper.add(freeSMSLabel);
freeSMSViewWrapper.add(freeSMSUsageLabel);

win.setLeftNavButton(logout);
win.add(theScrollView);
theScrollView.add(mainView);
theScrollView.add(updateView);
updateView.add(activityIndicator);

closeMenu(win);
phoneSwipeWindow(win);

function openWin(){
	win.open();
}
win.openWin = openWin;	

function close(){
	win.close();
}
win.close = close;
	
return win;
}
exports.open = open;
