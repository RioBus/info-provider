var request     = require('request');
var InfoBus     = require("./infoBus");
var MongoClient = require('mongodb').MongoClient;
var dbConfig    = require("./config").dataBaseConfig;
var fs          = require('fs');
var __dirname;


/**
 * Open the connection with database and clear the collection
 * @param {function} callback
 * @return {(err: Error, collection: any)=>void}
 */
function startDataBase(callback){
	var address;
	if(dbConfig.user === "" && dbConfig.pass === "") address = 'mongodb://' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.dataBaseName;
	else address = 'mongodb://' + dbConfig.user + ':' + dbConfig.pass + '@' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.dataBaseName;
	MongoClient.connect(address, function(err, db) {
		if(err) callback(err, null);
	//	console.log('mongodb://' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.dataBaseName);
		
		var collection = db.collection('bus_info');
		collection.remove({}, function(){});
		callback(null, collection);
	});
}


/**
 * Insert the informations on database
 * @param {InfoBus} info
 * @param {any} collection
 * @param {function} callback
 */
function saveToDataBase(info, collection, callback) {
	//var batch = collection.initializeUnorderedBulkOp();
	for(var busInfo of info) {
		//batch.insert(busInfo);
		collection.insert(busInfo, callback);
		
	}
	//saveNext(info, collection, 0, callback, 0);
	//collection.insert(info, callback);
	// batch.execute(function(err, result) {
	// 	if(err) console.log("ERROR", err);
	// 	else console.log("GOTCHA", result.nInserted, result.isOk());
	// })
}

function saveNext(list, collection, index, callback, timeout) {
	setTimeout(function(){
		if(index<list.length) collection.insert(list[index++], function(error, response){
			callback(error, response);
			saveNext(list, collection, index, callback, timeout);
		});
	}, timeout);
}




/**
 * Breaks the data in informations about bus 
 * @param {string} data
 * @param {function} callback
 * @return {InfoBus}
 */
function prepareData(data, callback){
	var columns = data.split(",");
	//placa, fabricação, combustível, planta, modelo, carroceria, chassi, numero do chassi, ordem, tipo do veículo, data 
	var sign = columns[0];
	var fabrication = columns[1];
	var fuel = columns[2];
	var plant = columns[3];
	var model = columns[4];
	var body = columns[5];
	var frame = columns[6];
	var frameNumber = columns[7];
	var order = columns[8];
	var features = columns[9];
	var inclusionDate = columns[10];
	//callback(new InfoBus(sign, fabrication, fuel, plant, model, body, frame, numberFrame, order, typeBus, date));
	return new InfoBus(sign, fabrication, fuel, plant, model, body, frame, frameNumber, order, features, inclusionDate);
}




/**
 * Takes every bus line that will be used
 * @param {function} callback
 */
function getInfo(callback){
	getFiles(function(files){
		for(var i = 0; i < files.length; i++){
			//console.log(files[i]);
			fs.readFile(files[i], 'utf-8', function(err, data){//'cadbus_cadastro_veiculos_brt.csv', 'utf-8', function(err, data){
				//console.log(data);
				var lines = data.split("\n");
				callback(lines, i, files.length);
			})
		}
	})
}

function getFiles(callback){
	
	fs.readdir(__dirname, function(err, file){
		if(err) console.log(err);
		else{
			var files = [];
			var j = 0;
			for(var i = 0; i < file.length; i++){
				if(file[i].indexOf('.csv')>-1){
					//console.log("Esse tem a extensão que eu quero: " + file[i]);
					files[j] = file[i]
					j++;
				}
			}
			callback(files);
		}
		
	})
	
	
  
}

module.exports = {
	startDataBase:startDataBase,
	saveToDataBase:saveToDataBase,
	prepareData:prepareData,
	getInfo:getInfo,
	getFiles:getFiles,
};
