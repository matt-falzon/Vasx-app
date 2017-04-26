//Vol.01.00		M Falzon 	Initial revision
//Generates XML
Ti.include('underscore.js');

var endPoint, nameSpace, response, request;
var xmlResponse;
var client = Ti.Network.createHTTPClient();


function generateXML(nameSpace, action, params){//generates the xml for web service calls 
	setNamespace(nameSpace);
	if(params){
		var keys = _.keys(params[0]);
		var values = _.values(params[0]);
	}
	var soapRequest = getEnvelopeBegin() + getAction(action);
	if(keys)
		for(var i = 0; i < keys.length; i++)
			soapRequest+='<'+keys[i]+'>'+values[i]+'</'+keys[i]+'>';
	soapRequest+= getActionClose(action) + getEnvelopeEnd();
	Ti.API.info(soapRequest);
	
	return soapRequest;
}

function disconnectSession(sid, lang, vn){//disconnects current session

var client = Ti.Network.createHTTPClient();

client.onerror = function(){
        Ti.API.error(this.status + ' - ' + this.statusText);
};
var parameters = [{SessionID: sid, LanguageCode: lang, VirtualNetwork: vn}];
var soapRequest = generateXML("http://service.adminportal.vasx.com/", 'disconnectSession', parameters);
  
client.open('POST', 'http://192.168.20.3:12080/vx_adminportal/AdminPortal');
client.setRequestHeader("Content-Type", 'text/xml');
client.setRequestHeader('Content-Length', soapRequest.length);
client.setRequestHeader('SOAPAction', '"disconnectSession"');
client.send(soapRequest);

client.onload = function() {
    var doc = client.responseXML.documentElement.getElementsByTagName("disconnectSessionResponse");
	Ti.API.info(doc.item(0).text);
	Ti.API.info("session disconnected");
    //manually parse the SOAP XML document
};
}

function getMyNumber(sesionID, LanguageCode, vn){
var client = Ti.Network.createHTTPClient();

client.onerror = function(){
        Ti.API.error(this.status + ' - ' + this.statusText);
};
var parameters = [{SessionID: sid, LanguageCode: lang, VirtualNetwork: vn}];
var soapRequest = generateXML("http://service.adminportal.vasx.com/", 'getMyNumber', parameters);
  
client.open('POST', 'http://192.168.20.3:12080/vx_adminportal/AdminPortal');
client.setRequestHeader("Content-Type", 'text/xml');
client.setRequestHeader('Content-Length', soapRequest.length);
client.setRequestHeader('SOAPAction', '"getMyNumber"');
client.send(soapRequest);

client.onload = function() {
    var doc = client.responseXML.documentElement.getElementsByTagName("getMyNumberResponse");
	Ti.API.info(doc.item(0).text);
	Ti.API.info("done");
    //manually parse the SOAP XML document
};
}

function setLanguage(sid, lang, vn){//changes language of session

var client = Ti.Network.createHTTPClient();

client.onerror = function(){
        Ti.API.error(this.status + ' - ' + this.statusText);
};

var params = [{SessionID: sid, LanguageCode: lang, VirtualNetwork: vn}];
var soapRequest = generateXML('http://service.adminportal.vasx.com/', 'setLanguage', params);
  
client.open('POST', 'http://192.168.20.3:12080/vx_adminportal/AdminPortal');
client.setRequestHeader("Content-Type", 'text/xml');
client.setRequestHeader('Content-Length', soapRequest.length);
client.setRequestHeader('SOAPAction', '"setLanguage"');
client.send(soapRequest);

client.onload = function() {
    var doc = client.responseXML.documentElement.getElementsByTagName("setLanguageResponse");
	Ti.API.info(doc.item(0).text);
	Ti.API.info("done");
    //manually parse the SOAP XML document
};
}

function getVersion(){
var client = Ti.Network.createHTTPClient();

client.onerror = function(){
        Ti.API.error(this.status + ' - ' + this.statusText);
};
var params;
var xml = generateXML("http://service.adminportal.vasx.com/", 'getVersion', params);
  
client.open('POST', 'http://192.168.20.3:12080/vx_adminportal/AdminPortal');
client.setRequestHeader("Content-Type", 'text/xml');
client.setRequestHeader('Content-Length', xml.length);
client.setRequestHeader('SOAPAction', '"getVersion"');
client.send(xml);

client.onload = function() {
    var doc = client.responseXML.documentElement.getElementsByTagName("getVersionResponse");
    Ti.API.info(doc.item(0).text);
    //manually parse the SOAP XML document
   
	};
};


