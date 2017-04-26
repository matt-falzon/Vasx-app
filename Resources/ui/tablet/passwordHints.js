//Vol.00.00		M Falzon 	Initial revision
function passwordHints(theView){
var win = Titanium.UI.createView({
	backgroundColor:'pink',
	left: '15%',
	top: 0,
});
swipeWindow(win);
closeMenu(win);
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/webService.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/commonFunctions.js');
theme("red");
win.backgroundColor = Ti.App.backgroundColor;
getPasswordHints(Ti.App.Session, "en", 1);

//VIEWS
var firstView = Ti.UI.createView({
    backgroundColor:Ti.App.foregroundColor,
    height: '29.5%',
    borderRadius:10,
    top: 0
});

var firstQuestionTextField = Ti.UI.createTextArea({
	top: '20%',
	text: 'loading',
	width: '45%',
	left: '3%',
	height: '60%',
  	font:{fontSize:'30sp'}
});

var colonLabel = Ti.UI.createLabel({
	text: ':',
  	font:{fontSize:'30sp'},
  	top: '25%'
});

var firstAnswerTextArea = Ti.UI.createTextArea({
	top: '20%',
	right: '3%', width: '45%',
	height: '60%',
	font:{fontSize:'30sp'}
});

var secondView = Ti.UI.createView({
    backgroundColor:Ti.App.foregroundColor,
    top: '36%',
    height: '29%',
    borderRadius:10
});

var secondQuestionTextField = Ti.UI.createTextArea({
	top: '20%',
	text: 'loading',
	width: '45%',
	left: '3%',
	height: '60%',
  	font:{fontSize:'30sp'}
});

var colonLabel2 = Ti.UI.createLabel({
	text: ':',
  	font:{fontSize:'30sp'},
  	top: '25%'
});

var secondAnswerTextArea = Ti.UI.createTextArea({
	top: '20%',
	right: '3%', width: '45%',
	height: '60%',
	font:{fontSize:'30sp'}
});

var thirdView = Ti.UI.createView({
    backgroundColor:Ti.App.foregroundColor,
    top: '71%',
    height: '29%',
    borderRadius:10
});

var thirdQuestionTextField = Ti.UI.createTextArea({
	top: '20%',
	text: 'loading',
	width: '45%',
	left: '3%',
	height: '60%',
  	font:{fontSize:'30sp'}
});

var colonLabel3 = Ti.UI.createLabel({
	text: ':',
  	font:{fontSize:'30sp'},
  	top: '25%'
});

var thirdAnswerTextArea = Ti.UI.createTextArea({
	top: '20%',
	right: '3%', width: '45%',
	height: '60%',
	font:{fontSize:'30sp'}

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

function getHints(){
	var hints = [firstQuestionTextField.getValue(), firstAnswerTextArea.getValue(), 
				secondQuestionTextField.getValue(), secondQuestionTextArea.getValue(), 
				thirdQuestionTextField.getValue(), thirdQuestionTextArea.getValue()];
	return hints;
}
win.getHints = getHints;

var save = Titanium.UI.createButton({
    systemButton:Titanium.UI.iPhone.SystemButton.SAVE
}); 
 
var save = Titanium.UI.createButton({
    systemButton:Titanium.UI.iPhone.SystemButton.SAVE
});

//save hints
save.addEventListener('click', function(){
	setPasswordHints(Ti.App.msisdn, "en", firstQuestionTextField.getValue(), firstAnswerTextArea.getValue(), secondQuestionTextField.getValue(),
					 secondAnswerTextArea.getValue(), thirdQuestionTextField.getValue(), thirdAnswerTextArea.getValue(), 1);
});

win.add(firstView);
win.add(secondView);
win.add(thirdView);
win.rightNavButton = save;

firstView.add(firstQuestionTextField);
firstView.add(firstAnswerTextArea);
firstView.add(colonLabel);
secondView.add(secondQuestionTextField);
secondView.add(secondAnswerTextArea);
secondView.add(colonLabel2);
thirdView.add(thirdQuestionTextField);
thirdView.add(thirdAnswerTextArea);
thirdView.add(colonLabel3);

theView.add(win);
}
exports.passwordHints = passwordHints;
