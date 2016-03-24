/**
 * Create a new InfoBus object
 * @param {string} sign
 * @param {string} fabrication
 * @param {string} fuel
 * @param {string} plant
 * @param {string} model
 * @param {string} body
 * @param {string} frame
 * @param {string} frameNumber
 * @param {string} order
 * @param {string} features
 * @param {string} inclusionDate
 */

var InfoBus = function(sign, fabrication, fuel, plant, model, body, frame, frameNumber, order, features, inclusionDate){
	this.sign = sign;
	this.fabrication = parseInt(fabrication);
	this.fuel = fuel;
	this.plant = parseInt(plant);
	this.model = model;
	this.body = body;
	this.frame = frame;
	this.frameNumber = frameNumber;
	this.order = order;
	this.features = features;
	this.inclusionDate = new Date(inclusionDate);
}

InfoBus.prototype.detectAirConditioning = function() {
    if (!this.features) return;
    
    var matchesPositive = this.features.match(/C\/AR/i);
    if (matchesPositive) {
        this.hasAirConditioning = true;
        return;
    }
    
    var matchesNegative = this.features.match(/S\/AR/i);
    if (matchesNegative) {
        this.hasAirConditioning = false;
        return;
    }
}

module.exports = InfoBus;


