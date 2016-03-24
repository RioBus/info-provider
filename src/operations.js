'use strict';
var request     = require('request');
var InfoBus     = require("./infoBus");
var MongoClient = require('mongodb').MongoClient;
var dbConfig    = require("./config").dataBaseConfig;
var fs          = require('fs');
var moment      = require('moment');
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
	for(var busInfo of info) {
		collection.insert(busInfo, callback);
	}
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
 * @return {InfoBus}
 */
function prepareData(data){
	var columns = data.split(","); // placa, fabricação, combustível, planta, modelo, carroceria, chassi, numero do chassi, ordem, tipo do veículo, data
    
    var bus = new InfoBus();
	bus.sign = columns[0].trim();
	bus.fabrication = parseInt(columns[1]);
	bus.fuel = columns[2].trim();
	bus.plant = parseInt(columns[3]);
	bus.model = columns[4].trim();
	bus.body = columns[5].trim();
	bus.frame = columns[6].trim();
	bus.frameNumber = columns[7].trim();
	bus.order = columns[8].trim();
	bus.features = columns[9].trim();
	bus.inclusionDate = moment(columns[10], 'DD/MM/YY HH:mm').toDate(); // format: 23/05/14 18:
    
    bus.detectAirConditioning();
    
    return bus;
}

/**
 * Takes every bus line that will be used
 * @param {function} callback
 */
function getInfo(callback){
	getFiles(function(files){
		for(var i = 0; i < files.length; i++){
			fs.readFile(files[i], 'utf-8', function(err, data){
				var lines = data.split("\n");
				callback(lines, i, files.length);
			})
		}
	});
}

function getFiles(callback){
    console.log(__dirname);
	fs.readdir(__dirname + '/../', function(err, file){
		if(err) console.log(err);
		else{
			var files = [];
			var j = 0;
			for(var i = 0; i < file.length; i++){
				if(file[i].indexOf('.csv') > -1){
					files[j] = file[i]
					j++;
				}
			}
			callback(files);
		}
	});
}

module.exports = {
	startDataBase:startDataBase,
	saveToDataBase:saveToDataBase,
	prepareData:prepareData,
	getInfo:getInfo,
	getFiles:getFiles,
};
