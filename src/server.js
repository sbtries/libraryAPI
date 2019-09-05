const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const AuthController = require('./controllers/user.controller');

app = express();

app.use(cors);
app.use(express.json());
/* istanbul ignore next */
if (process.env.ENV !== 'test') this.app.use(morgan('tiny'));

app.use('/auth', AuthController);

app.get('/', (req, res) => {
  res.send('hello, CRUEL WORLD').status(200);
});

const connectDatabase = async databaseName => {
  try {
    const connection = await mongoose.connect(`mongodb://localhost/${databaseName}`, {
      useNewUrlParser: true,
      useCreateIndex: true
    });

    /* istanbul ignore next */
    if (process.env.ENV !== 'test') console.log(`Connected to database '${databaseName}'...`);
    return connection;
  } catch (error) {
    /* istanbul ignore next */
    console.log(error);
  }
};

module.exports = {
  app,
  connectDatabase
};
