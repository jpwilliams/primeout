# _Primeout_

[![Build Status](https://travis-ci.org/jpwilliams/primeout.svg)](https://travis-ci.org/jpwilliams/primeout) [![Coverage Status](https://coveralls.io/repos/github/jpwilliams/primeout/badge.svg)](https://coveralls.io/github/jpwilliams/primeout) [![npm downloads per month](https://img.shields.io/npm/dm/primeout.svg)](https://www.npmjs.com/package/primeout) [![npm version](https://img.shields.io/npm/v/primeout.svg)](https://www.npmjs.com/package/primeout)

Create a promise with a timeout.

``` js
npm install primeout
```

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

## Contents

* [Examples](#examples)
* [API reference](#api-reference)

## Examples

All of these examples assume that `connect()` returns a promise.

``` js
// Set a timeout of 5 seconds
primeout(5000, connect()).then(...).catch(...)
```

``` js
// Set a timeout of 5 minutes
primeout('5m', connect()).then(...).catch(...)
```

``` js
// Set a timeout that rejects if the
// promise is not resolved or rejected
// before the next event loop.
```

For a clear-cut explanation of that last example (especially if you're new to _node.js_) see [Understanding the node.js event loop](http://blog.mixu.net/2011/02/01/understanding-the-node-js-event-loop/).

## API reference

#### `primeout`

The only export from the module. A function used to return the timeout-enabled promise desired.

##### Arguments

* `time` The timeout being specified. Can either be a number specifying the amount of milliseconds or a valid [timestring](https://www.npmjs.com/package/timestring).
* `promise` The promise you wish to set a timeout for.
