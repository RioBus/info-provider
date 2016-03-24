'use strict';
/* global describe, it, before; */

const Assert = require('assert');
const prepareData = require('../src/operations').prepareData;

describe('Operations', () => {
    var line = "KWI5768,2013,Diesel,2968,MBB O 500 M  EURO V,MASCARELLO,MERCEDES BENZ,9BM382188DB892930,E05001 ,53 MIDI URB C/AR C/ELEV 2 CATR,23/05/14 18:37";
	
	it('should parse bus correctly', function() {
		var bus = prepareData(line);
		Assert.notEqual(bus, null);
        Assert.deepStrictEqual(bus.sign, "KWI5768");
        Assert.deepStrictEqual(bus.fabrication, 2013);
        Assert.deepStrictEqual(bus.fuel, "Diesel");
        Assert.deepStrictEqual(bus.plant, 2968);
        Assert.deepStrictEqual(bus.model, "MBB O 500 M  EURO V");
        Assert.deepStrictEqual(bus.body, "MASCARELLO");
        Assert.deepStrictEqual(bus.frame, "MERCEDES BENZ");
        Assert.deepStrictEqual(bus.frameNumber, "9BM382188DB892930");
        Assert.deepStrictEqual(bus.order, "E05001");
        Assert.deepStrictEqual(bus.features, "53 MIDI URB C/AR C/ELEV 2 CATR");
        Assert.deepStrictEqual(bus.inclusionDate, new Date(2014, 4, 23, 18, 37));
        Assert.deepStrictEqual(bus.hasAirConditioning, true);
	});
	
});