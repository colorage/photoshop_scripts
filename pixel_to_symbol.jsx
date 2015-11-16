app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;
app.activeDocument.colorSamplers.removeAll();

var docWidth = app.activeDocument.width;
var docHeight = app.activeDocument.height;
var total = docWidth*docHeight;

//regex \ |\"|\[|\]|\'|\-|\_|\.|\,
var userText = "LoremIpsumissimplydummytextoftheprintingandtypesettingindustryLoremIpsumhasbeentheindustry'sstandarddummytexteversincethe1500swhenanunknownprintertookagalleyoftypeandscrambledittomakeatypespecimenbookIthassurvivednotonlyfivecenturiesbutalsotheleapintoelectronictypesettingremainingessentiallyunchangedItwaspopularisedinthe1960swiththereleaseofLetrasetsheetscontainingLoremIpsumpassagesandmorerecentlywithdesktoppublishingsoftwarelikeAldusPageMakerincludingversionsofLoremIpsum";

function addTextLayer(count, currentX, currentY, symbol){
    var docRef = activeDocument;
    var myLayerRef = docRef.artLayers.add();
		myLayerRef.kind = LayerKind.TEXT;
		myLayerRef.name = count+"/" +total;
      

		var myTextRef = myLayerRef.textItem;
        
        myTextRef.contents=symbol;
        myTextRef.position=[currentX, currentY];
        myLayerRef.visible=false;
}

function setSymbolColor(currentX, currentY){

var samplerX = currentX,
      samplerY = currentY,
colorSampler = app.activeDocument.colorSamplers.add([
    samplerX, 
    samplerY
]);
app.activeDocument.activeLayer.textItem.color = colorSampler.color;
app.activeDocument.colorSamplers.removeAll();
}
var count = 0;
 for (var currentY=1;currentY<=docHeight;currentY++){
for (var currentX=1;currentX<=docWidth;currentX++){
   
        count++;
    addTextLayer(count, currentX, currentY, userText[count-1]);
    setSymbolColor (currentX-1, currentY-1);
    }
}
