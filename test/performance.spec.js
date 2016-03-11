var getDiff = require('../src/numberDiff.js');

function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min) + Math.random();
}

var testCaseValues = [];
var testCaseChanges = [];
var precisions = [];

var start = Date.now();
for (var i = 0; i < 100000; i++) {
    testCaseValues.push(randomInRange(-1000, 1000));
    testCaseChanges.push(randomInRange(-1000, 1000));
    precisions.push(randomInRange(1, 10));
}
var end = Date.now();
var diff = end - start;
console.log('Test cases populated: ' + diff + 'ms');

start = Date.now();
for (var j = 0; j < 100000; j++) {
    getDiff(testCaseValues[j], testCaseChanges[j], precisions[j]);
}
end = Date.now();
diff = end - start;
console.log('Time with precision: ' + diff + 'ms');


start = Date.now();
for (j = 0; j < 100000; j++) {
    getDiff(testCaseValues[j], testCaseChanges[j]);
}
end = Date.now();
diff = end - start;
console.log('Time w/o precision: ' + diff + 'ms');