const chai = require('chai');
const { expect } = chai;
const jwt = require('jsonwebtoken');

const { app } = require('../../src/server');

describe('user.controller.js', () => {
  it('POST /signup: allows valid users to sign up', async () => {
    const response = await chai
      .request(app)
      .post('/signup')
      .send({
        username: 'testUser',
        password: 'password123',
        passwordCheck: 'password123'
      });
    expect(response.status).to.equal(200);
  });
  it('POST /signup: doesnt allow duplicate usernames to sign up', async () => {
    const response = await chai
      .request(app)
      .post('/signup')
      .send({
        username: 'testUser',
        password: 'passwordalso',
        passwordCheck: 'passworldalso'
      });
    expect(response.status).to.equal(400);
  });
  it("POST /signup: doesn't allow signup with");
});
