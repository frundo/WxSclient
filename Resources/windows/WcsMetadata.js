/**
 * @author Francesco
 */

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
Titanium.UI.setBackgroundImage('/images/bgImage.png');

//Parent window = WcsServer
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
	url : '/windows/ViewXml.js',
	//title : 'XML',
	title : L('ViewXml_win_title'),
	modal : true,
	//backgroundColor : '#fff',
	backgroundImage : '/images/bgImage.png',
	xml : win.xml
});
win1.padre = win.padre;

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

var sectionXmlResponse = Ti.UI.createTableViewSection({
	//headerTitle : 'XML Server Response'
	headerTitle : L('WcsMetadata_section1_title')
});

//create a table row
var row = Titanium.UI.createTableViewRow({
	width : tblWcsServer.width,
	height : 90,
	hasChild : false,
	className : 'response-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'View XML',
	text : L('WcsMetadata_row1_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : (row.height - 22) / 2,
	height : 30,
	width : row.width
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
row.addEventListener('click', function(e) {
	// e.row contains information about the row that was clicked.
	// e.row.title = Your Row Title
	// children = the objects added to your row.
	if (Ti.App.isAndroid == true) {
		win1.open();
	} else {
		win.padre.openWindow(win1);	
	};
});
sectionXmlResponse.add(row);

var sectionServiceIdentification = Ti.UI.createTableViewSection({
	//headerTitle : 'Service Identification'
	headerTitle : L('WcsMetadata_section2_title')
});

var owsServiceIdentification = win.xml.documentElement.getElementsByTagName("ows:ServiceIdentification");
var owsServiceProvider = win.xml.documentElement.getElementsByTagName("ows:ServiceProvider");

//create a Title row
var row = Titanium.UI.createTableViewRow({
	width : tblWcsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ServiceIdentification-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Title',
	text : L('WcsMetadata_row2_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : owsServiceIdentification.item(0).getElementsByTagName("ows:Title").item(0).textContent,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	//color : '#000',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionServiceIdentification.add(row);

//create a Abstract row
var row = Titanium.UI.createTableViewRow({
	width : tblWcsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ServiceIdentification-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Abstract',
	text : L('WcsMetadata_row3_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : owsServiceIdentification.item(0).getElementsByTagName("ows:Abstract").item(0).textContent,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionServiceIdentification.add(row);

//create a Keywords row
var row = Titanium.UI.createTableViewRow({
	width : tblWcsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ServiceIdentification-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Keywords',
	text : L('WcsMetadata_row4_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	//text : items.item(0).getElementsByTagName("ows:Keyword").item(i).textContent,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
//loop each keyword in the xml
for (var i = 0; i < owsServiceIdentification.item(0).getElementsByTagName("ows:Keyword").length; i++) {
	descriptionRow.text += owsServiceIdentification.item(0).getElementsByTagName("ows:Keyword").item(i).textContent + "\n";
}
row.add(titleRow);
row.add(descriptionRow);
sectionServiceIdentification.add(row);

//create a Service Type row
var row = Titanium.UI.createTableViewRow({
	width : tblWcsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ServiceIdentification-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Service Type',
	text : L('WcsMetadata_row5_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : owsServiceIdentification.item(0).getElementsByTagName("ows:ServiceType").item(0).textContent,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionServiceIdentification.add(row);

//create a Service Version row
var row = Titanium.UI.createTableViewRow({
	width : tblWcsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ServiceIdentification-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Service Version',
	text : L('WcsMetadata_row6_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : owsServiceIdentification.item(0).getElementsByTagName("ows:ServiceTypeVersion").item(0).textContent,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionServiceIdentification.add(row);

//create a Profiles row
var row = Titanium.UI.createTableViewRow({
	width : tblWcsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ServiceIdentification-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Profiles',
	text : L('WcsMetadata_row7_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	//text : owsServiceIdentification.item(0).getElementsByTagName("ows:Profile").item(i).textContent,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
//loop each Profile in the xml
for (var i = 0; i < owsServiceIdentification.item(0).getElementsByTagName("ows:Profile").length; i++) {
	descriptionRow.text += owsServiceIdentification.item(0).getElementsByTagName("ows:Profile").item(i).textContent + "\n\n";
}
descriptionRow.text = descriptionRow.text.substr(0, descriptionRow.text.length - 2);
row.add(titleRow);
row.add(descriptionRow);
sectionServiceIdentification.add(row);

//create a Fees row
var row = Titanium.UI.createTableViewRow({
	width : tblWcsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ServiceIdentification-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Fees',
	text : L('WcsMetadata_row8_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : owsServiceIdentification.item(0).getElementsByTagName("ows:Fees").item(0).textContent,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionServiceIdentification.add(row);

//create a Access Constraints row
var row = Titanium.UI.createTableViewRow({
	width : tblWcsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ServiceIdentification-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Access Constraints',
	text : L('WcsMetadata_row9_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : owsServiceIdentification.item(0).getElementsByTagName("ows:AccessConstraints").item(0).textContent,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionServiceIdentification.add(row);

var sectionServiceProvider = Ti.UI.createTableViewSection({
	//headerTitle : 'Service Provider'
	headerTitle : L('WcsMetadata_section3_title')
});

//create a Provider name row
var row = Titanium.UI.createTableViewRow({
	width : tblWcsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ServiceProvider-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Provider name',
	text : L('WcsMetadata_row10_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : owsServiceProvider.item(0).getElementsByTagName("ows:ProviderName").item(0).textContent,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionServiceProvider.add(row);

//create a Provider site row
var row = Titanium.UI.createTableViewRow({
	width : tblWcsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ServiceProvider-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Provider site',
	text : L('WcsMetadata_row11_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : owsServiceProvider.item(0).getElementsByTagName("ows:ProviderSite").item(0).getAttribute("xlink:href"),
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionServiceProvider.add(row);

//create a Individual name row
var row = Titanium.UI.createTableViewRow({
	width : tblWcsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ServiceProvider-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Individual name',
	text : L('WcsMetadata_row12_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : owsServiceProvider.item(0).getElementsByTagName("ows:IndividualName").item(0).textContent,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionServiceProvider.add(row);

//create a Position row
var row = Titanium.UI.createTableViewRow({
	width : tblWcsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ServiceProvider-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Position',
	text : L('WcsMetadata_row13_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : owsServiceProvider.item(0).getElementsByTagName("ows:PositionName").item(0).textContent,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionServiceProvider.add(row);

//create a Role row
var row = Titanium.UI.createTableViewRow({
	width : tblWcsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ServiceProvider-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Role',
	text : L('WcsMetadata_row14_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : owsServiceProvider.item(0).getElementsByTagName("ows:Role").item(0).textContent,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionServiceProvider.add(row);

//create a Telephone row
var row = Titanium.UI.createTableViewRow({
	width : tblWcsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ServiceProvider-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Telephone',
	text : L('WcsMetadata_row15_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : owsServiceProvider.item(0).getElementsByTagName("ows:Phone").item(0).getElementsByTagName("ows:Voice").item(0).textContent,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionServiceProvider.add(row);

//create a Facsimile row
var row = Titanium.UI.createTableViewRow({
	width : tblWcsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ServiceProvider-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Facsimile',
	text : L('WcsMetadata_row16_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : owsServiceProvider.item(0).getElementsByTagName("ows:Phone").item(0).getElementsByTagName("ows:Facsimile").item(0).textContent,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionServiceProvider.add(row);

//create a Address row
var row = Titanium.UI.createTableViewRow({
	width : tblWcsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ServiceProvider-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Address',
	text : L('WcsMetadata_row17_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : owsServiceProvider.item(0).getElementsByTagName("ows:Address").item(0).getElementsByTagName("ows:DeliveryPoint").item(0).textContent,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionServiceProvider.add(row);

//create a City row
var row = Titanium.UI.createTableViewRow({
	width : tblWcsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ServiceProvider-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'City',
	text : L('WcsMetadata_row18_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : owsServiceProvider.item(0).getElementsByTagName("ows:Address").item(0).getElementsByTagName("ows:City").item(0).textContent,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionServiceProvider.add(row);

//create a State or Province row
var row = Titanium.UI.createTableViewRow({
	width : tblWcsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ServiceProvider-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'State or Province',
	text : L('WcsMetadata_row19_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : owsServiceProvider.item(0).getElementsByTagName("ows:Address").item(0).getElementsByTagName("ows:AdministrativeArea").item(0).textContent,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionServiceProvider.add(row);

//create a Post code row
var row = Titanium.UI.createTableViewRow({
	width : tblWcsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ServiceProvider-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Post code',
	text : L('WcsMetadata_row20_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : owsServiceProvider.item(0).getElementsByTagName("ows:Address").item(0).getElementsByTagName("ows:PostalCode").item(0).textContent,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionServiceProvider.add(row);

//create a Country row
var row = Titanium.UI.createTableViewRow({
	width : tblWcsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ServiceProvider-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Country',
	text : L('WcsMetadata_row21_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : owsServiceProvider.item(0).getElementsByTagName("ows:Address").item(0).getElementsByTagName("ows:Country").item(0).textContent,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionServiceProvider.add(row);

//create a e-Mail row
var row = Titanium.UI.createTableViewRow({
	width : tblWcsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ServiceProvider-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'e-Mail',
	text : L('WcsMetadata_row22_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : owsServiceProvider.item(0).getElementsByTagName("ows:Address").item(0).getElementsByTagName("ows:ElectronicMailAddress").item(0).textContent,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionServiceProvider.add(row);

//create a Online Resource row
var row = Titanium.UI.createTableViewRow({
	width : tblWcsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ServiceProvider-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Online Resource',
	text : L('WcsMetadata_row23_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : owsServiceProvider.item(0).getElementsByTagName("ows:OnlineResource").item(0).getAttribute("xlink:href"),
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionServiceProvider.add(row);

//create a Hours of service row
var row = Titanium.UI.createTableViewRow({
	width : tblWcsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ServiceProvider-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Hours of service',
	text : L('WcsMetadata_row24_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : owsServiceProvider.item(0).getElementsByTagName("ows:HoursOfService").item(0).textContent,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionServiceProvider.add(row);

//create a Contact Instructions row
var row = Titanium.UI.createTableViewRow({
	width : tblWcsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ServiceProvider-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Contact Instructions',
	text : L('WcsMetadata_row25_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : owsServiceProvider.item(0).getElementsByTagName("ows:ContactInstructions").item(0).textContent,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionServiceProvider.add(row);

tblWcsServer.data = [sectionXmlResponse, sectionServiceIdentification, sectionServiceProvider];
win.add(tblWcsServer);
