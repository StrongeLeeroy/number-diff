var expect = require('chai').expect;
var numDiff = require('../src/numberDiff.js').numDiff;

describe('shallow numDiff', function() {
    it('should return an array', function() {
        expect(numDiff(54.74, 53.73)).to.be.an('array');
        expect(numDiff(54.74, 53.73, false)).to.be.an('array');
        expect(numDiff(1800.74, 1805.74)).to.be.an('array');
        expect(numDiff(1800.74, 1805.74, false)).to.be.an('array');
        expect(numDiff(1200, 1250)).to.be.an('array');
        expect(numDiff(1200, 1250, false)).to.be.an('array');
    });

    it ('should throw an error if any of the value arguments is not a number', function() {
        var errorWrap = function() {
            numDiff('54.74', 0.13);
        };
        expect(errorWrap).to.throw(/Invalid type\. Values must be of type \'number\'\./);
        errorWrap = function() {
            numDiff(true, 0.13);
        };
        expect(errorWrap).to.throw(/Invalid type\. Values must be of type \'number\'\./);
        errorWrap = function() {
            numDiff(false, 0.13);
        };
        expect(errorWrap).to.throw(/Invalid type\. Values must be of type \'number\'\./);
        errorWrap = function() {
            numDiff([54.74], 0.13);
        };
        expect(errorWrap).to.throw(/Invalid type\. Values must be of type \'number\'\./);

        errorWrap = function() {
            numDiff(54.74, '53.13');
        };
        expect(errorWrap).to.throw(/Invalid type\. Values must be of type \'number\'\./);
        errorWrap = function() {
            numDiff(54.74, true);
        };
        expect(errorWrap).to.throw(/Invalid type\. Values must be of type \'number\'\./);
        errorWrap = function() {
            numDiff(54.74, false);
        };
        expect(errorWrap).to.throw(/Invalid type\. Values must be of type \'number\'\./);
        errorWrap = function() {
            numDiff(54.74, [53.13]);
        };
        expect(errorWrap).to.throw(/Invalid type\. Values must be of type \'number\'\./);
    });

    it ('should throw an error if any of the arguments is not defined', function() {
        var errorWrap = function() {
            numDiff();
        };
        expect(errorWrap).to.throw(/Arguments missing or undefined\./);
        errorWrap = function() {
            numDiff(50.4);
        };
        expect(errorWrap).to.throw(/Arguments missing or undefined\./);
        errorWrap = function() {
            numDiff(undefined, 4);
        };
        expect(errorWrap).to.throw(/Arguments missing or undefined\./);
        errorWrap = function() {
            numDiff(50, undefined);
        };
        expect(errorWrap).to.throw(/Arguments missing or undefined\./);
        errorWrap = function() {
            numDiff(undefined, undefined);
        };
        expect(errorWrap).to.throw(/Arguments missing or undefined\./);
    });

    it('should return the difference between values in array format', function() {
        expect(numDiff(54.74, 53.73)).to.deep.equal(['5', '4.74']);
        expect(numDiff(1800.74, 1805.74)).to.deep.equal(['180', '0.74']);
        expect(numDiff(1200, 1250)).to.deep.equal(['12', '00']);
        expect(numDiff(85, 1250)).to.deep.equal(['', '85']);
    });
});

describe('deep numDiff', function() {
    it('should return an array', function() {
        expect(numDiff(54.74, 53.73, true)).to.be.an('array');
        expect(numDiff(1800.74, 1805.74, true)).to.be.an('array');
        expect(numDiff(1200, 1250, true)).to.be.an('array');
    });

    it ('should throw an error if deep is not a boolean', function() {
        var errorWrap = function () {
            numDiff(54.74, 0.13, 55);
        };
        expect(errorWrap).to.throw(/Invalid type\. deep must be of type \'boolean\'\./);
        errorWrap = function () {
            numDiff(54.74, 0.13, 0);
        };
        expect(errorWrap).to.throw(/Invalid type\. deep must be of type \'boolean\'\./);
        errorWrap = function () {
            numDiff(54.74, 0.13, '55');
        };
        expect(errorWrap).to.throw(/Invalid type\. deep must be of type \'boolean\'\./);
        errorWrap = function () {
            numDiff(54.74, 0.13, [true]);
        };
        expect(errorWrap).to.throw(/Invalid type\. deep must be of type \'boolean\'\./);
    });

    it('should return the deep difference between values in array format when enabled', function() {
        expect(numDiff(54.74, 53.73, true)).to.deep.equal(['5', {c: '4'}, '.7', {c: '4'}]);
        expect(numDiff(1800.74, 1805.74, true)).to.deep.equal(['180', {c: '0'}, '.74']);
        expect(numDiff(1200, 1250, true)).to.deep.equal(['12', {c: '0'}, '0']);
        expect(numDiff(85, 1250, true)).to.deep.equal([{c: '85'}]);
        expect(numDiff(80.178432, 50.155422, true)).to.deep.equal([{c: '8'}, '0.1', {c: '78'}, '4', {c: '3'}, '2']);
    });

    it('should work with negative numbers', function() {
        expect(numDiff(-54.74, 53.73, true)).to.deep.equal([{c: '-'}, '5', {c: '4'}, '.7', {c: '4'}]);
        expect(numDiff(1800.74, -1805.74, true)).to.deep.equal(['180', {c: '0'}, '.74']);
        expect(numDiff(-1800.74, -1805.74, true)).to.deep.equal(['-180', {c: '0'}, '.74']);
    });

    it('should display dots as difference when one of the arguments has no decimals', function() {
        expect(numDiff(80.56, 83, true)).to.deep.equal(['8', {c: '0.56'}]);
    });
});