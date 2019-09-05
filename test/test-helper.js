process.env.ENV = 'test';

const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const { connectDatabase } = require('../src/server');

chai.use(chaiHttp);

// setTimeout(() => {
//   before(async () => {
//     await connectDatabase('library-test');
//   });

//   after(async () => {
//     await mongoose.connection.dropDatabase();
//     await mongoose.connection.close();
//   });
// });