function getDocument(sid, lang, docID, vn){
var client = Ti.Network.createHTTPClient();

client.onerror = function(){
        Ti.API.error(this.status + ' - ' + this.statusText);
};
var params = [{SessionID: sid, LanguageCode: lang, DocumentID: docID, VirtualNetwork: vn}];
var xml = generateXML("http://service.adminportal.vasx.com/", 'getDocument', params);
  
client.open('POST', 'http://192.168.20.3:12080/vx_adminportal/AdminPortal');
client.setRequestHeader("Content-Type", 'text/xml');
client.setRequestHeader('Content-Length', xml.length);
client.setRequestHeader('SOAPAction', '"getDocument"');
client.send(xml);

client.onload = function() {
    var results = client.responseXML.documentElement.getElementsByTagName("getDocumentResponse");
	if (results && results.length>0) {
		var xml_doc = Ti.XML.parseString(results.item(0).text);
		alert(xml_doc.getElementsByTagName("Message").item(0).text);
   
	};
};
};

function getSuperJackpot(sid, lang, code, vn){
	
var client = Ti.Network.createHTTPClient();

client.onerror = function(){
        Ti.API.error(this.status + ' - ' + this.statusText);
};
var params = [{SessionID: sid, LanguageCode: lang, Code: code, VirtualNetwork: vn}];
var xml = generateXML("http://service.adminportal.vasx.com/", 'getSuperJackpot', params);
  
client.open('POST', 'http://192.168.20.3:12080/vx_adminportal/AdminPortal');
client.setRequestHeader("Content-Type", 'text/xml');
client.setRequestHeader('Content-Length', xml.length);
client.setRequestHeader('SOAPAction', '"getSuperJackpot"');
client.send(xml);

client.onload = function() {
    var results = client.responseXML.documentElement.getElementsByTagName("getSuperJackpotResponse");
	if (results && results.length>0) {
		var xml_doc = Ti.XML.parseString(results.item(0).text);
		alert(xml_doc.getElementsByTagName("Message").item(0).text);
   
	};
};
};

function getSMSBundle(sid, lang, code, vn){
	
var client = Ti.Network.createHTTPClient();

client.onerror = function(){
        Ti.API.error(this.status + ' - ' + this.statusText);
};
var params = [{SessionID: sid, LanguageCode: lang, Code: code, VirtualNetwork: vn}];
var xml = generateXML("http://service.adminportal.vasx.com/", 'getSMSBundle', params);
  
client.open('POST', 'http://192.168.20.3:12080/vx_adminportal/AdminPortal');
client.setRequestHeader("Content-Type", 'text/xml');
client.setRequestHeader('Content-Length', xml.length);
client.setRequestHeader('SOAPAction', '"getSMSBundle"');
client.send(xml);

client.onload = function() {
    var results = client.responseXML.documentElement.getElementsByTagName("getSMSBundleResponse");
	if (results && results.length>0) {
		var xml_doc = Ti.XML.parseString(results.item(0).text);
		alert(xml_doc.getElementsByTagName("Message").item(0).text);
   
	};
};
};

function setContactGroup(sid, lang, name, recipient, vn){
	
var client = Ti.Network.createHTTPClient();

client.onerror = function(){
        Ti.API.error(this.status + ' - ' + this.statusText);
};
var params = [{SessionID: sid, LanguageCode: lang, Name: name, Recipients: recipient, VirtualNetwork: vn}];
var xml = generateXML("http://service.adminportal.vasx.com/", 'setContactGroup', params);
  
client.open('POST', 'http://192.168.20.3:12080/vx_adminportal/AdminPortal');
client.setRequestHeader("Content-Type", 'text/xml');
client.setRequestHeader('Content-Length', xml.length);
client.setRequestHeader('SOAPAction', '"setContactGroup"');
client.send(xml);

client.onload = function() {
    var results = client.responseXML.documentElement.getElementsByTagName("setContactGroupResponse");
	if (results && results.length>0) {
		var xml_doc = Ti.XML.parseString(results.item(0).text);
		alert(xml_doc.getElementsByTagName("Message").item(0).text);
   
	};
};
};

