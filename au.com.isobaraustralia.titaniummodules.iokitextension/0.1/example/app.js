// This is a test harness for your module
// You should do something interesting in this harness 
// to test out the module and to provide instructions 
// to users on how to use it by example.


// open a single window
var window = Ti.UI.createWindow({
	backgroundColor:'white'
});
var label1 = Ti.UI.createLabel();
window.add(label1);

var label2 = Ti.UI.createLabel();
window.add(label2);

var label3 = Ti.UI.createLabel();
window.add(label3);

window.open();

// TODO: write your module tests here
var iokitextension = require('au.com.isobaraustralia.titaniummodules.iokitextension');


label1.text = iokitextension.imei();
label2.text = iokitextension.serialnumber();
label3.text = iokitextension.backlightlevel();

Ti.API.info("*** IMEI =====> " + iokitextension.imei());
Ti.API.info("*** Serial Number =====> " + iokitextension.serialnumber());
Ti.API.info("*** Backlight Level =====> " + iokitextension.backlightlevel());