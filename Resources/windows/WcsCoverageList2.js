/**
 * @author Francesco
 */

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
Titanium.UI.setBackgroundImage('/images/bgImage.png');

//Parent window = Settings.js
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
	url : '/windows/WcsGetCoverage.js',
	//title : 'Get Coverage',
	title : L('WcsGetCoverage_win_title'),
	modal : true,
	//backgroundColor : '#fff',
	backgroundImage : '/images/bgImage.png'
});
win1.padre = win.padre;

//Create the tableView
var tblCoverageList = Titanium.UI.createTableView({
	width : pWidth - 20,
	height : pHeight - 110,
	top : 20,
	left : 10,
	backgroundColor : '#B0C4DE',
	borderRadius : 12,
	borderColor : '#AFEEEE',
	borderWidth : 2
});
//Empty array containing sections
var data = [];

var addedServers = [];
if (Ti.App.Properties.hasProperty('addedServers')) {
	addedServers = Ti.App.Properties.getList('addedServers');
};
for (var i = 0; i < addedServers.length; i++) {
	if ((addedServers[i].describeCoverageArray != null) && (addedServers[i].describeCoverageArray.length != 0)) {
		var sectionServer = Ti.UI.createTableViewSection({
			//headerTitle : 'Coverages'
			headerTitle : addedServers[i].name
		});
		//Add the coverages to the section
		for (var j = 0; j < addedServers[i].describeCoverageArray.length; j++) {
			Ti.API.info('WcsCoverageList2.js - 1 - i, j = ' + i + ', ' + j);
			//get the item nodelist from our xml object
			if (addedServers[i].describeCoverageArray[j] != null) {
				Ti.API.info("WcsCoverageList2.js - addedServers[i].describeCoverageArray[j]: " + addedServers[i].describeCoverageArray[j]);
				var xmlData = Titanium.XML.parseString(addedServers[i].describeCoverageArray[j]);
				//create a table row
				var row = Titanium.UI.createTableViewRow({
					width : tblCoverageList.width,
					height : 90,
					hasChild : false,
					className : 'coverageId-row'
				});
				//title row
				var titleRow = Titanium.UI.createLabel({
					//text : 'Id',
					text : xmlData.documentElement.getElementsByTagName("wcs:CoverageId").item(0).textContent,
					font : {
						fontSize : 22,
						fontWeight : 'bold'
					},
					color : '#000',
					left : 10,
					top : 5,
					//width : 'auto',
					width : row.width - 70,
					height : 30
				});
				//description row
				var descriptionRow = Titanium.UI.createLabel({
					text : xmlData.documentElement.getElementsByTagName("wcs:CoverageSubtype").item(0).textContent,
					font : {
						fontSize : 20,
						fontWeight : 'normal'
					},
					color : '#fff',
					left : 10,
					top : 35,
					//width : 'auto',
					width : row.width - 70,
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
				row.add(titleRow);
				row.add(descriptionRow);
				row.add(iconImage);
				//hidden row
				var serverIndexRow = Titanium.UI.createLabel({
					text : i,
					//text : addedServers[i].describeCoverageArray[j],
					visible : false
				});
				row.add(serverIndexRow);
				//hidden row
				var layerIndexRow = Titanium.UI.createLabel({
					text : j,
					//text : addedServers[i].url,
					visible : false
				});
				row.add(layerIndexRow);
				sectionServer.add(row);
			};
		};
		//Insert the server section
		data.push(sectionServer);
	};
};
tblCoverageList.setData(data);
win.add(tblCoverageList);

tblCoverageList.addEventListener('click', function(e) {
	// e.row contains information about the row that was clicked.
	// e.row.title = Your Row Title
	// children = the objects added to your row.
	win1.serverIndex = e.row.children[3].text;
	win1.layerIndex = e.row.children[4].text;
	if (Ti.App.isAndroid == true) {
		win1.open();
	} else {
		win.padre.openWindow(win1);	
	};
});
