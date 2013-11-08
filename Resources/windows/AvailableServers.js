/**
 * @author Francesco
 */

//Parent window = Settings.js
//reference the current window
var win = Titanium.UI.currentWindow;
win.backgroundColor = "white";
win.title = L('AvailableServers_win_title');

var btnBack = Ti.UI.createButton({
	//title: 'back'
	title: L('NavButton_back')
});
win.leftNavButton = btnBack; 
btnBack.addEventListener('click', function() {
	win.close();
});

var win1 = Titanium.UI.createWindow({
	url : '/windows/AddServer.js',
	//title : 'Add server',
	title : L('AddServer_win_title'),
	modal : true,
	//backgroundColor : '#fff'
	backgroundImage : '/images/bgImage.png',
	orientationModes : [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT]
	//orientationModes : [Ti.UI.PORTRAIT]
});
win1.padre = win.padre;

var win2 = Titanium.UI.createWindow({
	url : '/windows/AddNewServer.js',
	//title : 'Add new server',
	title : L('AddNewServer_win_title'),
	modal : true,
	//backgroundColor : '#fff'
	backgroundImage : '/images/bgImage.png',
	orientationModes : [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT]
	//orientationModes : [Ti.UI.PORTRAIT]
});
win2.padre = win.padre;

//Misaurazione dello schermo
var pWidth = Ti.Platform.displayCaps.platformWidth;
var pHeight = Ti.Platform.displayCaps.platformHeight;

var tblServers = Titanium.UI.createTableView({
	width : pWidth - 20,
	height : pHeight - 110,
	//height : 100,
	top : 20,
	left : 10,
	backgroundColor : '#B0C4DE',
	borderRadius : 12,
	borderColor : '#AFEEEE',
	borderWidth : 2
});
win.add(tblServers);


//Read server list from "avalaibleServers" property
//Empty array
var avalaibleServers = [];

if (Ti.App.Properties.hasProperty('avalaibleServers')) {
	avalaibleServers = Ti.App.Properties.getList('avalaibleServers');
};

//empty data array
var data = [];

//Put data from array to table
// The array "serverArray" goes until length-1 because the last row is empty
for (var i = 0; i < avalaibleServers.length; i++) {
	//create a table row
	var row = Titanium.UI.createTableViewRow({
		width : tblServers.width,
		height : 90,
		hasChild : false,
		className : 'server-row'
	});
	//name
	var lblName = Titanium.UI.createLabel({
		text : avalaibleServers[i].name,
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
	//service
	var lblService = Titanium.UI.createLabel({
		text : avalaibleServers[i].type,
		font : {
			fontSize : 22,
			fontWeight : 'normal'
		},
		//color : '#000',
		color : '#2f4f4f',
		//color : '#fff',
		right : 10,
		top : 10,
		width : 60,
		height : 40
	});
	//url
	var lblUrl = Titanium.UI.createLabel({
		text : avalaibleServers[i].url,
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
	row.add(lblName);
	row.add(lblService);
	row.add(lblUrl);
	//add the table row to our data[] object
	data.push(row);
};

// Insert the last row (Other)
//create a table row
var row = Titanium.UI.createTableViewRow({
	width : tblServers.width,
	height : 90,
	hasChild : false,
	className : 'server-row'
});
//name
var lblName = Titanium.UI.createLabel({
	text : L('AvailableServers_last_row_title'),
	font : {
		fontFamily: 'Helvetica',
		fontSize : 24,
		fontWeight : 'bold'
	},
	color : '#00CD00',
	left : 10,
	top : 10,
	width : row.width - 70,
	height : 70
});
//add our little icon to the right of the row
var iconImage = Titanium.UI.createImageView({
	image : '/images/addServer.png',
	width : 48,
	height : 48,
	right : 20,
	top : 20
});
row.add(iconImage);
row.add(lblName);

//add the table row to our data[] object
data.push(row);

tblServers.data = data;

tblServers.addEventListener('click', function(e) {
	// e.row contains information about the row that was clicked.
	// e.row.title = Your Row Title
	// children = the objects added to your row.
	if (e.index == tblServers.data[0].rowCount - 1) {
		//alert('clicked add new server');
		//alert('Ti.App.isAndroid = ' + Ti.App.isAndroid);
		//win2.open({modal:true});
		if (Ti.App.isAndroid == true) {
			win2.open();
		} else {
			win.padre.openWindow(win2);	
		};	
	} else {
		win1.name = e.row.children[0].text;
		win1.service = e.row.children[1].text;
		win1.urlServer = e.row.children[2].text;
		if (Ti.App.isAndroid == true) {
			win1.open();
		} else {
			win.padre.openWindow(win1);	
		};
	};
});
