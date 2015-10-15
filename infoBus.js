/**
 * Create a new InfoBus object
 * @param {string} sign
 * @param {string} fabrication
 * @param {string} fuel
 * @param {string} plant
 * @param {string} model
 * @param {string} body
 * @param {string} frame
 * @param {string} numberFrame
 * @param {string} order
 * @param {string} typeBus
 * @param {string} date
 */

var InfoBus = function(sign, fabrication, fuel, plant, model, body, frame, numberFrame, order, typeBus, date){
	this.sign = sign;
	this.fabrication = fabrication;
	this.fuel = fuel;
	this.plant = plant;
	this.model = model;
	this.body = body;
	this.frame = frame;
	this.numberFrame = numberFrame;
	this.order = order;
	this.typeBus = typeBus;
	this.date = date;
}

module.exports = InfoBus;