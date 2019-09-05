const chai = require('chai');
const { expect } = chai;
const jwt = require('jsonwebtoken');

const { app } = require('../../src/server');

describe('user.controller.js', () => {
  it('POST /signup: allows valid users to sign up', async () => {
    const response = await chai
      .request(app)
      .post('/user/sign-up')
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
      .post('/user/sign-up')
      .send({
        username: 'testUser',
        password: 'passwordalso',
        passwordCheck: 'passworldalso'
      });
    expect(response.status).to.equal(422);
  });

  it('POST /signup: doesnt allow nonmatching passwords', async () => {
    const response = await chai 
    .request(app)
    .post('/user/sign-up')
    .send({
      username: 'testUser2',
      password: 'passWord',
      passwordCheck: 'Wordpass'
    })
    expect(response.status).to.equal(422);
  })

  it('POST /signup: doesnt allow invalid users', async () => {
    const response = await chai 
    .request(app)
    .post('/user/sign-up')
    .send({
      username: 'testUser3'
    })
    expect(response.status).to.equal(422);
  })

it('POST /login: allows users to login', async () => {
  const response = await chai 
    .request(app)
    .post('/user/login')
    .send({
      username: 'testUser',
      password: 'password123',
  })
  console.log('SDFLJSDFJHFDOUHEJ')
  console.log(response.body)
  expect(response.status).to.equal(200);
  this.token = response.body.token;
  const user = jwt.verify(this.token, process.env.JWT_TOKEN);
  expect(user.username).to.equal('testUser')
})

it('POST /login: doesnt allow nonexistant users to login', async () => {
  const response = await chai 
  .request(app)
  .post('/user/login')
  .send({
    username: 'notaUser',
    password: 'doesntmatter',
})
  // console.log(response)
  expect(response.status).to.equal(403);
})
it('POST /login: doesnt allow incorrect passwords', async() => {
  const response = await chai 
  .request(app)
  .post('/user/login')
  .send({
    username: 'testUser',
    password: 'wrongPASSWORD',
})
  expect(response.status).to.equal(403);

})
});