const sinon = require('sinon')
const assert = require('assert')
const sandbox = require('../../sandbox')
const UserModel = require('../../../src/models/user')
const userController = require('../../../src/controllers/user')

describe('Users API Calls', () => {
  let userMock, user
  beforeEach(() => {
    userMock = sinon.mock(new UserModel({
      email: 'John.Doe@gmail.com',
      givenName: 'John',
      familyName: 'Doe'
    }))
    user = userMock.object
    sandbox.stub(UserModel, 'findById')
  })

  it.skip('it should GET all the users', (done) => {
    UserModel.findById.resolves(userMock)
    userController.userDetails({ params: { id: 'John.Doe@gmail.com' } })
    expect(UserModel.findById).to.have.been.calledOnce()
    expect(UserModel.findById).to.have.been.calledWith('John.Doe@gmail.com')
  })

  it.skip('it should create a user', (done) => {
    // takes some time and returns a promise
    user.save()
      .then(() => {
        // if user is saved to db it is not new
        assert(!user.isNew)
        done()
      })
  })

  it.skip('it should GET a user by the given id', () => {
    // we expect the findOne method with argument _id and returns the result as note
    userMock.expects('findOne').withArgs({ _id: 1234 }).yields(null, user)

    // we check the mocked findOne method of User model with _id parameter to be equal to user we set in expectation
    UserModel.findOne({ _id: 1234 }, (err, result) => {
      userMock.verify()
      userMock.restore()
      expect(result).to.be.deep.equals(user)
    })
  })

  it('user not saved and throws error')

  it.skip('it should UPDATE a user given the id', () => {
    userMock.expects('save').withArgs({ _id: 1234 }).yields(null, 'user')

    user.save({ _id: 1234 }, (err, result) => {
      userMock.verify()
      userMock.restore()
    })
  })

  it.skip('it should DELETE a user given the id', () => {
    userMock.expects('remove').withArgs({ _id: 1234 }).yields(null, 'Delete')
    user.remove({ _id: 1234 }, (err, result) => {
      userMock.verify()
      userMock.restore()
    })
  })
})
