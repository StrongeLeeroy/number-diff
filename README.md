[![Travis](https://img.shields.io/travis/StrongeLeeroy/number-diff.svg?style=flat-square)](https://travis-ci.org/StrongeLeeroy/number-diff)
[![SemVer](http://img.shields.io/:semver-1.0.0-brightgreen.svg?style=flat-square)](http://semver.org)
## number-diff
A simple and small **number difference** library.
NumberDiff takes in a number and a positive or negative change. It will output an **array containing the result**, the first element is the untouched part, the section that has not changed. The second is the difference.

* [Why is this useful?](#why-is-this-useful?)
* [Getting started](#getting-started)
* [Examples](#examples)

### Why is this useful?
WIP

### Getting started
WIP

### Examples

Without precision:

    NumberDiff(54.74, 0.13); // Returns ['54.', '87']
    
With precision:

    NumberDiff(1500.57656, -5.0489, 3); // Returns ['1', '495.528']