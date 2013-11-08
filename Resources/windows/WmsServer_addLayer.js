/**
 * @author Francesco
 */
// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
Titanium.UI.setBackgroundImage('/images/bgImage.png');

//Parent window = WmsServerList_addLayer.js

//reference the current window
var win = Titanium.UI.currentWindow;
//win.title = win.serverName;

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
	url : '/windows/WmsGetMap.js',
	//title : 'GetMap',
	title : L('WmsGetMap_win_title'),
	modal : true,
	//backgroundColor : '#fff',
	backgroundImage : '/images/bgImage.png'
});
win1.padre = win.padre;

//Create the tableView
var tblWmsServer = Titanium.UI.createTableView({
	width : pWidth - 20,
	height : pHeight - 110,
	top : 20,
	left : 10,
	backgroundColor : '#B0C4DE',
	borderRadius : 12,
	borderColor : '#AFEEEE',
	borderWidth : 2,
	minRowHeight : 80
});

var sectionLayers = Ti.UI.createTableViewSection({
	//headerTitle : 'Layers'
	headerTitle : L('WmsServer_section2_title')
});

var xmlData = Titanium.XML.parseString(win.xmlText);

win1.xml = xmlData;

//get the item nodelist from our response xml object
layer = xmlData.documentElement.getElementsByTagName("Layer");

// Layer 0
//create a table row
var row = Titanium.UI.createTableViewRow({
	width : tblWmsServer.width,
	//height : 80,
	height : 'auto',
	//hasChild : true,
	className : 'layer-row'
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : layer.item(0).getElementsByTagName("Title").item(0).textContent,
	font : {
		fontSize : 20,
		fontWeight : 'bold'
	},
	//color : '#fff',
	color : '#000',
	left : 10,
	top : 10,
	width : row.width - 70,
	//height : 55,
	height : 'auto'
});
//hidden row
var layerIndexRow = Titanium.UI.createLabel({
	text : 0,
	visible : false
});
row.add(descriptionRow);
row.add(layerIndexRow);
sectionLayers.add(row);

// other layers
//loop each item in the xml
for (var i = 1; i < layer.length; i++) {

	//create a table row
	var row = Titanium.UI.createTableViewRow({
		width : tblWmsServer.width,
		//height : 80,
		height : 'auto',
		//hasChild : true,
		className : 'layer-row'
	});
	//description row
	var descriptionRow = Titanium.UI.createLabel({
		text : layer.item(i).getElementsByTagName("Title").item(0).textContent,
		font : {
			fontSize : 20,
			fontWeight : 'bold'
		},
		//color : '#fff',
		color : '#000',
		left : 10,
		top : 10,
		width : row.width - 70,
		//height : 55,
		height : 'auto'
	});
	//add our little icon to the right of the row
	var iconImage = Titanium.UI.createImageView({
		image : '/images/next.png',
		width : 48,
		height : 48,
		right : 10,
		top : 20
	});
	//hidden row
	var layerIndexRow = Titanium.UI.createLabel({
		text : i,
		visible : false
	});
	row.add(descriptionRow);
	row.add(iconImage);
	row.add(layerIndexRow);
	sectionLayers.add(row);
}

//finally, set the data property of the tableView to our data[] object
tblWmsServer.data = [sectionLayers];

win.add(tblWmsServer);

tblWmsServer.addEventListener('click', function(e) {
	if (e.index > 0) {
		win1.rowID = e.index;
		win1.serverIndex = win.serverIndex;
		win1.layerIndex = e.row.children[2].text;
		if (Ti.App.isAndroid == true) {
			win1.open();
		} else {
			win.padre.openWindow(win1);	
		};
	};
});
