#target photoshop
cTID = function(s) { return app.charIDToTypeID(s); };
sTID = function(s) { return app.stringIDToTypeID(s); };
var layerName = "colorage";
function layercomper(layerName) {
  // Make
  function step1(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putClass(sTID("compsClass"));
    desc1.putReference(cTID('null'), ref1);
    var desc2 = new ActionDescriptor();
    desc2.putBoolean(sTID("useVisibility"), true);
    desc2.putBoolean(sTID("usePosition"), false);
    desc2.putBoolean(sTID("useAppearance"), false);
    desc2.putString(cTID('Ttl '), layerName);
    desc1.putObject(cTID('Usng'), sTID("compsClass"), desc2);
    executeAction(cTID('Mk  '), desc1, dialogMode);
  };

  step1();      // Make
};



layercomper.main = function () {
    var myDoc = app.activeDocument;
    myDoc.layerComps.removeAll();
    var layersCount = myDoc.layers.length;
    for (var i = 0; i < layersCount; i++) {
        myDoc.layers[i].visible = false;
    };
    
    for (var i = 0; i < layersCount; i++) {
        myDoc.layers[i].visible = true;
        layercomper(myDoc.layers[i].name);
        myDoc.layers[i].visible = false;
    };
};
layercomper.main();
"layercomper.jsx"
