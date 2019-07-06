// const chai = require('chai')
// chai.should()
const User = require('../../src/models/user')
const userController = require('../../src/controllers/user')

describe('Users API Calls', () => {
  // Before each test we empty the database
  let userMock, user
  beforeEach((done) => {
    userMock = sinon.mock(new User({
      email: 'John.Doe@gmail.com',
      givenName: 'John',
      familyName: 'Doe'
    }))
    user = userMock.object
  })

  it.skip('Welcome message test', (done) => {
    // chai.request(app)
    //   .get('/')
    //   .end((err, res) => {
    //     res.should.have.status(200)
    //     res.body.should.be.a('object')
    //     res.body.should.have.property('message').eql('Greetings from our great Holiday API!')
    //     done()
    //   })
  })

  /**
   * Test the /GET all users route
  */
  it('it should GET all the users', (done) => {
    let req = { user }
    let res = {
      send: sinon.spy()
    }

    sinon.spy(userController, 'findAll')
    userController.findAll(req, res)
    userController.findAll.calledOnce.should.be.true()
  })

  /**
   * Test the /POST route
  */
  it('it should POST a user', (done) => {
    let req = { body: { email: 'John.Doe@gmail.com', givenName: 'John', familyName: 'Doe' } }
    let res = {}

    userMock.expects('save').yields(null, user)
    user.save({ req, res }, (err, result) => {
      userMock.verify()
      userMock.restore()
      expect(result).to.be.equal(user)
      done()
    })
  })

  /**
   * Test the /GET/:id route
  */
  it('it should GET a user by the given id', (done) => {
    // we expect the findOne method with argument _id and returns the result as note
    userMock.expects('findOne').withArgs({ _id: 1234 }).yields(null, user)

    // we check the mocked findOne method of User model with _id parameter to be equal to user we set in expectation
    User.findOne({ _id: 1234 }, (err, result) => {
      userMock.verify()
      userMock.restore()
      expect(result).to.be.deep.equals(user)
    })

    done()
  })

  it('user not saved and throws error')

  /**
   * Test the /PUT/:id route
  */
  it('it should UPDATE a user given the id', (done) => {
    userMock.expects('save').withArgs({ _id: 1234 }).yields(null, 'user')

    user.save({ _id: 1234 }, (err, result) => {
      userMock.verify()
      userMock.restore()
      done()
    })
  })

  /**
   * Test the /DELETE/:id route
  */
  it('it should DELETE a user given the id', (done) => {
    userMock.expects('remove').withArgs({ _id: 1234 }).yields(null, 'Delete')
    user.remove({ _id: 1234 }, (err, result) => {
      userMock.verify()
      userMock.restore()
      done()
    })
  })
})
