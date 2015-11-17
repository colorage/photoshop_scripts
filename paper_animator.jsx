app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;
//create animator
function createAnimator(animatorWidth, animatorColor, framesCount) {
    activeDocument.artLayers.add();
    var i = 0;
    while (i < activeDocument.width){
        var percent = (i / activeDocument.width)*100; 
        app.activeDocument.layers[0].name = "Creating animator " + percent;
        selRegion = Array(Array(i, 0),
                                     Array(i, activeDocument.height),
                                     Array(i + animatorWidth*(framesCount-1), activeDocument.height),
                                     Array(i + animatorWidth*(framesCount-1), 0),
                                     Array(i, 0));
        app.activeDocument.selection.select(selRegion);
        activeDocument.selection.fill(animatorColor);
        i = i + animatorWidth * framesCount ;
    }
    app.activeDocument.layers[0].name = "Animator";
}

function createAnimationFrame(animatorWidth, offset, framesCount) {
    var i = offset;
    while (i < activeDocument.width){
        var percent = (i / activeDocument.width)*100; 
        app.activeDocument.activeLayer.name = "Creating animation frame " + percent;
        selRegion = Array(Array(i, 0),
                                     Array(i, activeDocument.height),
                                     Array(i + animatorWidth*(framesCount-1), activeDocument.height),
                                     Array(i + animatorWidth*(framesCount-1), 0),
                                     Array(i, 0));
        app.activeDocument.selection.select(selRegion);
        activeDocument.selection.clear();
        i = i + animatorWidth * framesCount ;
    }
    app.activeDocument.activeLayer.name = "Done";
}

var animatorColor = new SolidColor;
    animatorColor.rgb.red = 0;
    animatorColor.rgb.green = 0;
    animatorColor.rgb.blue = 0;

var animatorWidth = 1;
var framesCount = app.activeDocument.layers.length;
activeDocument.activeLayer = app.activeDocument.layers[0];
for (var i=0; i<framesCount; i++) {
    activeDocument.activeLayer = app.activeDocument.layers[i];
    createAnimationFrame (animatorWidth, i*animatorWidth, framesCount);
}
createAnimator (animatorWidth, animatorColor, framesCount);
activeDocument.selection.deselect();
