const { AsyncRouter } = require('express-async-router');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Book = require('../models/Book');

const controller = AsyncRouter();

//create
controller.post('/', async (req, res) => {
    const book = new Book(req.body);
    await book.save();
    res.status(201).send(book);
    console.log(book)
})

//list
controller.get('/', async (req, res) => {
    const books = await Book.find();
    res.status(200).send(books);
})

//retrieve
controller.get('/:_id', async (req, res) => {
    const book = await Book.findOne({ _id: req.params._id });
    console.log(book.title)
    if(!book) return res.sendStatus(404);
    res.send(book);

//update

})
module.exports = controller;

