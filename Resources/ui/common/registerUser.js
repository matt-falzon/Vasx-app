//opens the new user window
function registerUser(theArray, msisdn){
	var t = Titanium.UI.create2DMatrix();
	t = t.scale(0);
	
	Ti.App.msisdn = msisdn;
	Ti.App.network = "";

	var w = Titanium.UI.createWindow({
		backgroundColor:'#336699',
		borderWidth:8,
		borderColor:'#999',
		height:'89%',
		width:'93%',
		borderRadius:10,
		opacity:0.93,
		transform:t
	});
	
	//swipe down label
	var swipeLabel = Ti.UI.createLabel({
		text: "Swipe down when done",
		visible: false,
		color: "white"
	});
	
	// create first transform to go beyond normal size
	var t1 = Titanium.UI.create2DMatrix();
	t1 = t1.scale(1.1);
	var a = Titanium.UI.createAnimation();
	a.transform = t1;
	a.duration = 200;
	
	// when this animation completes, scale to normal size
	a.addEventListener('complete', function()
	{
		Titanium.API.info('Register Window');
		var t2 = Titanium.UI.create2DMatrix();
		t2 = t2.scale(1.0);
		w.animate({transform:t2, duration:200});

	});
	
	// create a button to close window
	var b = Titanium.UI.createButton({
		title:'Register',
		height:'7%',
		width:'50%',
		bottom: '8%'
	});
	w.add(b);
	//Network Text Field
	var networkTextField = Ti.UI.createTextField({
		height:'7%',
		bottom: '30%',
		color: 'black',
		hintText: "Network: ",
		left: "10%",
		right: "10%",
		font: { fontSize: "19pt", fontWeight : 'bold'},
		textAlign: 'TEXT_ALIGNMENT_CENTER',
		backgroundColor: "#E3E8E8",
		editable: false
	});
	w.add(networkTextField);

	//event for button to close window when clicked
	b.addEventListener('click', function()
	{
		//stuff here
			Ti.App.msisdn = msisdn;
		//make sure the user filled in both of the fields
		if(Ti.App.network == "" || Ti.App.msisdn == "")
			if(Ti.App.network.length == 0 && Ti.App.msisdn == "")
				alert("No phone number or network selected");
			else if(Ti.App.network.length == 0)
				alert("No network selected");
			else if(Ti.App.msisdn == "")
				alert("No phone number entered");
			//if they did fill the fields
			if(Ti.App.network.length > 0 && Ti.App.msisdn.length > 0 && Ti.App.country.length > 0 && Ti.App.url.length > 0){
				//alert("A one time password has been sent to number " + Ti.App.msisdn);
				var db = Ti.Database.open('local');
				var rows = db.execute("SELECT msisdn FROM data WHERE msisdn =" + Ti.App.msisdn + "");
				//check if the msisdn already has a profile on this phone
				if(rows.isValidRow() == false){//if not, insert new row
					rows = db.execute('INSERT INTO data (msisdn, url, country, site_name) VALUES (?, ?, ?, ?)', Ti.App.msisdn, Ti.App.url, Ti.App.country, Ti.App.network);
					db.execute('INSERT INTO user_language (msisdn, lang_code, lang_name) VALUES(?,?,?)', Ti.App.msisdn, 'en', 'English');//to be fixed
				}else{//else update existing row
					rows = db.execute('UPDATE data SET url = ?, country = ?, site_name = ? WHERE msisdn = ?', Ti.App.url, Ti.App.country, Ti.App.network, Ti.App.msisdn);
					db.execute('UPDATE user_language SET lang_code = ?, lang_name = ? WHERE msisdn = ?', theArray[0].language[0].code, theArray[0].language[0].name, Ti.App.msisdn);
					}
				rows = db.execute('SELECT * FROM data');
				Ti.API.info("Database");
				while (rows.isValidRow()){
    				var thisNumber = rows.fieldByName('msisdn');
    				var thisSite = rows.fieldByName('site_name');
    				Ti.API.info("Number: " + thisNumber + ' Site Name: ' + thisSite);
   					 rows.next();
				}
				db.close();
			}
			//login web service
				
		var t3 = Titanium.UI.create2DMatrix();
		t3 = t3.scale(0);
		w.close({transform:t3,duration:300});
	});
	
	var theView = Ti.UI.createView({
		backgroundColor:'transparent',
		left:'3%', 
		right:'3%',
		borderRadius:10,
		top:'3%',
		bottom: '40%',
		borderColor: 'white',
		borderSize: 2
	});

	//PUT SITE DATA INTO TABLE
	var tableData = [];
	for(var i =0; i < theArray.length; i++){
		var row = Ti.UI.createTableViewRow({
   		selectedBackgroundColor:'transparent',
    	height: 40,
    	country: theArray[i].country,
    	network: theArray[i].network,
    	url: theArray[i].url,
    	language: theArray[i].language,
    	vnUID: theArray[i].vnUID
		});
		
		
		textLabel = Ti.UI.createLabel({
			text: theArray[i].country + " - " + theArray[i].network,
			color: 'white',
			font: { fontSize: "16pt", fontWeight : 'bold'},
			left: 0
		});
		
		row.add(textLabel);
		
		var imageURL;//flag url
		var path = Titanium.Filesystem.applicationDataDirectory;
		if (Titanium.Filesystem.getFile(path,theArray[i].country + 'Flag.png'))//gets flag 
			imageURL = '/images/flags/' + theArray[i].country + 'Flag.png';
		else
			imageURL = '/images/flags/saFlag.png';

		var flagImage = Ti.UI.createImageView({
   		image: imageURL,
    	right: '1.5%',
    	height: '70%', width: '17%'
		});
		
		row.add(flagImage);
		tableData.push(row);
	}

	
	var table = Ti.UI.createTableView({
		data: tableData,
		backgroundColor: 'transparent',
		allowSelection: true
	});
	
	table.addEventListener('click', function(e){
   		networkTextField.setValue(e.rowData.network + ", " + e.rowData.country);
		networkTextField.blur();
		Ti.App.network = e.rowData.network;
		Ti.App.url = e.rowData.url;
		Ti.App.country = e.rowData.country;
		for(var i = 0; i < e.rowData.language.length; i++){//iterate through supported langauges
			if(Ti.Locale.getCurrentLanguage() == e.rowData.language[i].code)//if the phones language matches a supported langauge set it
				Ti.App.language = e.rowData.language[i].code;
		}
		if(Ti.App.Language == "")//If the users language isnt supported make it the default
			Ti.App.language = e.rowData.language[0].code;
			
		Ti.API.info("Country: " + e.rowData.country);
		Ti.API.info("Site Name: " + e.rowData.network);
		Ti.API.info("Site URL: " + e.rowData.url);
		Ti.API.info("vnUID: " + e.rowData.vnUID);
		Ti.API.info("Phones Language: " + Ti.Locale.getCurrentLanguage());
		for(var j = 0; j < e.rowData.language.length; j++)
			Ti.API.info("Language Available: " + e.rowData.language[j].name);
		Ti.API.info("Default Language: " + e.rowData.language[0].name);
	});
	

 
// SLIDE SCREEN UP WHEN ENTERING TITLE
networkTextField.addEventListener('focus', function(){
	this.setBottom("80%");
	table.hide();
});
 
// SLIDE SCREEN BACK TO ORIGINAL POSITION
networkTextField.addEventListener('blur', function(){
	this.setBottom("30%");
	table.show();
});
	theView.add(table);
	w.add(theView);
	theView.add(swipeLabel);
	
w.addEventListener("swipe", function(e){
    if (e.direction == 'down'){
        msisdnTextField.blur();
        networkTextField.blur();
	}
});


	w.open(a);
};



exports.registerUser = registerUser;
