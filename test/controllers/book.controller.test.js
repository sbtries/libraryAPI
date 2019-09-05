const chai = require('chai');
const { expect } = chai;
const jwt = require('jsonwebtoken');

const { app } = require('../../src/server');

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
});
