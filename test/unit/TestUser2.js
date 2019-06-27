// let expect = chai.expect
// const chai = require('chai')
// chai.should()
// https://github.com/Jatin136/TestingNodeWithMocha/blob/master/test/controllers/note.controller.spec.js
const User = require('../../src/models/user')
const app = require('../../src/app')

describe('note controller', function () {
  describe('get all notes', () => {
    it.skip('check all notes retrieved', function () {
      let note = {}
      beforeEach(function () {
        note = {
          title: 'test',
          content: 'this is test content'
        }
      })
      let req = { note: note }
      let res = {
        send: sinon.spy()
      }

      sinon.spy(noteController, 'findAll')
      noteController.findAll(req, res)
      noteController.findAll.calledOnce.should.be.true
    })

    it('notes retrieved successfully from database', function (done) {
      // Inorder to avoid actuall database call we mock the object
      let NoteMock = sinon.mock(Note)

      // we assume the empty result from database
      let expectedResult = []

      // we set the expectation from find method to return the expectedResult
      NoteMock.expects('find').yields(null, expectedResult)

      // we make the call to find method of Note object
      // we call verify method of mock to test the expectation
      // we check the result to be an empty array
      Note.find(function (err, result) {
        NoteMock.verify()
        NoteMock.restore()
        expect(result).to.be.an('array').empty

        // done is mocha callback function for asynchronous calls
        done()
      })
    })

    it('get all notes shoud return error', function () {

    })
  })

  describe('get single note', function () {
    it('get single note from database', function (done) {
      let note = {}
      // before each is set up function for tests, it sets the initial data
      beforeEach(function () {
        note = {
          title: 'test',
          content: 'this is test content'
        }
      })

      let NoteMock = sinon.mock(Note)

      // we expect the findOne method with argument _id and returns the result as note
      NoteMock.expects('findOne').withArgs({ _id: 1234 }).yields(null, note)

      // we check the mocked findOne method of Note model with _id parameter to be equal to note we set in expectation
      Note.findOne({ _id: 1234 }, function (err, result) {
        NoteMock.verify()
        NoteMock.restore()
        expect(result).to.be.deep.equals(note)
      })

      done()
    })
  })

  describe('create Note', function () {
    it('note saved successfully', function (done) {
      let note = new Note({
        title: 'test',
        content: 'content'
      })

      // we set the req and res object which is needed for save method
      let req = { body: { title: 'title', content: 'content' } }
      let res = {
      }

      let noteMock = sinon.mock(note)
      let note = noteMock.object

      noteMock.expects('save').yields(null, note)

      note.save({ req: req, res: res }, function (err, result) {
        noteMock.verify()
        noteMock.restore()
        expect(result).to.be.equal(note)
        done()
      })

    })
    it('note not saved and throws error')
  })

  describe('update note', function () {
    it('successfully updated note', function (done) {

      let noteMock = sinon.mock(new Note({ title: 'title', content: 'content' }))
      let note = noteMock.object

      noteMock.expects('save').withArgs({ _id: 1234 }).yields(null, 'note')

      note.save({ _id: 1234 }, function (err, result) {
        noteMock.verify()
        noteMock.restore()
        done()
      })
    })
  })

  describe('Delete note', function () {
    it('note deleted successfully', function (done) {

      let noteMock = sinon.mock(new Note({ title: 'title', content: 'content' }))
      let note = noteMock.object

      noteMock.expects('remove').withArgs({ _id: 1234 }).yields(null, 'Delete')

      note.remove({ _id: 1234 }, function (err, result) {
        noteMock.verify()
        noteMock.restore()
        done()
      })
    })
  })
})
