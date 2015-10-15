var getInfo        = require("./operations").getInfo;
var saveToDataBase = require("./operations").saveToDataBase;
var InfoBus        = require("./infoBus")
var prepareData    = require("./operations").prepareData;
var startDataBase  = require("./operations").startDataBase;
var line, numberLines;

getInfo(function(lines){
    startDataBase(function(err, collection){
       if(err) console.log(err);
       else{
           
            numberLines = lines.length;
            console.log("Numero de linhas: " + numberLines);
            
            for(line = 0 ; line < numberLines; line++){
                prepareData(lines[line], function(response){   
                    saveToDataBase(response, collection, function(err){
                        if(err) console.log(err);
                        else{
                            console.log("["+ response.sign + "] Saved")
                        }
                    });
                });
                if(line === numberLines-1)  process.exit();
            }     
           }
       })    
      
})

