/**
 * @author Francesco
 */

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
Titanium.UI.setBackgroundImage('/images/bgImage.png');

//Parent window = WmsMetadata.js, WcsMetadata.js
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

//title label
var txtXML = Titanium.UI.createTextArea({
	font : {
		fontSize : 16,
		fontWeight : 'normal'
	},
	backgroundColor : '#B0C4DE',
	borderRadius : 12,
	borderColor : '#AFEEEE',
	borderWidth : 2,
	color : '#000',
	//color : '#fff',
	left : 10,
	top : 20,
	width : pWidth - 20,
	height : pHeight - 110,
	autocorrect: false,
	editable: false,
	//hintText: "Please wait..."
	hintText: L('ViewXml_wait_message')
});

//Converte un oggetto XML in un testo
txtXML.value = Titanium.XML.serializeToString(win.xml);

win.add(txtXML);
