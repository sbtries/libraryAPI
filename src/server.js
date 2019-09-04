const express = require('express');

app = express();

app.get('/', (req, res) => {
    res.send('hello, CRUEL WORLD').status(200)
})

module.exports = {
    app,
};