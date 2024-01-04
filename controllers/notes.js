const Note = require('../models/notes');
const { body, validationResult } = require('express-validator')

async function retrieveNote(req, res) {
    try {
        const notes = await Note.find({});
        res.send(notes);
    }
    catch (e) {
        console.log(e.message);
        res.status(500).json({ error: e.message });
    }
}

async function newNote(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        const note = new Note(req.body);
        await note.save();
        res.send('Note received successfully');
    }
    catch (e) {
        console.log(e.message);
        res.status(500).json({ error: e.message });
    }
}

async function updateNote(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }

        const { id } = req.params;
        const updatedNote = await Note.findOneAndUpdate({ _id: id }, req.body, { new: true });
        res.json(updatedNote);
    }
    catch (e) {
        console.log(e.message);
        res.status(500).json({ error: e.message });
    }
}

async function deleteNote(req, res) {
    try {
        const { id } = req.params;
        await Note.deleteOne({ _id: id });
        res.send('Note deleted successfully');
    }
    catch (e) {
        console.log(e.message);
        res.status(500).json({ error: e.message });
    }
}

function validate(method) {
    switch (method) {
        case 'newNote':
        case 'updateNote': {
            return [
                body('title', 'Title is required').trim().notEmpty(),
                body('title', 'Title length greater than 500').isLength({ max: 500 }),
                body('content', 'Content is required').trim().notEmpty(),
                body('content', 'Content length greater than 4000').isLength({ max: 4000 })
            ]
        }
    }
}

module.exports = { newNote, retrieveNote, updateNote, deleteNote, validate };