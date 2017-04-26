//Vol.00.00		M Falzon 	Initial revision
function open(){
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/webService.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/commonFunctions.js');

theme("white");
var win = Titanium.UI.createWindow({
	backgroundColor:'pink',
	left: '51%'
});

win.backgroundColor = Ti.App.backgroundColor;

getPasswordHints(Ti.App.Session, "en", 1);
//VIEWS

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
	backgroundColor: Ti.UI.backgroundColor
});

var activityIndicator = Ti.UI.createActivityIndicator({
  	color: 'white',
  	font: {fontFamily:'Helvetica Neue', fontSize:26, fontWeight:'bold'},
  	message: 'Updating...',
  	style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
  	bottom:10
});
activityIndicator.show();

var firstView = Ti.UI.createView({
    layout:'vertical', 
    backgroundColor:Ti.App.foregroundColor,
    opacity:0.4,
    top: '3%',
    height: '29.5%',
    left: '3%',
    right: '3%',
    borderRadius:10
});

var firstViewWrapper = Ti.UI.createView({
    layout:'vertical', 
    backgroundColor:'transparent',
    top: '3%',
    height: '29.5%',
    left: '3%',
    right: '3%',
    borderRadius:10
});

var firstQuestionTextField = Ti.UI.createTextField({
	top: '5%',
	text: 'loading',
	width: '90%',
  	textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
});

var firstAnswerTextArea = Ti.UI.createTextArea({
	top: '18%',
	left: '3%', right: '3%',
	bottom: '18%',
	font:{fontSize:'15sp', fontWeight:'bold'},
  	textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER

});

var secondView = Ti.UI.createView({
    layout:'vertical', 
    backgroundColor:Ti.App.foregroundColor,
    opacity:0.4,
    top: '36%',
    height: '29%',
    left: '3%',
    right: '3%',
    borderRadius:10
});

var secondViewWrapper = Ti.UI.createView({
    layout:'vertical', 
    backgroundColor:'transparent',
    top: '36%',
    height: '29%',
    left: '3%',
    right: '3%',
    borderRadius:10
});

var secondQuestionTextField = Ti.UI.createTextField({
	top: '5%',
	text: 'loading',
	width: '90%',
  	textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
});

var secondAnswerTextArea = Ti.UI.createTextArea({
	top: '18%',
	left: '3%', right: '3%',
	bottom: '18%',
	font:{fontSize:'15sp', fontWeight:'bold'},
  	textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
});

var thirdView = Ti.UI.createView({
    layout:'vertical', 
    backgroundColor:Ti.App.foregroundColor,
    opacity:0.4,
    top: '68%',
    height: '29%',
    left: '3%',
    right: '3%',
    borderRadius:10
});

var thirdViewWrapper = Ti.UI.createView({
    layout:'vertical', 
    backgroundColor:'transparent',
    top: '68%',
    height: '29%',
    left: '3%',
    right: '3%',
    borderRadius:10
});

var thirdQuestionTextField = Ti.UI.createTextField({
	top: '5%',
	text: 'loading',
	width: '90%',
  	textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
});

var thirdAnswerTextArea = Ti.UI.createTextArea({
	top: '18%',
	left: '3%', right: '3%',
	bottom: '18%',
	font:{fontSize:'15sp', fontWeight:'bold'},
  	textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER

});

function getPasswordHints(id, lang, vn){

var client = Ti.Network.createHTTPClient();

client.onerror = function(){
        Ti.API.error(this.status + ' - ' + this.statusText);
};
var parameters = [{SessionID: id, LanguageCode: lang, VirtualNetwork: vn}];

var xml = generateXML("http://service.adminportal.vasx.com/", 'getPasswordHints', parameters);

client.open('POST', 'http://192.168.20.3:12080/vx_adminportal/AdminPortal');
client.setRequestHeader("Content-Type", 'text/xml');
client.setRequestHeader('Content-Length', xml.length);
client.setRequestHeader('SOAPAction', '"getPasswordHints"');
client.send(xml);

client.onload = function() {
    var results = client.responseXML.documentElement.getElementsByTagName("getPasswordHintsResponse");
	if (results && results.length>0) {
		Ti.API.info(results.item(0).text);
		var xml_doc = Ti.XML.parseString(results.item(0).text);
		//var xml_doc = xml_doc1.getChildNodes;
		var question1 = xml_doc.getElementsByTagName('QuestionCode1');
		var answer1 = xml_doc.getElementsByTagName('AnswerCode1');
		var question2 = xml_doc.getElementsByTagName('QuestionCode2');
		var answer2 = xml_doc.getElementsByTagName('AnswerCode2');
		var question3 = xml_doc.getElementsByTagName('QuestionCode3');
		var answer3 = xml_doc.getElementsByTagName('AnswerCode3');
		firstQuestionTextField.setValue((question1.item(0).text));
		firstAnswerTextArea.setValue((answer1.item(0).text));
		secondQuestionTextField.setValue((question2.item(0).text));
		secondAnswerTextArea.setValue((answer2.item(0).text));
		thirdQuestionTextField.setValue((question3.item(0).text));
		thirdAnswerTextArea.setValue((answer3.item(0).text));

	}
    //manually parse the SOAP XML document
};
	  	
};   



var save = Titanium.UI.createButton({
    systemButton:Titanium.UI.iPhone.SystemButton.SAVE
});

function setPasswordHints(id, lang, q1, a1, q2, a2, q3, a3, vn){

var client = Ti.Network.createHTTPClient();

client.onerror = function(){
        Ti.API.error(this.status + ' - ' + this.statusText);
};
var parameters = [{SessionID: id, LanguageCode: lang, QuestionCode1: q1, Answer1: a1, QuestionCode2: q2, Answer2: a2, QuestionCode3: q3, Answer3: a3, VirtualNetwork: vn}];

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
 
var save = Titanium.UI.createButton({
    systemButton:Titanium.UI.iPhone.SystemButton.SAVE
});

//save hints
save.addEventListener('click', function(){
	setPasswordHints(myId, "en", firstQuestionTextField.getValue(), firstAnswerTextArea.getValue(), secondQuestionTextField.getValue(),
					 secondAnswerTextArea.getValue(), thirdQuestionTextField.getValue(), thirdAnswerTextArea.getValue(), 1);
});
phoneSwipeWindow(win);
closeMenu(win);

mainView.add(firstView);
mainView.add(secondView);
mainView.add(thirdView);
mainView.add(firstViewWrapper);
mainView.add(secondViewWrapper);
mainView.add(thirdViewWrapper);


firstViewWrapper.add(firstQuestionTextField);
firstViewWrapper.add(firstAnswerTextArea);
firstViewWrapper.add(firstView);


secondViewWrapper.add(secondQuestionTextField);
secondViewWrapper.add(secondAnswerTextArea);
secondViewWrapper.add(secondView);


thirdViewWrapper.add(thirdQuestionTextField);
thirdViewWrapper.add(thirdAnswerTextArea);
thirdViewWrapper.add(thirdView);

win.add(theScrollView);
theScrollView.add(mainView);
theScrollView.add(updateView);
updateView.add(activityIndicator);

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
