const timestring = require('timestring')

function Primeout (ms, promise) {
  if (typeof ms === 'string') {
    ms = timestring(ms, 'ms')
  } else {
    ms = parseInt(ms)
  }

  if (!Number.isFinite(ms) || ms < 0) {
    throw new Error('Invalid ms parameter given when specifying a primeout')
  }

  if (!(promise instanceof Promise)) {
    throw new Error('Promise given was not a promise at all!')
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(`Promise timed out after ${ms}ms`))
    }, ms)

    promise.then(resolve, reject)
  })
}

module.exports = Primeout
