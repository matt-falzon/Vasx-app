//Vol.00.00		M Falzon 	Initial revision
//Vol.01.00		M Falzon
//added check for contacts permission
//added activity indicator however cannot hide indicator due to titanium :(
function open(){
var win = Titanium.UI.createWindow({
	backgroundColor:'pink',
	left: '15%'
});

Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/commonFunctions.js');
theme("red");
win.backgroundColor = Ti.App.backgroundColor;
Ti.API.info(Ti.App.msisdn);
var tickedArray = [];
var theContacts = [];
var x = 1;


var style;
if (Ti.Platform.name === 'iPhone OS'){
  style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
}
else {
  style = Ti.UI.ActivityIndicatorStyle.DARK;
}
var activityIndicator = Ti.UI.createActivityIndicator({
  color: 'green',
  font: {fontFamily:'Helvetica Neue', fontSize:26, fontWeight:'bold'},
  message: 'Loading...',
  style:style,
  top:10,
  left:10,
  height:'20%',
  width:'50%',
  visible: false
});

var performAddressBookFunction = function(){theContacts = getContacts();};//asks user to allow app to access their contacts
var addressBookDisallowed = function(){alert("This app requires access to your phone book");};
if (Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_AUTHORIZED){
    performAddressBookFunction();
} else if (Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_UNKNOWN){
    Ti.Contacts.requestAuthorization(function(e){
        if (e.success) {
            performAddressBookFunction();
        } else {
            addressBookDisallowed();
        }
    });
} else {
    addressBookDisallowed();
}

//Button to save the contacts that were selected

var button = Ti.UI.createButton({
	title: 'press me',
	left: 10
});

//table of contacts
var table = Ti.UI.createTableView({
	data: theContacts,
	backgroundColor: Ti.App.foregroundColor,
	separatorColor : Ti.App.backgroundColor,
	//visible: false
	editable: false
});

win.addEventListener('focus', function(e){
	activityIndicator.setVisible(true);
});

function orderNames(){//trying to get names alphebetized 
var g = Ti.Contacts.getAllGroups( );//Getting all the groups on the contacts table

var m = g[0].members();//select a group and check if it has members
Ti.API.info(m);// my group was empty so i have to add people

var p = Ti.Contacts.getAllPeople( );// get all the contacts
for (var i in p){//group and add people to your group
    g[0].add(p[i]);
    Ti.API.info(p[i].firstName);
    Titanium.Contacts.save();// you have to save new changes in IOS
}
g[0].sortedMembers(Ti.Contacts.CONTACTS_SORT_FIRST_NAME);// FINALLY WE CAN SORT

m = g[0].members();//   get the members 

for (var i in m){// verify they are in order
    Ti.API.info(m[i].firstName);

}
}

function checkNames (){//checks if the user has already set friendly names in the past
activityIndicator.setVisible(true);
	var db = Ti.Database.open('local');
	var rows = db.execute("SELECT * FROM friendly_names WHERE user_msisdn =?", Ti.App.msisdn);//gets current friendly names from the database for the users msisdn
	while (rows.isValidRow()){
	    var msisdn = rows.fieldByName('msisdn');
	    var contId = rows.fieldByName('contact_id');
	    Ti.API.info("Number: " + msisdn + ' contact id: ' + contId);
	   	rows.next();
	   	tickedArray.push(contId);//add the contact id to the array
	};
	Ti.API.info("----------");
	
	for(var j = 0; j < tickedArray.length; j++){//iterate through current friendly name records using the contact id's
		for(var i = 0; i < table.data[0].rows.length; i++){//iterate through contacts
	        if(tickedArray[j] == table.data[0].rows[i].id && Ti.App.checks < 5){
	        	Ti.API.info("MSISDN " + table.data[0].rows[i].msisdn + ": Ticked");
	        	table.data[0].rows[i].hasCheck = true;
	        	Ti.App.checks++;
	        	i = table.data[0].rows.length-1;
			}
		}

};

Ti.API.info("Total checks: " + Ti.App.checks); 
  
db.close();
x = 0;
win.add(mainView);
mainView.add(table);
activityIndicator.setColor(Ti.App.backgroundColor);
activityIndicator.setIndicatorColor(Ti.App.backgroundColor);
activityIndicator.setWidth(0);
activityIndicator.setHeight(0);
activityIndicator.hide();
//stopIndicator();

};
//allows user to tick entries in the table up to a maximum of 5
table.addEventListener('click', function(e){
    // event data
    var index = e.index;
    var section = e.section;
    var row = e.row;
    var rowdata = e.rowData;
    var maxChecks = 5;
	var db = Ti.Database.open('local');

	if(row.hasCheck === true) {
        row.hasCheck = false;
        Ti.App.checks--;
        Ti.API.info(Ti.App.checks);
      	rows = db.execute('DELETE FROM friendly_names WHERE contact_id =?', e.rowData.id);
        Ti.API.info("DELETED contact ID: " + e.rowData.id + " msisdn: " + e.rowData.msisdn + " Your number is: " + Ti.App.msisdn);
    }
	else if(Ti.App.checks < 5) {//makes sure the user hasnt already ticked 5 names
        row.hasCheck = true;
        Ti.API.info(e.rowData.msisdn);
        Ti.App.checks++;
        Ti.API.info(Ti.App.checks);
        rows = db.execute('INSERT INTO friendly_names (contact_id, msisdn, user_msisdn) VALUES (?, ?, ?)', e.rowData.id, e.rowData.msisdn, Ti.App.msisdn);
        Ti.API.info("Inserted contact ID: " + e.rowData.id + " msisdn: " + e.rowData.msisdn + " Your number is: " + Ti.App.msisdn);
     }
     else	
     	alert("You may only have up to 5 friends selected");
     db.close();
});

//Views

var mainView = Ti.UI.createView({
    backgroundColor:Ti.App.foregroundColor,
    top: '3%', bottom: '3%',
    left: '3%', right: '3%',
    borderRadius:10
});

win.add(activityIndicator);
swipeWindow(win);
closeMenu(win);
checkNames();
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
