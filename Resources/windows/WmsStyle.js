/**
 * @author Francesco
 */

//Parent window = LayerMetadata
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

var styleItem = Ti.XML.Element;
styleItem = win.xmlItem;

//Create the tableView
var tblStyle = Titanium.UI.createTableView({
	width : pWidth - 20,
	height : pHeight - 110,
	top : 20,
	left : 10,
	backgroundColor : '#B0C4DE',
	borderRadius : 12,
	borderColor : '#AFEEEE',
	borderWidth : 2
});

var sectionStyleDescription = Ti.UI.createTableViewSection({
	//headerTitle : 'Style description'
	headerTitle : L('WmsStyle_section1_title')
});

//create a Name row
var row = Titanium.UI.createTableViewRow({
	width : tblStyle.width,
	//height : 90,
	hasChild : false,
	className : 'Style-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Name',
	text : L('WmsStyle_row1_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width - 20
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : styleItem.getElementsByTagName("Name").item(0).textContent,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	//color : '#fff',
	color : '#000',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionStyleDescription.add(row);

//create a Title row
var row = Titanium.UI.createTableViewRow({
	width : tblStyle.width,
	//height : 90,
	hasChild : false,
	className : 'Style-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Title',
	text : L('WmsStyle_row2_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width - 20
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : styleItem.getElementsByTagName("Title").item(0).textContent,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	//color : '#fff',
	color : '#000',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionStyleDescription.add(row);

//create a Abstract row
var row = Titanium.UI.createTableViewRow({
	width : tblStyle.width,
	//height : 90,
	hasChild : false,
	className : 'Style-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Abstract',
	text : L('WmsStyle_row3_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width - 20
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : styleItem.getElementsByTagName("Abstract").item(0).textContent,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	//color : '#fff',
	color : '#000',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionStyleDescription.add(row);

var sectionLegendURL = Ti.UI.createTableViewSection({
	//headerTitle : 'Legend'
	headerTitle : L('WmsStyle_section2_title')
});

//create a LegendURL row
var row = Titanium.UI.createTableViewRow({
	width : tblStyle.width,
	//height : 90,
	hasChild : false,
	className : 'Style-row'
});

//loop each LegendURL in the xml
for (var i = 0; i < styleItem.getElementsByTagName("LegendURL").length; i++) {
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'Format',
		text : styleItem.getElementsByTagName("LegendURL").item(i).getElementsByTagName("Format").item(0).textContent,
		font : {
			fontSize : 22,
			fontWeight : 'bold'
		},
		color : '#000',
		left : 10,
		top : 5,
		height : 30,
		width : row.width - 20
	});
	//description row
	var descriptionRow = Titanium.UI.createLabel({
		font : {
			fontSize : 20,
			fontWeight : 'normal'
		},
		//color : '#fff',
		color : '#000',
		left : 10,
		top : 35,
		width : row.width - 20,
		height : 'auto'
	});
	descriptionRow.text += "w: " + styleItem.getElementsByTagName("LegendURL").item(i).getAttribute("width");
	descriptionRow.text += ", h: " + styleItem.getElementsByTagName("LegendURL").item(i).getAttribute("height") + "\n";
	descriptionRow.text += "link: " + styleItem.getElementsByTagName("LegendURL").item(i).getElementsByTagName("OnlineResource").item(0).getAttribute("xlink:href");

	row.add(titleRow);
	row.add(descriptionRow);
	sectionLegendURL.add(row);	
}

tblStyle.data = [sectionStyleDescription, sectionLegendURL];
win.add(tblStyle);