function getAirtimeTransfer(sid, lang, amount, recipient, vn){
	
var client = Ti.Network.createHTTPClient();

client.onerror = function(){
        Ti.API.error(this.status + ' - ' + this.statusText);
};
var params = [{SessionID: sid, LanguageCode: lang, Amount: amount, Recipient: recipient, VirtualNetwork: vn}];
var xml = generateXML("http://service.adminportal.vasx.com/", 'getAirtimeTransfer', params);
  
client.open('POST', 'http://192.168.20.3:12080/vx_adminportal/AdminPortal');
client.setRequestHeader("Content-Type", 'text/xml');
client.setRequestHeader('Content-Length', xml.length);
client.setRequestHeader('SOAPAction', '"getAirtimeTransfer"');
client.send(xml);

client.onload = function() {
    var results = client.responseXML.documentElement.getElementsByTagName("getAirtimeTransferResponse");
	if (results && results.length>0) {
		var xml_doc = Ti.XML.parseString(results.item(0).text);
		alert(xml_doc.getElementsByTagName("Message").item(0).text);
   
	};
};
};

function getMyNumber(sid, lang, amount, recipient, vn){
	
var client = Ti.Network.createHTTPClient();

client.onerror = function(){
        Ti.API.error(this.status + ' - ' + this.statusText);
};
var params = [{SessionID: sid, LanguageCode: lang, VirtualNetwork: vn}];
var xml = generateXML("http://service.adminportal.vasx.com/", 'getMyNumber', params);
  
client.open('POST', 'http://192.168.20.3:12080/vx_adminportal/AdminPortal');
client.setRequestHeader("Content-Type", 'text/xml');
client.setRequestHeader('Content-Length', xml.length);
client.setRequestHeader('SOAPAction', '"getMyNumber"');
client.send(xml);

client.onload = function() {
    var results = client.responseXML.documentElement.getElementsByTagName("getMyNumberResponse");
	if (results && results.length>0) {
		var xml_doc = Ti.XML.parseString(results.item(0).text);
		alert(xml_doc.getElementsByTagName("Message").item(0).text);
   
	};
};
};

function getBalanceNotification(sid, lang, action, vn){
	
var client = Ti.Network.createHTTPClient();

client.onerror = function(){
        Ti.API.error(this.status + ' - ' + this.statusText);
};
var params = [{SessionID: sid, LanguageCode: lang, Action: action, VirtualNetwork: vn}];
var xml = generateXML("http://service.adminportal.vasx.com/", 'getBalanceNotification', params);
  
client.open('POST', 'http://192.168.20.3:12080/vx_adminportal/AdminPortal');
client.setRequestHeader("Content-Type", 'text/xml');
client.setRequestHeader('Content-Length', xml.length);
client.setRequestHeader('SOAPAction', '"getBalanceNotification"');
client.send(xml);

client.onload = function() {
    var results = client.responseXML.documentElement.getElementsByTagName("getBalanceNotificationResponse");
	if (results && results.length>0) {
		var xml_doc = Ti.XML.parseString(results.item(0).text);
		alert(xml_doc.getElementsByTagName("Message").item(0).text);
   
	};
};
};

function sendMessage(sid, lang, subject, message, vn){
	
var client = Ti.Network.createHTTPClient();

client.onerror = function(){
        Ti.API.error(this.status + ' - ' + this.statusText);
};
var params = [{SessionID: sid, LanguageCode: lang, Subject: subject, MessageBody: message, VirtualNetwork: vn}];
var xml = generateXML("http://service.adminportal.vasx.com/", 'sendMessage', params);
  
client.open('POST', 'http://192.168.20.3:12080/vx_adminportal/AdminPortal');
client.setRequestHeader("Content-Type", 'text/xml');
client.setRequestHeader('Content-Length', xml.length);
client.setRequestHeader('SOAPAction', '"sendMessage"');
client.send(xml);

client.onload = function() {
    var results = client.responseXML.documentElement.getElementsByTagName("sendMessageResponse");
	if (results && results.length>0) {
		var xml_doc = Ti.XML.parseString(results.item(0).text);
		alert(xml_doc.getElementsByTagName("Message").item(0).text);
   
	};
};
};

