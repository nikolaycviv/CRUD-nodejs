const sinon = require('sinon')
const sandbox = require('../sandbox')
const UserModel = require('../../src/models/user')
// const userController = require('../../src/controllers/user')

describe('Users API Calls', () => {
  // Before each test we empty the database
  let userMock, user
  beforeEach(() => {
    userMock = sinon.mock(new UserModel({
      email: 'John.Doe@gmail.com',
      givenName: 'John',
      familyName: 'Doe'
    }))
    user = userMock.object
    sandbox.stub(UserModel, 'findById').resolves()
  })

  it('Welcome message test', () => {})

  /**
   * Test the /GET all users route
  */
  it.skip('it should GET all the users', () => {
    expect(UserModel.findById).to.have.been.calledOnce()
    expect(UserModel.findById).to.have.been.calledWith({
      email: 'John.Doe@gmail.com',
      givenName: 'John',
      familyName: 'Doe'
    })
  })

  /**
   * Test the /POST route
  */
  it.skip('it should POST a user', () => {
    let req = { body: { email: 'John.Doe@gmail.com', givenName: 'John', familyName: 'Doe' } }
    let res = {}

    userMock.expects('save').yields(null, user)
    user.save({ req, res }, (err, result) => {
      userMock.verify()
      userMock.restore()
      expect(result).to.be.equal(user)
    })
  })

  /**
   * Test the /GET/:id route
  */
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

  /**
   * Test the /PUT/:id route
  */
  it.skip('it should UPDATE a user given the id', () => {
    userMock.expects('save').withArgs({ _id: 1234 }).yields(null, 'user')

    user.save({ _id: 1234 }, (err, result) => {
      userMock.verify()
      userMock.restore()
    })
  })

  /**
   * Test the /DELETE/:id route
  */
  it.skip('it should DELETE a user given the id', () => {
    userMock.expects('remove').withArgs({ _id: 1234 }).yields(null, 'Delete')
    user.remove({ _id: 1234 }, (err, result) => {
      userMock.verify()
      userMock.restore()
    })
  })
})
