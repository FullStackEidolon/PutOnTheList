const express = require('express');
const Note = require('./../models/noteModel'); // Import the Note model

const router = express.Router();

// Create a new note
router.post('/api/notes', async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();
    res.status(201).send(note);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all notes
router.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.send(notes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a note by ID
router.get('/api/notes/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send({ error: 'Note not found' });
    }
    res.send(note);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a note by ID
router.patch('/api/notes/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['title', 'content'];
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({ error: 'Invalid updates' });
  }

  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!note) {
      return res.status(404).send({ error: 'Note not found' });
    }
    res.send(note);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a note by ID
router.delete('/api/notes/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).send({ error: 'Note not found' });
    }
    res.send(note);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
