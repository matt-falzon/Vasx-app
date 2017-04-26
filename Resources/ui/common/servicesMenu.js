//Vol.01.00     M Falzon    Initial revision
var win = Ti.UI.currentWindow;
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/webService.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/libs/commonFunctions.js');
theme("red");
win.backgroundColor = Ti.App.backgroundColor;
myId = win.id;
    
    var data = [];
    var labels = ['Free SMS','Please Call Me','Recharge','FriendlyNames','Bill Limit', 'Handset Upgrade', 'Password', 'Display Names', 'opps'];
    //create data for dashboard
    for (var x=0;x<3;x++){
        for (var c=0;c<labels.length;c++){
            var item = Titanium.UI.createDashboardItem({
                image:'/images/dashboard/'+labels[c]+'_off.png',
                selectedImage:'/images/dashboard/'+labels[c]+'_on.png',
                label:labels[c]
            });
            data.push(item);
        }
    }
    
    var dashboard = Titanium.UI.createDashboardView({
        data:data,
        canDelete:false
    });
    win.add(dashboard);
//link to pages
dashboard.addEventListener('click',function(e){
    if (e.item.label == 'Free SMS'){
        var newWin = Ti.UI.createWindow({
        backgroundColor: '#fff',
        title: 'Free SMS',
        url: 'freeSMS.js',
		id: myId
    });
    Ti.UI.currentTab.open(newWin);
    }
    if (e.item.label == 'Please Call Me'){
        var newWin = Ti.UI.createWindow({
        backgroundColor: '#fff',
        title: 'Please Call Me',
        url: 'pleaseCallMe.js'
    });
    Ti.UI.currentTab.open(newWin);
    }
    if (e.item.label == 'Recharge'){
        var newWin = Ti.UI.createWindow({
        backgroundColor: '#fff',
        title: 'Voucher Recharge',
        url: 'voucherRecharge.js',
        id: myId,
        lang: Ti.App.Language
    });
    Ti.UI.currentTab.open(newWin);
    }
    if (e.item.label == 'FriendlyNames'){
        var newWin = Ti.UI.createWindow({
        backgroundColor: '#fff',
        title: 'Friendly Names',
        url: 'friendlyNames.js',
        msisdn: Ti.App.msisdn
    });
    Ti.UI.currentTab.open(newWin);
    }
     if (e.item.label == 'Bill Limit'){
        var newWin = Ti.UI.createWindow({
        backgroundColor: '#fff',
        title: 'Bill Limit',
        url: 'billLimit.js'
    });
    Ti.UI.currentTab.open(newWin);
    }
     if (e.item.label == 'Password'){
        var newWin = Ti.UI.createWindow({
        backgroundColor: '#fff',
        title: 'Password Hints',
        url: 'passwordHints.js',
        myId: myId
    });
    Ti.UI.currentTab.open(newWin);
    }
     if (e.item.label == 'Display Names'){
        var newWin = Ti.UI.createWindow({
        backgroundColor: '#fff',
        title: 'Display Names',
        url: 'displayNames.js',
        myId: myId
    });
    Ti.UI.currentTab.open(newWin);
    }        
});
//done button
var cancel = Titanium.UI.createButton({
    systemButton:Titanium.UI.iPhone.SystemButton.DONE
});
//stop editing when clicked and hide button
cancel.addEventListener('click', function()
{
    dashboard.stopEditing();
    win.rightNavButton = null;
});
//make right nav button visible
dashboard.addEventListener('edit',function()
{
    win.rightNavButton = cancel;
});