function sendMMS(sid, lang, recipient, content, vn){
	
var client = Ti.Network.createHTTPClient();

client.onerror = function(){
        Ti.API.error(this.status + ' - ' + this.statusText);
};
var params = [{SessionID: sid, LanguageCode: lang, Recipient: recipient, Content: content, VirtualNetwork: vn}];
var xml = generateXML("http://service.adminportal.vasx.com/", 'sendMMS', params);
  
client.open('POST', 'http://192.168.20.3:12080/vx_adminportal/AdminPortal');
client.setRequestHeader("Content-Type", 'text/xml');
client.setRequestHeader('Content-Length', xml.length);
client.setRequestHeader('SOAPAction', '"sendMMS"');
client.send(xml);

client.onload = function() {
    var results = client.responseXML.documentElement.getElementsByTagName("sendMMSResponse");
	if (results && results.length>0) {
		var xml_doc = Ti.XML.parseString(results.item(0).text);
		alert(xml_doc.getElementsByTagName("Message").item(0).text);
   
	};
};
};

function getEnvelopeBegin(){
	var s = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="'+nameSpace+'">'+
		'<soapenv:Header/>'+
	'<soapenv:Body>';
	return s;
}

function getEnvelopeEnd(){
	var s = '</soapenv:Body>'+
'</soapenv:Envelope>';
	return s;
}

function setNamespace(_nameSpace){
	nameSpace = _nameSpace;
};

function setEndPoint(_endPoint){
	endPoint = _endPoint;
}

function setResponse(_response){
	response=_response;
}

function setRequest(_request){
	request = _request;
}

function getAction(_action){
	var s = '<ser:'+_action+'>';
	return s;
}

function getActionClose(_action){
	var s = '</ser:'+_action+'>';
	return s;
}

function getResponse(response){
	var s = '<ser:'+response+'>';
	return s;
}

function getNameSpace(){
	var s = nameSpace;
	return s;
}

function getXHR(){
	xhr = Titanium.Network.createHTTPClient();
	return xhr;
}

function setResult(_xmlResponse){
	xmlResponse = _xmlResponse;
	Ti.API.info("setResult" + _xmlResponse);
}

function getResult(){
	return xmlResponse;
}
/*			NOT USED AT THE MOMENT∂
function webService(nameSpace, endPoint, action, response, params){
	setNamespace(nameSpace);
	setEndPoint(endPoint);
	setResponse(response);
	setRequest(action);
	var keys = _.keys(params[0]);
	var values = _.values(params[0]);
	//Ti.API.info('keys length ' + keys.length + " " + keys.toString());
	var soapRequest = getEnvelopeBegin() + getAction(action);
	for(var i = 0; i < keys.length; i++)
		soapRequest+='<'+keys[i]+'>'+values[i]+'</'+keys[i]+'>';
	soapRequest+= getActionClose(action) + getEnvelopeEnd();
	Ti.API.info(soapRequest + " \n" + soapRequest.length + "\n");
	
	callWebService(soapRequest, endPoint, action, response);
	
	return xmlResponse;
}

function callWebService(soapRequest, endPoint, action, response){
	var client = getXHR();
	var endPoint1 = 'http://192.168.20.3:12080/vx_adminportal/AdminPortal';
		client.open('POST', endPoint1);
	client.setRequestHeader("Content-Type", 'text/xml');
	client.setRequestHeader('Content-Length', soapRequest.length);
	client.setRequestHeader('SOAPAction', ''+action+'');
	client.send(soapRequest);
	
	client.onload = function() {
	    var doc = client.responseXML.documentElement.getElementsByTagName(response);
		Ti.API.info(doc.item(0).text);
		Ti.API.info("done");
	    //manually parse the SOAP XML document
	    setResult(doc.item(0).text);
	};
	
	
	client.onerror = function(){
	        Ti.API.error(this.status + ' - ' + this.statusText);
	};
};*/
