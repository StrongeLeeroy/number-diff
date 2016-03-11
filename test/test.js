var assert = require('assert');
var expect = require('chai').expect;
var getDiff = require('../src/numberDiff.js');

describe('numberDiff', function() {
    it('should return an array', function() {
        expect(getDiff(54.74, 0.13)).to.be.an('array');
        expect(getDiff(1254.74, 0.1233)).to.be.an('array');
        expect(getDiff(4.74, 23)).to.be.an('array');
        expect(getDiff(76, 0)).to.be.an('array');
        expect(getDiff(8000.123, 0.03)).to.be.an('array');
        expect(getDiff(9, 1)).to.be.an('array');
    });

    it ('should return whole number if change is equal or greater in length', function() {
       expect(getDiff(23.02, 60.1)).to.deep.equal(['', '83.12']);
       expect(getDiff(12.50, 20)).to.deep.equal(['', '32.5']);
       expect(getDiff(12.50, -10.01)).to.deep.equal(['', '2.49']);
        expect(getDiff(2, 54.60)).to.deep.equal(['', '56.6']);
    });

    it('should return the difference when change is less than 1 or -1', function() {
        expect(getDiff(54.74, 0.13)).to.deep.equal(['54.', '87']);
        expect(getDiff(54.74, -0.13)).to.deep.equal(['54.', '61']);
        expect(getDiff(10.50, 0.05)).to.deep.equal(['10.5', '5']);
    });

    it('should return the difference when change is positive and greater than 1', function() {
        expect(getDiff(54.74, 5.43)).to.deep.equal(['', '60.17']);
        expect(getDiff(54.74, 1)).to.deep.equal(['5', '5.74']);
        expect(getDiff(10.50, 9.99)).to.deep.equal(['', '20.49']);
        expect(getDiff(150.50, 5.10)).to.deep.equal(['15', '5.6']);
        expect(getDiff(1500.50, 5.10)).to.deep.equal(['150', '5.6']);
        expect(getDiff(-35.50, 80.10)).to.deep.equal(['', '44.6']);
    });

    it('should return the difference when change is negative and less than -1', function() {
        expect(getDiff(54.74, -0.03)).to.deep.equal(['54.7', '1']);
        expect(getDiff(54.74, -0.13)).to.deep.equal(['54.', '61']);
        expect(getDiff(-33.4, -0.99)).to.deep.equal(['-3', '4.39']);
    });

    it('should return a number with the proper precision when none is provided', function() {
       expect(getDiff(120.576, -19.020)).to.deep.equal(['1', '01.556']);
       expect(getDiff(1500.57656, -5.0489)).to.deep.equal(['1', '495.52766']);
       expect(getDiff(1500.57656, 5.0489)).to.deep.equal(['150', '5.62546']);
    });

    it('should return a number with the proper precision when provided', function() {
        expect(getDiff(120.576, -19.020, 2)).to.deep.equal(['1', '01.56']);
        expect(getDiff(1500.57656, -5.0489, 3)).to.deep.equal(['1', '495.528']);
        expect(getDiff(1500.57656, 5.0489, 4)).to.deep.equal(['150', '5.6255']);
    });
});