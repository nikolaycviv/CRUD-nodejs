const User = require('../../src/models/user')
const chai = require('chai')
const app = require('../../src/app')

describe('Users API Calls', () => {
  // Before each test we empty the database
  beforeEach((done) => {
    User.deleteOne({}, (err) => {
      done()
    })
  })

  it('Welcome message test', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('message').eql('Greetings from our great Holiday API!')
        done()
      })
  })

  /**
   * Test the /GET all users route
  */
  it('it should GET all the users', (done) => {
    chai.request(app)
      .get('/users')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.length.should.be.eql(0)
        done()
      })
  })

  /**
   * Test the /POST route
  */
  it('it should POST a user', (done) => {
    let user = {
      email: 'John.Doe@gmail.com',
      givenName: 'John',
      familyName: 'Doe'
    }
    chai.request(app)
      .post('/users')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('message').eql('New user created successfully!')
        res.body.user.should.have.property('email')
        res.body.user.should.have.property('givenName')
        res.body.user.should.have.property('familyName')
        done()
      })
  })

  /**
   * Test the /GET/:id route
  */
  it('it should GET a user by the given id', (done) => {
    let user = new User({
      email: 'John.Doe@gmail.com',
      givenName: 'John',
      familyName: 'Doe'
    })
    user.save((err, user) => {
      chai.request(app)
        .get(`/users/${user.id}`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('email')
          res.body.should.have.property('givenName')
          res.body.should.have.property('familyName')
          res.body.should.have.property('_id').eql(user.id)
          done()
        })
    })
  })

  /**
   * Test the /PUT/:id route
  */
  it('it should UPDATE a user given the id', (done) => {
    let user = new User({
      email: 'John.Doe@gmail.com',
      givenName: 'John',
      familyName: 'Doe'
    })
    user.save((err, user) => {
      chai.request(app)
        .put(`/users/${user.id}`)
        .send({
          email: 'john.smith@gmail.com',
          givenName: 'john',
          familyName: 'smith'
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('message').eql('The user is udpated.')
          res.body.user.should.have.property('email').eql('john.smith@gmail.com')
          res.body.user.should.have.property('familyName').eql('smith')
          done()
        })
    })
  })

  /**
   * Test the /DELETE/:id route
  */
  it('it should DELETE a user given the id', (done) => {
    let user = new User({
      email: 'John.Doe@gmail.com',
      givenName: 'John',
      familyName: 'Doe'
    })
    user.save((err, user) => {
      chai.request(app)
        .delete(`/users/${user.id}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('message').eql('The user is deleted successfully!')
          done()
        })
    })
  })
})
