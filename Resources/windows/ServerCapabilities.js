/**
 * @author Francesco
 */

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
Titanium.UI.setBackgroundImage('/images/bgImage.png');

//Parent window = Settings.js
//reference the current window
var win = Titanium.UI.currentWindow;
win.title = L('ServerCapabilities_win_title');

var btnBack = Ti.UI.createButton({
	//title: 'back'
	title: L('NavButton_back')
});
win.leftNavButton = btnBack; 
btnBack.addEventListener('click', function() {
	win.close();
});

//Misaurazione dello schermo
var pWidth = Ti.Platform.displayCaps.platformWidth;
var pHeight = Ti.Platform.displayCaps.platformHeight;

var win1 = Titanium.UI.createWindow({
	url : '/windows/WcsServer.js',
	//title : e.row.children[0].text,
	modal : true,
	//backgroundColor : '#fff',
	backgroundImage : '/images/bgImage.png'
});
win1.padre = win.padre;

var win2 = Titanium.UI.createWindow({
	url : '/windows/WmsServer.js',
	//title : e.row.children[0].text,
	modal : true,
	//backgroundColor : '#fff',
	backgroundImage : '/images/bgImage.png'
});
win2.padre = win.padre;

//create a button to save a server to the addedServers array
var btnDeleteAllAddedServers = Titanium.UI.createButton({
	//title : 'Delete all added servers',
	title : L('ServerCapabilities_button_title'),
	font : {
		fontSize : 18,
		fontFamily : 'Helvetica Neue',
		fontWeight : 'bold'
	},
	top : 10,
	right : 10,
	width : 200,
	height : 60,
	//width : Math.round(pWidth / 4),
	//height : Math.round(pHeight / 12),
	backgroundImage : '/images/button.png'
});
win.add(btnDeleteAllAddedServers);

btnDeleteAllAddedServers.addEventListener('touchstart', function(e) {
	btnDeleteAllAddedServers.backgroundImage = '/images/button_focused.png';
});

btnDeleteAllAddedServers.addEventListener('touchend', function(e) {
	btnDeleteAllAddedServers.backgroundImage = '/images/button.png';
	//Remove addedServers array as global variable (le Properties rimangono in memoria anche ad app chiusa)
	if (Ti.App.Properties.hasProperty('addedServers')) {
		Ti.App.Properties.removeProperty('addedServers');
		alert(L('ServerCapabilities_message'));
	};
	win.close();	
});

var tblCapabilities = Titanium.UI.createTableView({
	width : pWidth - 20,
	height : pHeight - 170,
	top : 70,
	left : 10,
	backgroundColor : '#B0C4DE',
	borderRadius : 12,
	borderColor : '#AFEEEE',
	borderWidth : 2
	//data : [sectionWCS, sectionWMS]
});

tblCapabilities.addEventListener('click', function(e) {
	// e.row contains information about the row that was clicked.
	// e.row.title = Your Row Title
	// children = the objects added to your row.

	Ti.API.info("ServerCapabilities - e.index: " + e.index);

	if (addedServers[e.row.children[2].text].type === 'WCS') {
		win1.title = e.row.children[0].text;
		win1.xmlText = addedServers[e.row.children[2].text].getCapabilities;
		if (Ti.App.isAndroid == true) {
			win1.open();
		} else {
			win.padre.openWindow(win1);	
		};
	} else {
		win2.title = e.row.children[0].text;
		win2.xmlText = addedServers[e.row.children[2].text].getCapabilities;
		if (Ti.App.isAndroid == true) {
			win2.open();
		} else {
			win.padre.openWindow(win2);	
		};
	};

});

win.add(tblCapabilities);

//Create table sections
var sectionWCS = Ti.UI.createTableViewSection({
	//headerTitle : 'WCS Servers'
	headerTitle : L('ServerCapabilities_section1_title')
});
var sectionWMS = Ti.UI.createTableViewSection({
	//headerTitle : 'WMS Servers'
	headerTitle : L('ServerCapabilities_section2_title')
});

//Read added servers from Properties
var addedServers = [];
if (Ti.App.Properties.hasProperty('addedServers')) {
	addedServers = Ti.App.Properties.getList('addedServers');
};

//Put data from array to table
for (var i = 0; i < addedServers.length; i++) {
	//create a table row
	var row = Titanium.UI.createTableViewRow({
		width : tblCapabilities.width,
		height : 90,
		//hasChild : true,
		className : addedServers[i].type + '-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		text : addedServers[i].name,
		font : {
			fontSize : 24,
			fontWeight : 'bold'
		},
		color : '#000',
		left : 10,
		top : 10,
		height : 40,
		width : row.width - 70
	});
	//description row
	var descriptionRow = Titanium.UI.createLabel({
		text : addedServers[i].url,
		font : {
			fontSize : 20,
			fontWeight : 'normal'
		},
		//color : '#2f4f4f',
		color : '#fff',
		left : 10,
		top : 50,
		width : row.width,
		height : 30
	});

	//server number
	var serverNumber = Titanium.UI.createLabel({
		text : i,
		font : {
			fontSize : 12,
			fontWeight : 'normal'
		},
		//color : '#2f4f4f',
		color : '#fff',
		left : 10,
		top : 50,
		width : 20,
		height : 20,
		visible : false
	});
	//add our little icon to the right of the row
	var iconImage = Titanium.UI.createImageView({
		image : '/images/next.png',
		width : 48,
		height : 48,
		right : 10,
		top : 20
	});
	row.add(titleRow);
	row.add(descriptionRow);
	row.add(serverNumber);
	row.add(iconImage);

	//L'operatore === compara sia il tipo che il valore, == compara solo il valore
	if (addedServers[i].type === 'WCS') {
		sectionWCS.add(row);
	} else {
		sectionWMS.add(row);
	};
}

tblCapabilities.data = [sectionWCS, sectionWMS];

