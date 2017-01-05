/* global describe, expect, it */
const primeout = require('../')

describe('Primeout', function () {
  describe('Base checks', function () {
    it('should export a function', function () {
      expect(primeout).to.be.a('function')
    })

    it('should take two arguments', function () {
      expect(primeout.length).to.equal(2)
    })
  })

  describe('Running', function () {
    it('should throw if invalid ms parameter given', function () {
      expect(primeout.bind(null, null)).to.throw()
      expect(primeout.bind(null, false)).to.throw()
      expect(primeout.bind(null, '100yyyy')).to.throw()
      expect(primeout.bind(null, () => {})).to.throw()
      expect(primeout.bind(null, -1)).to.throw()
      expect(primeout.bind(null, true)).to.throw()
    })

    it('should throw if invalid promise given', function () {
      const errMsg = 'Promise given was not a promise at all!'

      expect(primeout.bind(null, 100)).to.throw(errMsg)
      expect(primeout.bind(null, '100ms', null)).to.throw(errMsg)
      expect(primeout.bind(null, '10 years', true)).to.throw(errMsg)
      expect(primeout.bind(null, '60 seconds', false)).to.throw(errMsg)
      expect(primeout.bind(null, '1 month', () => {})).to.throw(errMsg)
      expect(primeout.bind(null, '500ms', 100)).to.throw(errMsg)
      expect(primeout.bind(null, '1 hour', -100)).to.throw(errMsg)
    })

    it('should time out if promise never resolved or rejected', function (done) {
      const tempPromise = new Promise((resolve, reject) => {})

      primeout('10ms', tempPromise).then(() => {
        return done(new Error('Shouldn\'t get here.'))
      }).catch((err) => {
        if (err.message !== 'Promise timed out after 10ms') {
          return done(new Error('Error message doesn\'t line up.'))
        }

        return done()
      })
    })

    it('should resolve if main promise resolves before timeout', function (done) {
      const tempPromise = new Promise((resolve, reject) => {
        return resolve()
      })

      primeout('10ms', tempPromise).then(() => {
        return done()
      }).catch((err) => {
        return done(err)
      })
    })

    it('should reject if main promise rejects before timeout', function (done) {
      const tempPromise = new Promise((resolve, reject) => {
        return reject(new Error('Fake rejection.'))
      })

      primeout('10ms', tempPromise).then(() => {
        return done()
      }).catch((err) => {
        if (err.message !== 'Fake rejection.') {
          return done(new Error('Bad error returned'))
        }

        return done()
      })
    })

    it('should resolve if main promise resolves before timeout (with 0ms)', function (done) {
      const tempPromise = new Promise((resolve, reject) => {
        return resolve()
      })

      primeout('0ms', tempPromise).then(() => {
        return done()
      }).catch((err) => {
        return done(err)
      })
    })

    it('should reject if main promise rejects before timeout (with 0ms)', function (done) {
      const tempPromise = new Promise((resolve, reject) => {
        return reject(new Error('Fake rejection.'))
      })

      primeout('0ms', tempPromise).then(() => {
        return done(new Error('Resolved when should\'ve rejected.'))
      }).catch((err) => {
        if (err.message !== 'Fake rejection.') {
          return done(new Error('Bad error returned'))
        }

        return done()
      })
    })

    it('should resolve if main promise is already resolved', function (done) {
      const tempPromise = Promise.resolve()

      primeout('0ms', tempPromise).then(() => {
        return done()
      }).catch(() => {
        return done(new Error('Rejected when should\'ve resolved'))
      })
    })

    it('should reject if main promise is already rejected', function (done) {
      const tempPromise = Promise.reject(new Error('Fake rejection.'))

      primeout('0ms', tempPromise).then(() => {
        return done(new Error('Resolved when should\'ve rejected.'))
      }).catch((err) => {
        if (err.message !== 'Fake rejection.') {
          return done(new Error('Bad error returned'))
        }

        return done()
      })
    })
  })
})
