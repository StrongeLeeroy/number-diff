var expect = require('chai').expect;
var changeDiff = require('../src/numberDiff.js').changeDiff;

describe('changeDiff', function() {
    it('should return an array', function() {
        expect(changeDiff(54.74, 0.13)).to.be.an('array');
        expect(changeDiff(1254.74, 0.1233)).to.be.an('array');
        expect(changeDiff(4.74, 23)).to.be.an('array');
        expect(changeDiff(76, 0)).to.be.an('array');
        expect(changeDiff(8000.123, 0.03)).to.be.an('array');
        expect(changeDiff(9, 1)).to.be.an('array');
    });

    it('should throw an error if value or change parameters are not defined', function() {
        var errorWrap = function() {
            changeDiff();
        };
        expect(errorWrap).to.throw(/Arguments missing or undefined\./);
        errorWrap = function() {
            changeDiff(50.4);
        };
        expect(errorWrap).to.throw(/Arguments missing or undefined\./);
        errorWrap = function() {
            changeDiff(undefined, 4);
        };
        expect(errorWrap).to.throw(/Arguments missing or undefined\./);
        errorWrap = function() {
            changeDiff(50, undefined);
        };
        expect(errorWrap).to.throw(/Arguments missing or undefined\./);
        errorWrap = function() {
            changeDiff(undefined, undefined);
        };
        expect(errorWrap).to.throw(/Arguments missing or undefined\./);
    });

    it('should throw an error if value argument is not a number', function() {
        var errorWrap = function() {
            changeDiff('54.74', 0.13, 2);
        };
        expect(errorWrap).to.throw(/Invalid type: value/);
        errorWrap = function() {
            changeDiff(true, 0.13, 2);
        };
        expect(errorWrap).to.throw(/Invalid type: value/);
        errorWrap = function() {
            changeDiff(false, 0.13, 2);
        };
        expect(errorWrap).to.throw(/Invalid type: value/);
        errorWrap = function() {
            changeDiff([54.74], 0.13, 2);
        };
        expect(errorWrap).to.throw(/Invalid type: value/);
    });

    it('should throw an error if change argument is not a number', function() {
        var errorWrap = function() {
            changeDiff(54.74, '0.13', 2);
        };
        expect(errorWrap).to.throw(/Invalid type: change/);
        errorWrap = function() {
            changeDiff(54.74, true, 2);
        };
        expect(errorWrap).to.throw(/Invalid type: change/);
        errorWrap = function() {
            changeDiff(54.74, false, 2);
        };
        expect(errorWrap).to.throw(/Invalid type: change/);
        errorWrap = function() {
            changeDiff(54.74, [0.13], 2);
        };
        expect(errorWrap).to.throw(/Invalid type: change/);
    });

    it('should throw an error if precision argument is not a number', function() {
        var errorWrap = function() {
            changeDiff(54.74, 0.13, '2');
        };
        expect(errorWrap).to.throw(/Invalid type: precision/);
        errorWrap = function() {
            changeDiff(54.74, 0.13, true);
        };
        expect(errorWrap).to.throw(/Invalid type: precision/);
        errorWrap = function() {
            changeDiff(54.74, 0.13, false);
        };
        expect(errorWrap).to.throw(/Invalid type: precision/);
        errorWrap = function() {
            changeDiff(54.74, 0.13, [2]);
        };
        expect(errorWrap).to.throw(/Invalid type: precision/);
    });

    it ('should return whole number if change is equal or greater in length', function() {
        expect(changeDiff(23.02, 60.1)).to.deep.equal(['', '83.12']);
        expect(changeDiff(12.50, 20)).to.deep.equal(['', '32.5']);
        expect(changeDiff(12.50, -10.01)).to.deep.equal(['', '2.49']);
        expect(changeDiff(2, 54.60)).to.deep.equal(['', '56.6']);
    });

    it('should return the difference when change is less than 1 or -1', function() {
        expect(changeDiff(54.74, 0.13)).to.deep.equal(['54.', '87']);
        expect(changeDiff(54.74, -0.13)).to.deep.equal(['54.', '61']);
        expect(changeDiff(10.50, 0.05)).to.deep.equal(['10.5', '5']);
    });

    it('should return the difference when change is positive and greater than 1', function() {
        expect(changeDiff(54.74, 5.43)).to.deep.equal(['', '60.17']);
        expect(changeDiff(54.74, 1)).to.deep.equal(['5', '5.74']);
        expect(changeDiff(10.50, 9.99)).to.deep.equal(['', '20.49']);
        expect(changeDiff(150.50, 5.10)).to.deep.equal(['15', '5.6']);
        expect(changeDiff(1500.50, 5.10)).to.deep.equal(['150', '5.6']);
        expect(changeDiff(-35.50, 80.10)).to.deep.equal(['', '44.6']);
    });

    it('should return the difference when change is negative and less than -1', function() {
        expect(changeDiff(54.74, -0.03)).to.deep.equal(['54.7', '1']);
        expect(changeDiff(54.74, -0.13)).to.deep.equal(['54.', '61']);
        expect(changeDiff(-33.4, -0.99)).to.deep.equal(['-3', '4.39']);
    });

    it('should return a number with the proper precision when none is provided', function() {
        expect(changeDiff(120.576, -19.020)).to.deep.equal(['1', '01.556']);
        expect(changeDiff(1500.57656, -5.0489)).to.deep.equal(['1', '495.52766']);
        expect(changeDiff(1500.57656, 5.0489)).to.deep.equal(['150', '5.62546']);
    });

    it('should return a number with the proper precision when provided', function() {
        expect(changeDiff(120.576, -19.020, 2)).to.deep.equal(['1', '01.56']);
        expect(changeDiff(1500.57656, -5.0489, 3)).to.deep.equal(['1', '495.528']);
        expect(changeDiff(1500.57656, 5.0489, 4)).to.deep.equal(['150', '5.6255']);
    });
});