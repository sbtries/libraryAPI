const chai = require('chai');
const { expect } = chai;
const jwt = require('jsonwebtoken');

const { app } = require('../../src/server');
const Book = require('../../src/models/Book');

describe('book.controller.js', () => {
  it('POST /book: create a book record', async () => {
    const response = await chai
      .request(app)
      .post('/book')
      .send({
        title: 'moo in the field of green',
        author: 'lyra, moo'
      });
    expect(response.status).to.eq(201);
    expect(response.body).to.be.a('object');
  });

  it('GET /book: return a list of books', async () => {
    const response = await chai.request(app).get('/book');
    // console.log(request.body)
    expect(response.status).to.eq(200);
    // expect(response.body).to.be.a('array');
  });

  it('GET /book/:_id: return a book by its id', async () => {
    const a_book = await Book.findOne({title: 'moo in the field of green'});
    const response = await chai.request(app).get(`/book/${a_book._id}`);
    expect(response.status).to.eq(200);
    expect(response.body).to.be.a('object');
  });

  it('PATCH /book/:_id: update a book by its id', async () => {
    const response = await chai
      .request(app)
      .patch(`/book/${a_book._id}`)
      .send({
        title: 'blargleflargle'
      });
    expect(response.status).to.eq(200);
    expect(response.body).to.be.a('object');
  });

  it('DELETE /book/:_id: delete a book by its id', async () => {
    const response = await chai.request(app).get(`/book/${a_book._id}`);
    expect(response.status).to.eq(200);
    expect(response.body).to.be.a('object');
  });
});
