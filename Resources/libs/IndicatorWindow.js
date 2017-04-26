/**
 * Indicator window with a spinner and a label
 * 
 * @param {Object} args
 */
function createIndicatorWindow(args) {
    var width = '50%',
        height = '12%';

    var args = args || {};
    var top = '40%';
    
    var win = Titanium.UI.createWindow({
        height:height,
        width:width,
        top:top,
        borderRadius:10,
        touchEnabled:false,
        backgroundColor:'#000',
        opacity:0.6
    });
    
    var view = Ti.UI.createView({
        width:Ti.UI.SIZE,
        height:Ti.UI.FILL,
        center: {x:(width/2), y:(height/2)},
        layout:'horizontal'
    });
    
    function osIndicatorStyle() {
        style = Ti.UI.iPhone.ActivityIndicatorStyle.PLAIN;
        
        if ('iPhone OS' !== Ti.Platform.name) {
            style = Ti.UI.ActivityIndicatorStyle.DARK;            
        }
        
        return style;
    }
     
    var activityIndicator = Ti.UI.createActivityIndicator({
        style:osIndicatorStyle(),
        left:'7%',
        height:Ti.UI.FILL,
        width:30
    });
    
    var label = Titanium.UI.createLabel({
        left:'15%',
        width:Ti.UI.FILL,
        height:Ti.UI.FILL,
        text:'Loading...',
        color: '#fff',
        font: {fontFamily:'Helvetica Neue', fontSize:16, fontWeight:'bold'},
    });

    view.add(activityIndicator);
    view.add(label);
    win.add(view);
    
    function openIndicator() {
        win.open();
        activityIndicator.show();
        win.setVisible(true);
        activityIndicator.setVisible(true);
    }
    
    win.openIndicator = openIndicator;
    
    function closeIndicator() {
        activityIndicator.hide();
        activityIndicator.setVisible(false);
        win.setVisible(false);
        win.close();
    }
    
    win.closeIndicator = closeIndicator;
    
    return win;
}

// Public interface
exports.createIndicatorWindow = createIndicatorWindow;
