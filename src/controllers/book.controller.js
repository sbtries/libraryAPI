const { AsyncRouter } = require('express-async-router');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtMiddleware = require("../middleware/jwt.middleware");

const Book = require('../models/Book');

const controller = AsyncRouter();

//create
controller.post('/', jwtMiddleware, async (req, res) => {
    const book = new Book(req.body);
    await book.save();
    res.status(201).send(book);
})

//list
controller.get('/', async (req, res) => {
    const books = await Book.find();
    // console.log(books)
    res.status(200).send(books);
})

//retrieve
controller.get('/:_id', async (req, res) => {
    const book = await Book.findOne({ _id: req.params._id });
    if(!book) return res.sendStatus(404);
    res.send(book);
})

//update
controller.patch('/:_id', jwtMiddleware, async (req, res) => {
    const book = await Book.findOne({ _id: req.params._id });
    if(!book) return res.sendStatus(404);
    book.set(req.body)
    await book.save();
    res.send(book);
})

//delete
controller.delete('/:_id', jwtMiddleware, async (req, res) => {
    const book = await Book.findOne({ _id: req.params._id });
    if(!book) return res.sendStatus(404);
    await book.remove();
    res.send(book);
})

//CHECKOUTS
controller.patch('/:_id', jwtMiddleware, async (req, res) => {
    const book = await Book.findOne({ _id: req.params._id });
    if(!book) return res.sendStatus(404);
    book.set(req.body)
    await book.save();
    res.send(book);
})



module.exports = controller;