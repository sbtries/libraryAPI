const chai = require('chai');
const { expect } = chai;
const jwt = require('jsonwebtoken');
const { getToken, signUpUser, validUser } = require('./user.controller.test');

const { app } = require('../../src/server');
const Book = require('../../src/models/Book');

const createBook = async (user, token) => {
  return await chai 
  .request(app)
  .post('/book')
  .send({
    title: 'moo in the field of green',
    author: 'lyra, moo',
    user: user,
  })
  .set('Authorization', `Bearer ${token}`);
}

describe('book.controller.js', () => {
  before(async function() {
    this.token = await getToken();
    this.user = jwt.verify(this.token, process.env.JWT_SECRET);
    console.log(this.user)
    this.otherToken = await getToken();
    this.otherUser = jwt.verify(this.otherToken, process.env.JWT_SECRET);
  });

  it('POST /book: create a book record', async function() {
    const response = await createBook(this.user, this.token )
    expect(response.status).to.eq(201);
    expect(response.body).to.be.a('object');
  });

  it('GET /book: return a list of books', async () => {
    const response = await chai.request(app).get('/book');
    expect(response.status).to.eq(200);
    // expect(response.body).to.be.a('array');
  });

  it('GET /book/:_id: return a book by its id', async () => {
    const a_book = await Book.findOne({ title: 'moo in the field of green' });
    const response = await chai.request(app).get(`/book/${a_book._id}`);
    expect(response.status).to.eq(200);
    expect(response.body).to.be.a('object');
  });

  it('PATCH /book/:_id: update a book by its id', async function () {
    const a_book = await Book.findOne({ title: 'moo in the field of green' });
    const response = await chai
      .request(app)
      .patch(`/book/${a_book._id}`)
      .set("Authorization", `Bearer ${this.token}`)
      .send({
        title: 'blargleflargle'
      });
    expect(response.status).to.eq(200);
    expect(response.body).to.be.a('object');
  });
  it('PATCH /checkout/book/:_id: checks out a book to a user', async function() {
    const a_book = await Book.findOne({ title: 'blargleflargle' });
    const response = await chai
      .request(app)
      .patch(`/book/checkout/${a_book._id}`)
      .set('Authorization', `Bearer ${this.token}`)
      .send({
        user: this.user,
        available: false
      });
    expect(response.status).to.eq(200);
    expect(response.body.user).to.eq(this.user._id);
    expect(response.body.available).to.eq(false)
  });

  it('PATCH /book/:id: does not allow checked out books to be checked out', async function() {
    const a_book = await Book.findOne({ title: 'blargleflargle' });
    const response = await chai
      .request(app)
      .patch(`/book/checkout/${a_book._id}`)
      .set('Authorization', `Bearer ${this.otherToken}`)
      .send({
        user: this.otherUser,
        available: false
      });
    expect(response.status).to.eq(401);
  });
  it('PATCH /book/:id: does not allow nonusers to check out books', async function() {
    const a_book = await Book.findOne({ title: 'blargleflargle' });
    const response = await chai
      .request(app)
      .patch(`/book/${a_book._id}`)
      .send({
        user: 'anotherUser',
        available: false
      });
    expect(response.status).to.eq(401);
  });

  it('PATCH /book/:id: returns a book', async function() {
    const a_book = await Book.findOne({ title: 'blargleflargle' });
    const response = await chai
      .request(app)
      .patch(`/book/${a_book._id}`)
      .set('Authorization', `Bearer ${this.token}`)
      .send({
        user: null,
        available: true
      });
    expect(response.status).to.eq(200);
  });

  it('DELETE /book/:_id: delete a book by its id', async () => {
    const a_book = await Book.findOne({ title: 'blargleflargle' });
    const response = await chai
    .request(app)
    .delete(`/book/${a_book._id}`)
    .set('Authorization', `Bearer ${this.token}`)
    expect(response.status).to.eq(200);
    expect(response.body).to.be.a('object');
  });
});
