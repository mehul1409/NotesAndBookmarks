const express = require("express")
const { body } = require("express-validator")
const noteController = require("../controllers/noteController")
const auth = require("../middlewares/auth")

const router = express.Router()

const noteValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("content").notEmpty().withMessage("Content is required"),
]

router.post("/", auth.optional, noteValidation, noteController.createNote)
router.get("/", auth.auth, noteController.getNotes)
router.get("/:id", auth.optional, noteController.getNoteById)
router.put("/:id", auth.optional, noteValidation, noteController.updateNote)
router.delete("/:id", auth.optional, noteController.deleteNote)

module.exports = router
