[![Travis](https://img.shields.io/travis/StrongeLeeroy/number-diff.svg?style=flat-square)](https://travis-ci.org/StrongeLeeroy/number-diff)
[![SemVer](http://img.shields.io/:semver-1.0.0-brightgreen.svg?style=flat-square)](http://semver.org)
## number-diff
A simple and small **number difference** library.
NumberDiff takes in a number and a positive or negative change. It will output an **array containing the result**, the first element is the untouched part, the section that has not changed. The second is the difference.

* [Getting started](#getting-started)
* [API](#api)
* [Examples](#examples)

### Getting started
WIP

### API

#### Number difference
Takes in three parameters, *newVal*: number, *oldVal*: number and *deep*: boolean, the last being optional (it will assume it's false):

    numDiff(newVal, oldVal, [, deep]);

##### Examples
Shallow diff:

    numDiff(156.55, 153.56, false); // ['15', '6.55'];
    
Deep diff:

    numDiff(156.55, 153.56, false); // ['15', {c: '6'}, '.5', {c: '6'}]

#### Change difference
Takes in three parameters, *value*: number, *change*: number and *precision*: number, the last being optional (it will inferred). Value and change can be positive or negaative:

    changeDiff(value, change [, precision]);

#### Examples
Without precision:

    changeDiff(54.74, 0.13); // Returns ['54.', '87']
    
With precision:

    changeDiff(1500.57656, -5.0489, 3); // Returns ['1', '495.528']