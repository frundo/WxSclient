/**
 * @author Francesco
 */

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
//Titanium.UI.setBackgroundImage('/images/bgImage.png');

//Parent window = Settings.js
//reference the current window
var win = Titanium.UI.currentWindow;
win.title = L('WmsServerList_win_title');

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
	url : '/windows/WmsServer_addLayer.js',
	//title : e.row.children[0].text,
	modal : true,
	//backgroundColor : '#fff',
	backgroundImage : '/images/bgImage.png'
});
win1.padre = win.padre;

var tblServers = Titanium.UI.createTableView({
	width : pWidth - 20,
	height : pHeight - 110,
	top : 20,
	left : 10,
	backgroundColor : '#B0C4DE',
	borderRadius : 12,
	borderColor : '#AFEEEE',
	borderWidth : 2
	//data : [sectionWCS, sectionWMS]
});

tblServers.addEventListener('click', function(e) {
	// e.row contains information about the row that was clicked.
	// e.row.title = Your Row Title
	// children = the objects added to your row.
	win1.title = e.row.children[0].text;
	win1.xmlText = addedServers[e.row.children[2].text].getCapabilities;
	win1.serverIndex = e.row.children[2].text;
	if (Ti.App.isAndroid == true) {
		win1.open();
	} else {
		win.padre.openWindow(win1);	
	};
});

win.add(tblServers);

var addedServers = [];
if (Ti.App.Properties.hasProperty('addedServers')) {
	addedServers = Ti.App.Properties.getList('addedServers');
};

//Empty array for data table
var data = [];

//Put data from array to table
for (var i = 0; i < addedServers.length; i++) {
	//L'operatore === compara sia il tipo che il valore, == compara solo il valore
	if (addedServers[i].type === 'WMS') {
		//create a table row
		var row = Titanium.UI.createTableViewRow({
			width : tblServers.width,
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
		//hidden row
		var serverIndexRow = Titanium.UI.createLabel({
			text : i,
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
		row.add(serverIndexRow);
		row.add(iconImage);
		data.push(row);
	};
};

tblServers.data = data;
