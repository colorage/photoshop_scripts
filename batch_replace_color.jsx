var dlg = new Window('dialog', "Replace Color");
dlg.bounds = {x:1000, y:200, width:190, height:140};
dlg.labelInput = dlg.add('statictext', {x:10, y:10, width:100, height:20}, "Input Color");
dlg.labelInputGuide = dlg.add('statictext', {x:10, y:30, width:15, height:20}, "#");
dlg.editInput = dlg.add('edittext', {x:25, y:30, width:50, height:20});
dlg.labelOutput = dlg.add('statictext', {x:100, y:10, width:100, height:20}, "Output Color");
dlg.labelOutputGuide = dlg.add('statictext', {x:100, y:30, width:15, height:20}, "#");
dlg.editOutput = dlg.add('edittext', {x:115, y:30, width:50, height:20});
dlg.checkShapes = dlg.add('checkbox', {x:10, y:55, width:70, height:20}, 'Shapes');
dlg.checkFonts = dlg.add('checkbox', {x:110, y:55, width:70, height:20}, 'Fonts');

dlg.buttonRun = dlg.add('button', {x:10, y:105, width:170, height:25}, "Replace");
dlg.checkShapes.value = true;

dlg.buttonRun.onClick=function() {
    if (dlg.checkShapes.value == true) {
        changeShapeColor(app.activeDocument, dlg.editInput.text, dlg.editOutput.text);
    }
    if (dlg.checkFonts.value == true) {
        changeFontColor(app.activeDocument, dlg.editInput.text, dlg.editOutput.text);
    }
    alert("Done");
    dlg.hide();
}

dlg.show();

function changeShapeColor(obj, shapeColorInput, shapeColorOutput) {
    for( var i = obj.artLayers.length-1; 0 <= i; --i) {
        try {
            if (obj.artLayers[i].kind == "LayerKind.SOLIDFILL") {
                app.activeDocument.activeLayer = obj.artLayers[i]; 
                if (getFillColor().rgb.hexValue == shapeColorInput.toUpperCase()) {
                    app.foregroundColor.rgb.hexValue = shapeColorOutput;
                    changeSolidFillLayerColor(app.foregroundColor);
                 }
            }
        } 
        catch (e) {
        }
    }
    for( var i = obj.layerSets.length-1; 0 <= i; --i) {
        changeShapeColor(obj.layerSets[i], shapeColorInput, shapeColorOutput);
    }
}

function getFillColor(){
    var ref = new ActionReference();
    ref.putEnumerated( stringIDToTypeID( "contentLayer" ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Trgt" ));
    var ref1= executeActionGet( ref );
    var list =  ref1.getList( charIDToTypeID( "Adjs" ) ) ;
    var solidColorLayer = list.getObjectValue(0);        
    var color = solidColorLayer.getObjectValue(charIDToTypeID('Clr ')); 
    var fillcolor = new SolidColor;
    fillcolor.rgb.red = color.getDouble(charIDToTypeID('Rd  '));
    fillcolor.rgb.green = color.getDouble(charIDToTypeID('Grn '));
    fillcolor.rgb.blue = color.getDouble(charIDToTypeID('Bl  '));
    
    return fillcolor;
}

function changeSolidFillLayerColor(sColor) {
    var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putEnumerated( stringIDToTypeID('contentLayer'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
    desc.putReference( charIDToTypeID('null'), ref );
        var fillDesc = new ActionDescriptor();
            var colorDesc = new ActionDescriptor();
            colorDesc.putDouble( charIDToTypeID('Rd  '), sColor.rgb.red );
            colorDesc.putDouble( charIDToTypeID('Grn '), sColor.rgb.green );
            colorDesc.putDouble( charIDToTypeID('Bl  '), sColor.rgb.blue );
        fillDesc.putObject( charIDToTypeID('Clr '), charIDToTypeID('RGBC'), colorDesc );
    desc.putObject( charIDToTypeID('T   '), stringIDToTypeID('solidColorLayer'), fillDesc );
    executeAction( charIDToTypeID('setd'), desc, DialogModes.NO );
}

function changeFontColor(obj, fontColorInput, fontColorOutput) {
    for( var i = obj.artLayers.length-1; 0 <= i; --i) {
        try {
            if (obj.artLayers[i].kind == "LayerKind.TEXT") {
                if (obj.artLayers[i].textItem.color.rgb.hexValue == fontColorInput.toUpperCase()) {
                    obj.artLayers[i].textItem.color.rgb.hexValue = fontColorOutput.toUpperCase();
                 }
            }
        } 
        catch (e) {
        }
    }
    for( var i = obj.layerSets.length-1; 0 <= i; --i) {
        changeFontColor(obj.layerSets[i], fontColorInput, fontColorOutput);
    }
}
