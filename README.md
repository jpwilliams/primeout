# _Primeout_

[![Build Status](https://travis-ci.org/jpwilliams/primeout.svg)](https://travis-ci.org/jpwilliams/primeout) [![Coverage Status](https://coveralls.io/repos/github/jpwilliams/primeout/badge.svg)](https://coveralls.io/github/jpwilliams/primeout) [![npm downloads per month](https://img.shields.io/npm/dm/primeout.svg)](https://www.npmjs.com/package/primeout) [![npm version](https://img.shields.io/npm/v/primeout.svg)](https://www.npmjs.com/package/primeout)

Create a promise with a timeout.

``` js
const primeout = require('primeout')

// Will reject if the `connectToDb()` promise does
// not respond within 30 seconds.
primeout('30 seconds', connectToDb()).then((db) => {
  ...
}).catch((err) => {
  ...
})
```
