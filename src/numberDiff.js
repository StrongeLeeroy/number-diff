(function() {
    var NumberDiff = (function() {
        //- Private methods -//
        var _getDecimalValue = function(number) {
            return number.toString().split('.')[1] || '';
        };
        var _getDecimalLength = function(number) {
            return _getDecimalValue(number).length;
        };
        var _getIntValue = function(number) {
            return number.toString().split('.')[0] || '';
        };
        var _getIntLength = function(number) {
            return _getIntValue(number).length;
        };
        var _toArray = function(number) {
            return number.toString().split('');
        };
        var _trimDot = function(array) {
          return array[array.length - 1] === '.' ? array.slice(0, -1) : array;
        };
        var _intAlign = function(valueA, valueB) {
            var maxLen = Math.max(valueA.length, valueB.length),
                resultA = [], resultB = [], missingA = 0, missingB = 0;

            for (var i = maxLen - 1; i >=0; i--) {
                valueA[i] ? resultA.unshift(valueA[i]) : missingA++;
                valueB[i] ? resultB.unshift(valueB[i]) : missingB++;
            }

            while (missingA > 0) {
                resultA.unshift('');
                missingA--;
            }
            while (missingB > 0) {
                resultB.unshift('');
                missingB--;
            }
            return [resultA, resultB];
        };
        var _decAlign = function(valueA, valueB) {
            var maxLen = Math.max(valueA.length, valueB.length),
                resultA = [], resultB = [];

            for (var i = 0; i < maxLen; i++) {
                resultA.push(valueA[i] || '0');
                resultB.push(valueB[i] || '0');
            }

            return [resultA, resultB];
        };
        var _dotAlign = function(valueA, valueB) {
            var dot = ['.'];

            var alignedInt = _intAlign(_getIntValue(valueA), _getIntValue(valueB)),
                alignedDec = _decAlign(_getDecimalValue(valueA), _getDecimalValue(valueB));

            return [
                _trimDot(alignedInt[0].concat(dot).concat(alignedDec[0])),
                _trimDot(alignedInt[1].concat(dot).concat(alignedDec[1]))
            ];
        };

        //- Public methods -//
        var changeDiff = function(value, change, precision) {
            if (typeof value === 'undefined' || typeof change === 'undefined') throw new Error('Arguments missing or undefined.');
            if (typeof value != 'number') throw new Error('Invalid type: value');
            if (typeof change != 'number') throw new Error('Invalid type: change');
            if (typeof precision != 'undefined' && typeof precision != 'number') throw new Error('Invalid type: precision');

            precision = precision || Math.max(_getDecimalLength(value), _getDecimalLength(change));

            var result = value + change,
                resultStr = result.toFixed(precision),
                valueStr = value.toString();

            var diffIndex;
            for (var i = 0; i < resultStr.length; i++) {
                if (resultStr.charAt(i) != valueStr.charAt(i)) {
                    diffIndex = i;
                    break;
                }
            }
            return typeof diffIndex != 'undefined' ? [resultStr.slice(0, diffIndex), resultStr.slice(diffIndex)] : [resultStr, ''];
        };
        var numDiff = function(newVal, oldVal, deep) {
            if (typeof newVal === 'undefined' || typeof oldVal === 'undefined') throw new Error('Arguments missing or undefined.');
            if (typeof newVal != 'number' || typeof oldVal != 'number') throw new Error('Invalid type. Values must be of type \'number\'.');
            if (typeof deep != 'undefined' && typeof deep != 'boolean') throw new Error('Invalid type. deep must be of type \'boolean\'.');

            var alignedValues = _dotAlign(newVal, oldVal),
                alignedNewVal = alignedValues[0],
                alignedOldVal = alignedValues[1];

            var len = alignedNewVal.length;

            if (!deep) {
                var shallowResult = ['', ''],
                    noDiff = true;
                for(var i = 0; i < len; i++) {
                    if (alignedNewVal[i] === alignedOldVal[i] && noDiff) {
                        shallowResult[0] += alignedNewVal[i];
                    } else {
                        noDiff = false;
                        shallowResult[1] += alignedNewVal[i];
                    }
                }
                return shallowResult;
            } else {
                console.log(alignedNewVal)
                console.log(alignedOldVal)
                var deepResult = [],
                    eqBuffer = '',
                    diffBuffer = '';
                for(i = 0; i < len; i++) {
                    if (alignedNewVal[i] === alignedOldVal[i]) {
                        if (diffBuffer.length > 0) {
                            deepResult.push({ c: diffBuffer });
                            diffBuffer = '';
                        }
                        eqBuffer += alignedNewVal[i];
                    } else {
                        if (eqBuffer.length > 0) {
                            deepResult.push(eqBuffer);
                            eqBuffer = '';
                        }
                        diffBuffer += alignedNewVal[i];
                    }
                }
                if (eqBuffer.length > 0) {
                    deepResult.push(eqBuffer);
                }
                else if (diffBuffer.length > 0) {
                    deepResult.push({ c: diffBuffer });
                }
                return deepResult;
            }
        };

        return {
            changeDiff: changeDiff,
            numDiff: numDiff
        }
    })();

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = NumberDiff;
    } else {
        window.NumberDiff = NumberDiff;
    }
})();