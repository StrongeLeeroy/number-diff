var changeDiff = require('../src/numberDiff.js').changeDiff;
var numDiff = require('../src/numberDiff.js').numDiff;

var testAmount = process.argv[2] || 100000;

function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min) + Math.random();
}

var testCaseValues = [];
var testCaseChanges = [];
var precisions = [];

var start = Date.now();
for (var i = 0; i < testAmount; i++) {
    testCaseValues.push(randomInRange(-1000, 1000));
    testCaseChanges.push(randomInRange(-1000, 1000));
    precisions.push(randomInRange(1, 10));
}
var end = Date.now();
var diff = end - start;
console.log('Running with ' + testAmount + ' test.');
console.log('Test cases populated: ' + diff + 'ms');


// changeDiff
start = Date.now();
for (var j = 0; j < testAmount; j++) {
    changeDiff(testCaseValues[j], testCaseChanges[j], precisions[j]);
}
end = Date.now();
diff = end - start;
console.log('changeDiff with precision: ' + diff + 'ms');


start = Date.now();
for (j = 0; j < testAmount; j++) {
    changeDiff(testCaseValues[j], testCaseChanges[j]);
}
end = Date.now();
diff = end - start;
console.log('changeDiff w/o precision: ' + diff + 'ms');


// numDiff
start = Date.now();
for (j = 0; j < testAmount; j++) {
    numDiff(testCaseValues[j], testCaseChanges[j], false);
}
end = Date.now();
diff = end - start;
console.log('numDiff shallow: ' + diff + 'ms');

start = Date.now();
for (j = 0; j < testAmount; j++) {
    numDiff(testCaseValues[j], testCaseChanges[j], true);
}
end = Date.now();
diff = end - start;
console.log('numDiff deep: ' + diff + 'ms');