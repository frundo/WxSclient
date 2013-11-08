/**
 * @author Francesco
 */

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
Titanium.UI.setBackgroundImage('/images/bgImage.png');

//Parent window = ServerCapabilities.js
//reference the current window
var win = Titanium.UI.currentWindow;

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
	url : '/windows/WcsMetadata.js',
	//title : 'Metadata',
	title : L('WcsMetadata_win_title'),
	modal : true,
	//backgroundColor : '#fff',
	backgroundImage : '/images/bgImage.png'
});
win1.padre = win.padre;

var win2 = Titanium.UI.createWindow({
	url : '/windows/CoverageInfo.js',
	//title : 'Coverage',
	title : L('CoverageInfo_win_title'),
	modal : true,
	//backgroundColor : '#fff',
	backgroundImage : '/images/bgImage.png'
});
win2.padre = win.padre;

//Create the tableView
var tblWcsServer = Titanium.UI.createTableView({
	width : pWidth - 20,
	height : pHeight - 110,
	top : 20,
	left : 10,
	backgroundColor : '#B0C4DE',
	borderRadius : 12,
	borderColor : '#AFEEEE',
	borderWidth : 2
});

var sectionMetadata = Ti.UI.createTableViewSection({
	//headerTitle : 'Service Metadata'
	headerTitle : L('WcsServer_section1_title')
});

//create a table row
var row = Titanium.UI.createTableViewRow({
	width : tblWcsServer.width,
	height : 90,
	hasChild : false,
	className : 'metadata-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'View Server Metadata',
	text : L('WcsServer_row1_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	//color : '#fff',
	color : '#000',
	left : 10,
	top : 35,
	width : row.width,
	height : 'auto'
});
row.add(titleRow);
//add our little icon to the right of the row
var iconImage = Titanium.UI.createImageView({
	image : '/images/next.png',
	width : 48,
	height : 48,
	right : 10,
	top : 20
});
row.add(iconImage);
sectionMetadata.add(row);

var sectionCoverages = Ti.UI.createTableViewSection({
	//headerTitle : 'Coverages'
	headerTitle : L('WcsServer_section2_title')
});

/*
 * Da riempire automaticamente con i tag "wcs:CoverageId" del relativo xml
 */
var xmlData = Titanium.XML.parseString(win.xmlText);

win1.xml = xmlData;
win2.xml = xmlData;

//get the item nodelist from our response xml object
wcsCoverageSummary = xmlData.documentElement.getElementsByTagName("wcs:CoverageSummary");

//loop each item in the xml
for (var i = 0; i < wcsCoverageSummary.length; i++) {
	//create a table row
	var row = Titanium.UI.createTableViewRow({
		width : tblWcsServer.width,
		height : 90,
		hasChild : false,
		className : 'coverage-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		text : wcsCoverageSummary.item(i).getElementsByTagName("wcs:CoverageId").item(0).textContent,
		font : {
			fontSize : 22,
			fontWeight : 'bold'
		},
		color : '#000',
		left : 10,
		top : 5,
		height : 30,
		//height : 'auto',
		width : row.width - 60
	});
	//description row
	var descriptionRow = Titanium.UI.createLabel({
		text : wcsCoverageSummary.item(i).getElementsByTagName("wcs:CoverageSubtype").item(0).textContent,
		font : {
			fontSize : 20,
			fontWeight : 'normal'
		},
		color : '#fff',
		//color : '#000',
		left : 10,
		top : 35,
		height : 55,
		//top : titleRow.top + titleRow.height + 5,
		width : row.width - 60,
		//height : 'auto'
	});
	row.add(titleRow);
	row.add(descriptionRow);
	//add our little icon to the right of the row
	var iconImage = Titanium.UI.createImageView({
		image : '/images/next.png',
		width : 48,
		height : 48,
		right : 10,
		top : 20
	});
	row.add(iconImage);
	sectionCoverages.add(row);
}

//finally, set the data property of the tableView to our data[] object
tblWcsServer.data = [sectionMetadata, sectionCoverages];

win.add(tblWcsServer);

tblWcsServer.addEventListener('click', function(e) {
	// e.row contains information about the row that was clicked.
	// e.row.title = Your Row Title
	// children = the objects added to your row.
	if (e.index == 0) {
		if (Ti.App.isAndroid == true) {
			win1.open();
		} else {
			win.padre.openWindow(win1);	
		};
	} else {
		//Attenzione e.index (in questo caso il num di riga va da 1 a n), ma ci servirà un indice che parta da 0
		win2.rowID = e.index - 1;
		if (Ti.App.isAndroid == true) {
			win2.open();
		} else {
			win.padre.openWindow(win2);	
		};
	};
});
