var request     = require('request');
var InfoBus     = require("./infoBus");
var MongoClient = require('mongodb').MongoClient;
var dbConfig    = require("./config").dataBaseConfig;
var fs          = require('fs');



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
		
		var collection = db.collection("info-bus");
		console.log(collection);
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
	collection.insert(info, callback);
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
	var numberFrame = columns[7];
	var order = columns[8];
	var typeBus = columns[9];
	var date = columns[10];
	callback(new InfoBus(sign, fabrication, fuel, plant, model, body, frame, numberFrame, order, typeBus, date));
	//return new InfoBus(sign, fabrication, fuel, plant, model, body, frame, numberFrame, order, typeBus, date);
}




/**
 * Takes every bus line that will be used
 * @param {function} callback
 */
function getInfo(callback){
	fs.readFile('cadbus_cadastro_veiculos.csv', 'utf-8', function(err, data){
		var lines = data.split("\n");
		callback(lines);
	})
}

module.exports = {
	startDataBase:startDataBase,
	saveToDataBase:saveToDataBase,
	prepareData:prepareData,
	getInfo:getInfo,
};
