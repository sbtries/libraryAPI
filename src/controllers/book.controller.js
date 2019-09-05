const { AsyncRouter } = require('express-async-router');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Book = require('../models/Book');

const controller = AsyncRouter();

controller.post('/book', async (req, res) => {
    const book = new Book(req.body);
    await book.save();
    res.status(201).send(book);
})

module.exports = controller;


