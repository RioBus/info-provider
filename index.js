var getInfo        = require("./operations").getInfo;
var saveToDataBase = require("./operations").saveToDataBase;
var InfoBus        = require("./infoBus")
var prepareData    = require("./operations").prepareData;
var startDataBase  = require("./operations").startDataBase;
var getFiles       = require("./operations").getFiles;
var line, numberLines;
var countFiles = 0;


startDataBase(function(err, collection){
    if(err) console.log(err);
    else{
    
       
       getInfo(function(lines, numberFiles){
        
        
        
        
            numberLines = lines.length;
            console.log("Numero de linhas: " + numberLines);
            
            for(line = 0 ; line < numberLines; line++){
                prepareData(lines[line], function(response){   
                   // console.log(response);
                    saveToDataBase(response, collection, function(err){
                        if(err) console.log(err);
                        else{
                           // console.log("["+ response.sign + "] Saved")
                        }
                    });
                });
            }  
            if(line === numberLines){console.log(line ); countFiles++; console.log(countFiles);}
            if(countFiles === numberFiles) process.exit(); 
        })
    }    

})


/*getFiles(function(files){
    for(var i = 0; i < files.length; i++)
    console.log(files[i]);
})*/

