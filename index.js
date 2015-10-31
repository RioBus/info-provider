var getInfo        = require("./operations").getInfo;
var saveToDataBase = require("./operations").saveToDataBase;
var InfoBus        = require("./infoBus")
var prepareData    = require("./operations").prepareData;
var startDataBase  = require("./operations").startDataBase;
var getFiles       = require("./operations").getFiles;
var line, numberLines;
var countFiles = 0;


getInfo(function(lines, numberFiles){
    startDataBase(function(err, collection){
       if(err) console.log(err);
       else{
           
            console.log("Numero de linhas: "+ numberFiles);
           
            
            numberLines = lines.length;
            console.log("Numero de linhas: " + numberLines);
            
            var batch = collection.initializeUnorderedBulkOp();
            
            for(line = 0 ; line < numberLines; line++){
                prepareData(lines[line], function(response){   
                    //saveToDataBase(response, collection, function(err){
                        batch.insert({response:1});
                        //if(err) console.log(err);
                        //else // console.log("["+ response.sign + "] Saved")
                        
                    //});
                });
                //if(line === numberLines-1) process.exit();
            }
             batch.execute(function(err, result) {
	  	        console.log(result);
	         })   
           }
       })    
      
})


/*getFiles(function(files){
    for(var i = 0; i < files.length; i++)
    console.log(files[i]);
})*/

