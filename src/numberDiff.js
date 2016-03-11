(function() {

    var NumberDiff = (function() {
        return function(value, change, precision) {
            if (!precision) var resultPrecision = Math.max(getDecimalLength(value), getDecimalLength(change));
            var result = value + change,
                resultStr = precision ? result.toFixed(precision) : result.toFixed(resultPrecision),
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

        function getDecimalLength(number) {
            return getDecimalValue(number).length;
        }

        function getDecimalValue(number) {
            return number.toString().split('.')[1] || '';
        }
    })();

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = NumberDiff;
    } else {
        window.NumberDiff = NumberDiff;
    }
})();