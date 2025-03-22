
const express = require('express');
const Book = require('../models/bookModel.js');
const router = express.Router();

// Create a new book
router.post('/', async (req, res) => {
    try {
        const { title, author, publishedYear, genre } = req.body;
        const newBook = new Book({ title, author, publishedYear, genre });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        console.log("Error in adding the books",error);
        res.status(500).json({ error: 'Error adding book' });
    }
});

// Get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {        console.log("Error in getting the books",error);

        res.status(500).json({ error: 'Error fetching books' });
    }
});

// Get a single book by ID
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ error: 'Book not found' });
        res.json(book);
    } catch (error) {
        console.log("Error in getting the books",error);

        res.status(500).json({ error: 'Error fetching book' });
    }
});

// Update a book
router.put('/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) return res.status(404).json({ error: 'Book not found' });
        res.json(updatedBook);
    } catch (error) {
        res.status(500).json({ error: 'Error updating book' });
    }
});

// Delete a book
router.delete('/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ error: 'Book not found' });
        res.json({ message: 'Book deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting book' });
    }
});

module.exports = router;

