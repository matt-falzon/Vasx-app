//Vol.00.00		M Falzon 	Initial revision
var win = Ti.UI.currentWindow;
win.backgroundColor = '#000000';

Ti.include('../../libs/jspdf.js');
var he = "hello";
var doc = new jsPDF();
doc.text(20, 20, 'Hello world!');
doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
doc.addPage();
doc.text(20, 20, 'Do you like that?');
doc.addPage();
doc.text(20, 20, he);

var res = doc.output();
var file = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, 'test.pdf');
file.write(res);
var pdfview = Ti.UI.createWebView({width:'100%',height:'100%',data:file});

win.add(pdfview);
