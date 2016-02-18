app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;
app.activeDocument.colorSamplers.removeAll();


var docWidth = app.activeDocument.width;
var docHeight = app.activeDocument.height;
var total = docWidth * docHeight;

var dlg = new Window('dialog', "Input phrase");
dlg.bounds = {
    x: 1000,
    y: 200,
    width: 180,
    height: 60
};
dlg.editInput = dlg.add('edittext', {
    x: 0,
    y: 0,
    width: 180,
    height: 20
});
dlg.buttonRun = dlg.add('button', {
    x: 0,
    y: 30,
    width: 180,
    height: 30
}, "Run");

dlg.buttonRun.shortcutKey = "ENTER";
dlg.defaultElement = dlg.buttonRun;
dlg.editInput.active = true;
var namePart = "";
dlg.buttonRun.onClick = function() {
    userText = dlg.editInput.text;
    userText.replace(/\ |\"|\[|\]|\'|\-|\_|\.|\,/, "");
    userText.replace(/\r?\n|\r/g, "");
    dlg.hide();
}

dlg.show();

function addTextLayer(count, currentX, currentY, symbol) {
    var docRef = activeDocument;
    var myLayerRef = docRef.artLayers.add();
    myLayerRef.kind = LayerKind.TEXT;
    myLayerRef.name = count + "/" + total;


    var myTextRef = myLayerRef.textItem;

    myTextRef.contents = symbol;
    myTextRef.position = [currentX, currentY];
    myLayerRef.visible = false;
}

function setSymbolColor(currentX, currentY) {

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
for (var currentY = 1; currentY <= docHeight; currentY++) {
    for (var currentX = 1; currentX <= docWidth; currentX++) {

        count++;
        addTextLayer(count, currentX, currentY, userText[count - 1]);
        setSymbolColor(currentX - 1, currentY - 1);
    }
}
