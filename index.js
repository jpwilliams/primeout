const timestring = require('timestring')

function Primeout (time, promise) {
  if (typeof time === 'string') {
    time = timestring(time, 'ms')
  } else {
    time = parseInt(time)
  }

  if (!Number.isFinite(time) || time < 0) {
    throw new Error('Invalid ms parameter given when specifying a primeout')
  }

  if (!(promise instanceof Promise)) {
    throw new Error('Promise given was not a promise at all!')
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(`Promise timed out after ${time}ms`))
    }, time)

    promise.then(resolve, reject)
  })
}

module.exports = Primeout
