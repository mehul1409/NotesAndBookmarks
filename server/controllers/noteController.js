const Note = require("../models/Note")
const { validationResult } = require("express-validator")

exports.createNote = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { title, content, tags, isFavorite } = req.body
    const note = new Note({
      title,
      content,
      tags: tags || [],
      isFavorite: isFavorite || false,
      userId: req.user?.id,
    })

    await note.save()
    res.status(201).json(note)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getNotes = async (req, res) => {
  try {
    const { q, tags } = req.query
    const query = req.user ? { userId: req.user.id } : {}

    // Text search
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { tags: { $regex: q, $options: "i" } }
      ]
    }
    

    // Tag filter
    if (tags) {
      const tagArray = tags.split(",").map((tag) => tag.trim())
      query.tags = { $in: tagArray }
    }

    const notes = await Note.find(query).sort({ createdAt: -1 })
    res.json(notes)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
    if (!note) {
      return res.status(404).json({ message: "Note not found" })
    }

    if (req.user && note.userId && note.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" })
    }

    res.json(note)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateNote = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const note = await Note.findById(req.params.id)
    if (!note) {
      return res.status(404).json({ message: "Note not found" })
    }

    if (req.user && note.userId && note.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" })
    }

    const { title, content, tags, isFavorite } = req.body
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content, tags, isFavorite }, { new: true })

    res.json(updatedNote)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
    if (!note) {
      return res.status(404).json({ message: "Note not found" })
    }

    if (req.user && note.userId && note.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" })
    }

    await Note.findByIdAndDelete(req.params.id)
    res.json({ message: "Note deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
