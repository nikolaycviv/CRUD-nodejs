const assert = require('assert')
const User = require('../../../src/models/user') // imports the User model.
describe('USER', () => {
  describe('Creating documents', () => {
    it('creates a user', (done) => {
      // assertion is not included in mocha so
      // require assert which was installed along with mocha
      const user = new User({ name: 'John' })
      user.save() // takes some time and returns a promise
        .then(() => {
          assert(!user.isNew) // if user is saved to db it is not new
          done()
        })
    })
  })
  describe('Reading user details', () => {
    let user
    beforeEach((done) => {
      user = new User({ name: 'John' })
      user.save()
        .then(() => done())
    })
    it('finds user with the name of John', (done) => {
      User.findOne({ name: 'John' })
        .then((user) => {
          assert(user.name === 'John')
          done()
        })
    })
  })
})
