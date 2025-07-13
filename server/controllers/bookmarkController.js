const Bookmark = require("../models/Bookmark")
const { validationResult } = require("express-validator")
const axios = require("axios")
const cheerio = require("cheerio")

const fetchTitle = async (url) => {
  try {
    const response = await axios.get(url, { timeout: 5000 })
    const $ = cheerio.load(response.data)
    return $("title").text().trim() || "Untitled"
  } catch (error) {
    return "Untitled"
  }
}

exports.createBookmark = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    let { url, title, description, tags, isFavorite } = req.body

    // Auto-fetch title if not provided
    if (!title) {
      title = await fetchTitle(url)
    }

    const bookmark = new Bookmark({
      url,
      title,
      description: description || "",
      tags: tags || [],
      isFavorite: isFavorite || false,
      userId: req.user?.id,
    })

    await bookmark.save()
    res.status(201).json(bookmark)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getBookmarks = async (req, res) => {
  try {
    const { q, tags } = req.query
    const query = req.user ? { userId: req.user.id } : {}

    // Text search
    if (q) {
      query.$text = { $search: q }
    }

    // Tag filter
    if (tags) {
      const tagArray = tags.split(",").map((tag) => tag.trim())
      query.tags = { $in: tagArray }
    }

    const bookmarks = await Bookmark.find(query).sort({ createdAt: -1 })
    res.json(bookmarks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getBookmarkById = async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id)
    if (!bookmark) {
      return res.status(404).json({ message: "Bookmark not found" })
    }

    if (req.user && bookmark.userId && bookmark.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" })
    }

    res.json(bookmark)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateBookmark = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const bookmark = await Bookmark.findById(req.params.id)
    if (!bookmark) {
      return res.status(404).json({ message: "Bookmark not found" })
    }

    if (req.user && bookmark.userId && bookmark.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" })
    }

    const { url, title, description, tags, isFavorite } = req.body
    const updatedBookmark = await Bookmark.findByIdAndUpdate(
      req.params.id,
      { url, title, description, tags, isFavorite },
      { new: true },
    )

    res.json(updatedBookmark)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id)
    if (!bookmark) {
      return res.status(404).json({ message: "Bookmark not found" })
    }

    if (req.user && bookmark.userId && bookmark.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" })
    }

    await Bookmark.findByIdAndDelete(req.params.id)
    res.json({ message: "Bookmark deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
