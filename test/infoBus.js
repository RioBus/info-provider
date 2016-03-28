'use strict';
/* global describe, it, before; */

const Assert = require('assert');
const InfoBus = require('../src/infoBus');

describe('InfoBus', () => {
    var line = "KWI5768,2013,Diesel,2968,MBB O 500 M  EURO V,MASCARELLO,MERCEDES BENZ,9BM382188DB892930,E05001 ,44 BRT PADRON,23/05/14 18:37";
	
	it('should detect that a bus has air conditioning', function() {
		var bus = new InfoBus();
        bus.features = '53 MIDI URB C/AR C/ELEV 2 CATR';
        bus.detectAirConditioning();
        Assert.deepStrictEqual(bus.hasAirConditioning, true);
	});
    
	it('should detect that a bus does not have air conditioning', function() {
		var bus = new InfoBus();
        bus.features = '30 ONBUS BASIC URB S/AR C/ELEV';
        bus.detectAirConditioning();
        Assert.deepStrictEqual(bus.hasAirConditioning, false);
	});
    
	it('should not detect if a bus has air conditioning when info not present', function() {
		var bus = new InfoBus();
        bus.features = '45 BRT ARTICULADO';
        bus.detectAirConditioning();
        Assert.deepStrictEqual(bus.hasAirConditioning, undefined);
	});
	
	it('should detect that a bus has wheelchair lift', function() {
		var bus = new InfoBus();
        bus.features = '53 MIDI URB C/AR C/ELEV 2 CATR';
        bus.detectWheelchairLift();
        Assert.deepStrictEqual(bus.hasWheelchairLift, true);
	});
    
	it('should detect that a bus does not have wheelchair lift', function() {
		var bus = new InfoBus();
        bus.features = '30 ONBUS BASIC URB S/AR S/ELEV';
        bus.detectWheelchairLift();
        Assert.deepStrictEqual(bus.hasWheelchairLift, false);
	});
    
	it('should not detect if a bus has wheelchair lift when info not present', function() {
		var bus = new InfoBus();
        bus.features = '45 BRT ARTICULADO';
        bus.detectWheelchairLift();
        Assert.deepStrictEqual(bus.hasWheelchairLift, undefined);
	});
	
});