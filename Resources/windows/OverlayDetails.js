/**
 * @author Francesco
 */
// this sets the background color of the master UIView (when there are no windows/tab groups on it)
//Titanium.UI.setBackgroundColor('#000');
//Titanium.UI.setBackgroundImage('/images/bgImage.png');

//Parent window = Overlays.js
//reference the current window
var win = Titanium.UI.currentWindow;
win.title = L('OverlayDetails_win_title');
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

// Da modificare... poi dovrà aprirsi direttamente la mappa con il layer
var win1 = Titanium.UI.createWindow({
	url : '/app.js',
	title : 'Map',
	//title : L('Overlays_win_title'),
	modal : true,
	//backgroundColor : '#fff',
	backgroundImage : '/images/bgImage.png'
});
win1.padre = win.padre;

//Read server list from "mapLayers" property
//Empty array
var mapLayers = [];
if (Ti.App.mapLayers != undefined) {
	mapLayers = Ti.App.mapLayers;
};
if (mapLayers.length > win.mapLayerIndex) {
	var mapLayer = mapLayers[win.mapLayerIndex];
	
	var layerImage = Ti.Utils.base64decode(mapLayer.strImage); 
	
	//create the tableView
	var tblOverlayDetails = Titanium.UI.createTableView({
		//width : w - 20,
		//height : h - 120,
		width : pWidth - 20,
		height : pHeight - 120,
		top : 20,
		//top : 490,
		left : 10,
		backgroundColor : '#B0C4DE',
		borderRadius : 12,
		borderColor : '#AFEEEE',
		borderWidth : 2,
		minRowHeight : 90
	});
	
	var sectionLayerImage = Ti.UI.createTableViewSection({
		//headerTitle : 'CoverageInfo'
		headerTitle : L('OverlayDetails_section1_title')
	});
	
	//create a table row
	var row = Titanium.UI.createTableViewRow({
		hasChild : false,
		className : 'layerImage-row',
		width : tblOverlayDetails.width,
		rowHeight : 430
	});
	//create the view for the layer
	var imgViewLayer = Titanium.UI.createImageView({
		//image: layerImage,
		//width: pWidth*0.8,
		width: 400,
		height: 400,
		//left: '10%',
		left: (tblOverlayDetails.width - 400)/2,
		//left: 10,
		top: 10,
		borderColor: "#C0C0C0",
		borderWidth: 2,
		//backgroundColor: "#FFFFFF",
		opacity: 1.0
	});
	
	imgViewLayer.image = layerImage;
	//win.add(imgViewLayer);
	row.add(imgViewLayer);
	sectionLayerImage.add(row);
	
	var sectionImageSettings = Ti.UI.createTableViewSection({
		//headerTitle : 'ImageSettings'
		headerTitle : L('OverlayDetails_section2_title')
	});
	
	//create a table row
	var row = Titanium.UI.createTableViewRow({
		hasChild : false,
		width : tblOverlayDetails.width,
		className : 'imageSettings-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'Visible',
		text : L('OverlayDetails_label1'),
		font : {
			fontSize : 22,
			fontWeight : 'bold'
		},
		color : '#000',
		left : 10,
		top : 5,
		width : 'auto',
		height : 30
	});
	row.add(titleRow);
	var basicSwitch = Ti.UI.createSwitch({
		titleOn:'ON',
	  	titleOff:'OFF',
	  	value: true,
		//top: 420, 
		//left: (w - 400)/2,
		right: 10,
		top: 10,
	 	width: 80, 
	  	height: 80
	});
	//win.add(basicSwitch);
	basicSwitch.addEventListener('change',function(e){
		Ti.API.info('Switch value: ' + basicSwitch.value);
	  	if (basicSwitch.value == true) {
	  		opacitySlider.visible = true;
	  	} else {
	  		opacitySlider.visible = false;
	  	};
	});
	row.add(basicSwitch);
	sectionImageSettings.add(row);
	
	//create a table row
	var row = Titanium.UI.createTableViewRow({
		hasChild : false,
		width : tblOverlayDetails.width,
		className : 'imageSettings-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'Opacity',
		text : L('OverlayDetails_label2'),
		font : {
			fontSize : 22,
			fontWeight : 'bold'
		},
		color : '#000',
		left : 10,
		top : 5,
		width : 'auto',
		height : 30
	});
	row.add(titleRow);
	var opacitySlider = Titanium.UI.createSlider({
		//top: 420, 
		top: 35, 
	 	left: 20,
		//left: (w - 400)/2 + 80,
	 	width: row.width - 40, 
	 	min: 0, 
	 	max: 100, 
	 	value: 100 
	});
	opacitySlider.addEventListener('change',function(e){
	    //var newValue = e.value + step;
	    imgViewLayer.opacity = e.value/100;
	});
	//win.add(opacitySlider);
	row.add(opacitySlider);
	sectionImageSettings.add(row);
	
	var sectionCoverageInfo = Ti.UI.createTableViewSection({
		//headerTitle : 'CoverageInfo'
		headerTitle : L('OverlayDetails_section3_title')
	});
	
	//create a table row
	var row = Titanium.UI.createTableViewRow({
		hasChild : false,
		width : tblOverlayDetails.width,
		className : 'coverageInfo-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'Coverage ID',
		text : L('OverlayDetails_row1_title'),
		font : {
			fontSize : 22,
			fontWeight : 'bold'
		},
		color : '#000',
		left : 10,
		top : 5,
		width : 'auto',
		height : 30
	});
	//description row
	var descriptionRow = Titanium.UI.createLabel({
		text : mapLayer.layerId,
		font : {
			fontSize : 20,
			fontWeight : 'normal'
		},
		//color : '#2f4f4f',
		color : '#fff',
		left : 10,
		top : 35,
		width : 'auto',
		height : 'auto'
	});
	row.add(titleRow);
	row.add(descriptionRow);
	sectionCoverageInfo.add(row);
	
	//create a table row
	var row = Titanium.UI.createTableViewRow({
		hasChild : false,
		width : tblOverlayDetails.width,
		className : 'coverageInfo-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'Server name',
		text : L('OverlayDetails_row2_title'),
		font : {
			fontSize : 22,
			fontWeight : 'bold'
		},
		color : '#000',
		left : 10,
		top : 5,
		width : 'auto',
		height : 30
	});
	//description row
	var descriptionRow = Titanium.UI.createLabel({
		text : mapLayer.serverName,
		font : {
			fontSize : 20,
			fontWeight : 'normal'
		},
		//color : '#2f4f4f',
		color : '#fff',
		left : 10,
		top : 35,
		width : 'auto',
		height : 'auto'
	});
	row.add(titleRow);
	row.add(descriptionRow);
	sectionCoverageInfo.add(row);
	
	//create a table row
	var row = Titanium.UI.createTableViewRow({
		hasChild : false,
		width : tblOverlayDetails.width,
		className : 'coverageInfo-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'Server URL',
		text : L('OverlayDetails_row3_title'),
		font : {
			fontSize : 22,
			fontWeight : 'bold'
		},
		color : '#000',
		left : 10,
		top : 5,
		width : 'auto',
		height : 30
	});
	//description row
	var descriptionRow = Titanium.UI.createLabel({
		text : mapLayer.serverUrl,
		font : {
			fontSize : 20,
			fontWeight : 'normal'
		},
		//color : '#2f4f4f',
		color : '#fff',
		left : 10,
		top : 35,
		width : 'auto',
		height : 'auto'
	});
	row.add(titleRow);
	row.add(descriptionRow);
	sectionCoverageInfo.add(row);
	
	var sectionImageInfo = Ti.UI.createTableViewSection({
		//headerTitle : 'CoverageInfo'
		headerTitle : L('OverlayDetails_section4_title')
	});
	
	//create a table row
	var row = Titanium.UI.createTableViewRow({
		hasChild : false,
		width : tblOverlayDetails.width,
		className : 'imageInfo-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'CRS',
		text : L('OverlayDetails_row4_title'),
		font : {
			fontSize : 22,
			fontWeight : 'bold'
		},
		color : '#000',
		left : 10,
		top : 5,
		width : 'auto',
		height : 30
	});
	//description row
	var descriptionRow = Titanium.UI.createLabel({
		text : mapLayer.crs,
		font : {
			fontSize : 20,
			fontWeight : 'normal'
		},
		//color : '#2f4f4f',
		color : '#fff',
		left : 10,
		top : 35,
		width : 'auto',
		height : 'auto'
	});
	row.add(titleRow);
	row.add(descriptionRow);
	sectionImageInfo.add(row);
	
	//create a table row
	var row = Titanium.UI.createTableViewRow({
		hasChild : false,
		width : tblOverlayDetails.width,
		className : 'imageInfo-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'minLat',
		text : L('OverlayDetails_row5_title'),
		font : {
			fontSize : 22,
			fontWeight : 'bold'
		},
		color : '#000',
		left : 10,
		top : 5,
		width : 'auto',
		height : 30
	});
	//description row
	var descriptionRow = Titanium.UI.createLabel({
		text : mapLayer.minLat,
		font : {
			fontSize : 20,
			fontWeight : 'normal'
		},
		//color : '#2f4f4f',
		color : '#fff',
		left : 10,
		top : 35,
		width : 'auto',
		height : 'auto'
	});
	row.add(titleRow);
	row.add(descriptionRow);
	sectionImageInfo.add(row);
	
	//create a table row
	var row = Titanium.UI.createTableViewRow({
		hasChild : false,
		width : tblOverlayDetails.width,
		className : 'imageInfo-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'minLon',
		text : L('OverlayDetails_row6_title'),
		font : {
			fontSize : 22,
			fontWeight : 'bold'
		},
		color : '#000',
		left : 10,
		top : 5,
		width : 'auto',
		height : 30
	});
	//description row
	var descriptionRow = Titanium.UI.createLabel({
		text : mapLayer.minLon,
		font : {
			fontSize : 20,
			fontWeight : 'normal'
		},
		//color : '#2f4f4f',
		color : '#fff',
		left : 10,
		top : 35,
		width : 'auto',
		height : 'auto'
	});
	row.add(titleRow);
	row.add(descriptionRow);
	sectionImageInfo.add(row);
	
	//create a table row
	var row = Titanium.UI.createTableViewRow({
		hasChild : false,
		width : tblOverlayDetails.width,
		className : 'imageInfo-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'maxLat',
		text : L('OverlayDetails_row7_title'),
		font : {
			fontSize : 22,
			fontWeight : 'bold'
		},
		color : '#000',
		left : 10,
		top : 5,
		width : 'auto',
		height : 30
	});
	//description row
	var descriptionRow = Titanium.UI.createLabel({
		text : mapLayer.maxLat,
		font : {
			fontSize : 20,
			fontWeight : 'normal'
		},
		//color : '#2f4f4f',
		color : '#fff',
		left : 10,
		top : 35,
		width : 'auto',
		height : 'auto'
	});
	row.add(titleRow);
	row.add(descriptionRow);
	sectionImageInfo.add(row);
	
	//create a table row
	var row = Titanium.UI.createTableViewRow({
		hasChild : false,
		width : tblOverlayDetails.width,
		className : 'imageInfo-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'maxLon',
		text : L('OverlayDetails_row8_title'),
		font : {
			fontSize : 22,
			fontWeight : 'bold'
		},
		color : '#000',
		left : 10,
		top : 5,
		width : 'auto',
		height : 30
	});
	//description row
	var descriptionRow = Titanium.UI.createLabel({
		text : mapLayer.maxLon,
		font : {
			fontSize : 20,
			fontWeight : 'normal'
		},
		//color : '#2f4f4f',
		color : '#fff',
		left : 10,
		top : 35,
		width : 'auto',
		height : 'auto'
	});
	row.add(titleRow);
	row.add(descriptionRow);
	sectionImageInfo.add(row);
	
	//create a table row
	var row = Titanium.UI.createTableViewRow({
		hasChild : false,
		width : tblOverlayDetails.width,
		className : 'imageInfo-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'Width',
		text : L('OverlayDetails_row9_title'),
		font : {
			fontSize : 22,
			fontWeight : 'bold'
		},
		color : '#000',
		left : 10,
		top : 5,
		width : 'auto',
		height : 30
	});
	//description row
	var descriptionRow = Titanium.UI.createLabel({
		text : mapLayer.imgWidth,
		font : {
			fontSize : 20,
			fontWeight : 'normal'
		},
		//color : '#2f4f4f',
		color : '#fff',
		left : 10,
		top : 35,
		width : 'auto',
		height : 'auto'
	});
	row.add(titleRow);
	row.add(descriptionRow);
	sectionImageInfo.add(row);
	
	//create a table row
	var row = Titanium.UI.createTableViewRow({
		hasChild : false,
		width : tblOverlayDetails.width,
		className : 'imageInfo-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'Height',
		text : L('OverlayDetails_row10_title'),
		font : {
			fontSize : 22,
			fontWeight : 'bold'
		},
		color : '#000',
		left : 10,
		top : 5,
		width : 'auto',
		height : 30
	});
	//description row
	var descriptionRow = Titanium.UI.createLabel({
		text : mapLayer.imgHeight,
		font : {
			fontSize : 20,
			fontWeight : 'normal'
		},
		//color : '#2f4f4f',
		color : '#fff',
		left : 10,
		top : 35,
		width : 'auto',
		height : 'auto'
	});
	row.add(titleRow);
	row.add(descriptionRow);
	sectionImageInfo.add(row);
	
	//create a table row
	var row = Titanium.UI.createTableViewRow({
		hasChild : false,
		width : tblOverlayDetails.width,
		className : 'imageInfo-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'Bands',
		text : L('OverlayDetails_row11_title'),
		font : {
			fontSize : 22,
			fontWeight : 'bold'
		},
		color : '#000',
		left : 10,
		top : 5,
		width : 'auto',
		height : 30
	});
	var str = '';
	for (var i = 0; i < mapLayer.bands.length; i++) {
		str += mapLayer.bands[i] + '\n';
	};
	str = str.substr(0, (str.length - 1));
	//description row
	var descriptionRow = Titanium.UI.createLabel({
		text : str,
		font : {
			fontSize : 20,
			fontWeight : 'normal'
		},
		//color : '#2f4f4f',
		color : '#fff',
		left : 10,
		top : 35,
		width : 'auto',
		height : 'auto'
	});
	row.add(titleRow);
	row.add(descriptionRow);
	sectionImageInfo.add(row);
	
	//finally, set the data property of the tableView to our sections
	tblOverlayDetails.data = [sectionLayerImage, sectionImageSettings, sectionCoverageInfo, sectionImageInfo];
	
	win.add(tblOverlayDetails);
	
	
	/*
	 //Questo evento serve a rimuovere la tabella, che altrimenti rimarrebbe come sfondo, creando righe sovrapposte
	 win.addEventListener('blur', removeTable);
	 function removeTable(e) {
	 win.remove(tblOverlayDetails);
	 };
	*/
};

