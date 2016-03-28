var getInfo        = require("./operations").getInfo;
var saveToDataBase = require("./operations").saveToDataBase;
var InfoBus        = require("./infoBus")
var prepareData    = require("./operations").prepareData;
var startDataBase  = require("./operations").startDataBase;
var getFiles       = require("./operations").getFiles;
var line, numberLines;
var countFiles = 0;
var countSuccess = 0;

startDataBase(function(err, collection){
    if(err) console.log(err);
    else{
       getInfo(function(lines, index, numberFiles){
            numberLines = lines.length;
            console.log("Numero de linhas: " + numberLines);
            
            var busInfos = [];
            var initialLine = 1;
            for(line = initialLine; line < numberLines; line++){
                if (lines[line].length == 0) continue;
                var response = prepareData(lines[line]);
                busInfos.push(response);
            }
            
            saveToDataBase(busInfos, collection, function(err, response) {
                if(err) console.log(err);
                else{
                    console.log(++countSuccess + " [SUCCESS] Order: " + response.ops[0].order);
                }
            });
        })
    }
});