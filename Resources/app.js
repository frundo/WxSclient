/**
 * @author Francesco
 */

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
//Titanium.UI.setBackgroundImage('/images/bgImage.png');

// Set a global var to check the OS
var isAndroid = false;
if (Ti.Platform.name === 'android'){
  	isAndroid = true;
};
Ti.App.isAndroid = isAndroid;


//Misaurazione dello schermo
var pWidth = Ti.Platform.displayCaps.platformWidth;
var pHeight = Ti.Platform.displayCaps.platformHeight;
var w = 0;
var h = 0;
if (pWidth < pHeight) {
	w = pWidth;
	h = pHeight;
} else {
	h = pWidth;
	w = pHeight;
};

Ti.Gesture.addEventListener('orientationchange', function(e) {
	// Rimisaurazione dello schermo
	pWidth = Ti.Platform.displayCaps.platformWidth;
	pHeight = Ti.Platform.displayCaps.platformHeight;
	if (pWidth < pHeight) {
		w = pWidth;
		h = pHeight;
	} else {
		h = pWidth;
		w = pHeight;
	};
	//pWidth = Ti.Platform.displayCaps.platformWidth;
	//pHeight = Ti.Platform.displayCaps.platformHeight;

	//win.close();
	//win.open();
	//Titanium.API.info('Orientation changed - pWidth = ' + pWidth + ', pHeight = ' + pHeight);
});

//
// create base UI tab and root window
//
var win = Titanium.UI.createWindow({
	//title : 'Coverage',
	//titleid : 'app_win_title',
	title : L('app_win_title'),
	//backgroundColor : '#fff',
	backgroundImage : '/images/bgImage.png'
});
//win.title= L('app_win_title');
//Ti.API.info("app.js - app_win_title: " + L('app_win_title'));

var win1 = Titanium.UI.createWindow({
	url : '/windows/Settings.js',
	//title : 'Settings',
	//titleid : 'app_win1_title',
	title : L('settings_win_title'),
	modal : true,
	//backgroundColor : '#fff'
	backgroundImage : '/images/bgImage.png'
});

var navWin = Ti.UI.iOS.createNavigationWindow({
    modal: true,
	window: win1
});
win1.padre = navWin;


var label1 = Titanium.UI.createLabel({
	color : '#999',
	//text : 'Nothing to show',
	text : L('app_label'),
	font : {
		fontSize : 28,
		fontFamily : 'Helvetica Neue'
	},
	textAlign : 'center',
	width : 'auto'
});

win.add(label1);

//create a button to open the "settings" window
var btnSettings = Titanium.UI.createButton({
	//title : 'Settings',
	titleid : 'app_settings_button',
	font : {
		fontSize : 18,
		fontFamily : 'Helvetica Neue',
		fontWeight : 'bold'
	},
	top : 10,
	right : 10,
	//width : 190,
	//height : 88,
	width : Math.round(w / 4),
	height : Math.round(h / 12),
	backgroundImage : '/images/button.png'
});

win.add(btnSettings);

btnSettings.addEventListener('touchstart', function(e) {
	btnSettings.backgroundImage = '/images/button_focused.png';
});

btnSettings.addEventListener('touchend', function(e) {
	btnSettings.backgroundImage = '/images/button.png';
	if (Ti.App.isAndroid == true) {
		win1.open();
	} else {
		navWin.open();	
	};
});

win.open();

// We check up on the memory status every second
/*
setInterval(function() {
	Ti.API.info("FRANCESCO - CONTROLLO MEMORIA - Ti.Platform.availableMemory: " + Ti.Platform.availableMemory);
	//disp.text = Ti.Platform.availableMemory;
}, 4000); */
