//Vol.04.00		M Falzon 	Initial revision
//added custom bars
//graphs are now automatic
//configured for every resolution
//Vol.05.00 
//language now updates without restarting app, usage statistics now update without restarting app
//Handset upgrade changed to free sms
//Vol.06.00		8/8/13	M Falzon
//Modified for ipad
//fixed graph not showing when window is reopened issue
//Vol.07.00		12/8/13 M Falzon
//updates language when user opens a new graph
//fixed free sms not updating on tablet app

function dataView(theView){
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/webService.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/commonFunctions.js');
theme("blue");


var win = Titanium.UI.createView({
	backgroundColor:'pink', 
	left:'0%', 
	right:'0%',
	top: '0%'
});
	
win.backgroundColor = Ti.App.backgroundColor;
closeMenu(win);

graph(Titanium.Filesystem.resourcesDirectory+'/ui/tablet/dataUsage.html', 'usage', 'total', 242, 1024);//workaround for titanium being titanium

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
win.usageLanguage = usageLanguage;
var callsText, dataText, timeText, upgradeText;

/*
 * VIEWS
 */
var mainView = Ti.UI.createView({
	backgroundColor: Ti.App.backgroundColor,
	right: '51.5%',
	bottom: '35.5%',
	
});

function osIndicatorStyle() {
    style = Ti.UI.iPhone.ActivityIndicatorStyle.BIG;
    
    if ('iPhone OS' !== Ti.Platform.name) {
        Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN;        
    }
    
    return style;
}
 
var activityIndicator = Ti.UI.createActivityIndicator({
    style:osIndicatorStyle(),
    visible: false,
	indicatorColor: '#000',
    height: Ti.UI.FILL,
    width: Ti.UI.FILL,
    message: 'Loading...'
});

var barGraphView = Ti.UI.createView({
	backgroundColor:Ti.App.foregroundColor,
	top: '65.5%',
});

barGraphView.add(activityIndicator);

var barGraph = Ti.UI.createWebView({

});
	
//VIEWS FOR BARS
//CALLS VIEW	
var callsView = Ti.UI.createView({
	backgroundColor:Ti.App.foregroundColor,
	height:'22%', 
	top: '2.5%',
	//borderRadius:10
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
    bottom: '50%'
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
   font:{fontSize:'20sp', fontWeight:'bold', fontColor: '#1BA5E0'},
   color: Ti.App.backgroundColor
});

callsUsageLabel = Ti.UI.createLabel({
    text: '321' +"/"+ '600',
    bottom: '8.5%',
    right: '4.5%',
    font:{fontSize:'18sp', fontColor: '#1BA5E0'},
    color: Ti.App.backgroundColor
});

//DATA VIEW
	
var dataView = Ti.UI.createView({
	backgroundColor:Ti.App.foregroundColor,
	height:'22%', 
	//borderRadius:10,
	top: '27%'
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
    bottom: '50%'
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
   font:{fontSize:'20sp', fontWeight:'bold', fontColor: '#1BA5E0'},
   color: Ti.App.backgroundColor
});

var dataUsageLabel = Ti.UI.createLabel({
    text: '242' +"/"+ '1024',
    bottom: '7%',
    right: '4.5%',
    font:{fontSize:'18sp', fontColor: '#1BA5E0'},
    color: Ti.App.backgroundColor
});

//TIME VIEW
var timeView = Ti.UI.createView({
	backgroundColor:Ti.App.foregroundColor,
	height:'22%', 
	//borderRadius:10,
	top: '51.5%'
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
    bottom: '50%'
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
   font:{fontSize:'20sp', fontWeight:'bold', fontColor: '#1BA5E0'},
   color: Ti.App.backgroundColor
});

var timeUsageLabel = Ti.UI.createLabel({
    text: "27/30",
    bottom: '7%',
    right: '4.5%',
    font:{fontSize:'18sp', fontColor: '#1BA5E0'},
    color: Ti.App.backgroundColor
});

//UPGRADE VIEW

	
var freeSMSView = Ti.UI.createView({
	backgroundColor:Ti.App.foregroundColor,
	height:'22%', 
	//borderRadius:10,
	bottom: '2%'
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
    bottom: '50%'
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
   font:{fontSize:'20sp', fontWeight:'bold', fontColor: '#1BA5E0'},
   color: Ti.App.backgroundColor
});

var freeSMSUsageLabel = Ti.UI.createLabel({
    text: 5-Ti.App.freeSMS + "/5",
    bottom: '7%',
    right: '4.5%',
    font:{fontSize:'18sp', fontColor: '#1BA5E0'},
    color: Ti.App.backgroundColor
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


	
callsView.addEventListener('click', function(e){
	barGraph.setVisible(false);
	popupGraph(Titanium.Filesystem.resourcesDirectory+'/ui/tablet/dataUsage.html', 'callUsage', 'callTotal', 321, 600);
	activityIndicator.setVisible(true);
	var someData = [7, 3, 1, 7, 5, 9, 10, 5];

	setTimeout(function(){//wait a sec for the webview to recieve the data
			activityIndicator.setVisible(false);
		makeBarGraph(Titanium.Filesystem.resourcesDirectory+'/ui/tablet/barData.html', 'barData', someData);
		setTimeout(function(){
			barGraph.setVisible(true);
		}, 100);
    },2500);
});

dataView.addEventListener('click', function(e){
	barGraph.setVisible(false);
	popupGraph(Titanium.Filesystem.resourcesDirectory+'/ui/tablet/dataUsage.html', 'usage', 'total', 242, 1024);
	activityIndicator.setVisible(true);
	var someData = [7, 3, 1, 7, 5, 9, 10, 5];

	setTimeout(function(){//wait a sec for the webview to recieve the data
			activityIndicator.setVisible(false);
		makeBarGraph(Titanium.Filesystem.resourcesDirectory+'/ui/tablet/barData.html', 'barData', someData);
		setTimeout(function(){
			barGraph.setVisible(true);
		}, 100);
    },2500);
});
timeView.addEventListener('click', function(e){
	barGraph.setVisible(false);
	popupGraph(Titanium.Filesystem.resourcesDirectory+'/ui/tablet/dataUsage.html', 'timeleft', 'timetotal', 81, 90);
	activityIndicator.setVisible(true);
	var someData = [7, 3, 1, 7, 5, 9, 10, 5];

	setTimeout(function(){//wait a sec for the webview to recieve the data
			activityIndicator.setVisible(false);
		makeBarGraph(Titanium.Filesystem.resourcesDirectory+'/ui/tablet/barData.html', 'barData', someData);
		setTimeout(function(){
			barGraph.setVisible(true);
		}, 100);
    },2500);
});
freeSMSView.addEventListener('click', function(e){
	barGraph.setVisible(false);
	popupGraph(Titanium.Filesystem.resourcesDirectory+'/ui/tablet/dataUsage.html', 'smsused', 'remaining', Ti.App.freeSMS, 5);
	activityIndicator.setVisible(true);
	var someData = [7, 3, 1, 7, 5, 9, 10, 5];

	setTimeout(function(){//wait a sec for the webview to recieve the data
			activityIndicator.setVisible(false);
		makeBarGraph(Titanium.Filesystem.resourcesDirectory+'/ui/tablet/barData.html', 'barData', someData);
		setTimeout(function(){
			barGraph.setVisible(true);
		}, 100);
    },2500);
});

//this functions allows titanium to show the graph. Why? i dont know why?
function graph(url, eventString1, eventString2, eventMessage1, eventMessage2){
	graphView = Ti.UI.createWebView({//Webview of the graph
		backgroundColor:Ti.App.foregroundColor,
		left:'50%',
		top: '1.3%',
		bottom: '36.5%',
		url: url,
		DisableBounce: true
	});
	win.add(graphView);
}

function makeBarGraph(url, eventString, eventMessage){

	barGraph.setUrl(url);
	barGraphView.add(barGraph);
	
	if(eventString != null)
		barGraph.addEventListener('load', function(e) {
			Ti.App.fireEvent(eventString, { message: eventMessage});
		});
}

//creates the popup window for all of the graphs
function popupGraph(url, eventString1, eventString2, eventMessage1, eventMessage2){
	
	usageLanguage();
		
	var w = Titanium.UI.createView({//popup window
		backgroundColor:'#336699',
		borderWidth:8,
		borderColor:'#999',
		height:'30%',
		width:'50%',
		left: '51.5%',
		borderRadius:10,
		opacity:0.92,
		visible: false
	}); 	
		
		var t = Titanium.UI.create2DMatrix();
		t = t.scale(0);
		w.setTransform(t);
		// create first transform to go beyond normal size
		var t1 = Titanium.UI.create2DMatrix();
		t1 = t1.scale(1.1);
		var a = Titanium.UI.createAnimation();
		a.transform = t1;
		a.duration = 200;
	
		// when this animation completes, scale to normal size
		a.addEventListener('complete', function()
		{
			Titanium.API.info('Animation Complete');
			var t2 = Titanium.UI.create2DMatrix();
			t2 = t2.scale(1.0);
			w.animate({transform:t2, duration:200});
	
		});
        
		graphView = Ti.UI.createWebView({//Webview of the graph
			url: url,
			DisableBounce: true,
			showScrollbars: false,	
		});
		w.add(graphView);
		
		if(eventString1 != null)
			graphView.addEventListener('load', function(e) {
    		Ti.App.fireEvent(eventString1, { message: eventMessage1});
    		Ti.App.fireEvent(eventString2, { message: eventMessage2});
			});
		win.add(w);
		  setTimeout(function(){//wait a sec for the webview to recieve the data
            graphView.reload();//reload the webview
            graphView.setUrl(url);//sets the webviews url
          },20);


};


setBarWidth(dataBarTop, dataBarBottom, 242, 1024);
setBarWidth(callsBarTop, callsBarBottom, 321, 600);
setBarWidth(timeBarTop, timeBarBottom, 27, 31);
setBarWidth(freeSMSBarTop, freeSMSBarBottom, 5-Ti.App.freeSMS, 5);
freeSMSUsageLabel.setText(5-Ti.App.freeSMS + "/5");
//sets language
usageLanguage();
	


//views
mainView.add(callsView);
mainView.add(dataView);
mainView.add(timeView);
mainView.add(freeSMSView);

dataView.add(dataBarView);
dataBarView.add(dataBarTop);
dataBarView.add(dataBarBottom);
dataView.add(dataUsageLabel);
dataView.add(dataLabel);

callsView.add(callsBarView);
callsBarView.add(callsBarBottom);
callsBarView.add(callsBarTop);
callsView.add(callsLabel);
callsView.add(callsUsageLabel);

timeView.add(timeBarView);
timeBarView.add(timeBarTop);
timeBarView.add(timeBarBottom);
timeView.add(timeLabel);
timeView.add(timeUsageLabel);

freeSMSView.add(freeSMSBarView);
freeSMSBarView.add(freeSMSBarTop);
freeSMSBarView.add(freeSMSBarBottom);
freeSMSView.add(freeSMSLabel);
freeSMSView.add(freeSMSUsageLabel);

win.add(mainView);
win.add(barGraphView);
theView.add(win);

function close(){
	win.close();
	w.close();
}
win.close = close;
}
