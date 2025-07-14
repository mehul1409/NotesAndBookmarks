const express = require("express")
const { body } = require("express-validator")
const bookmarkController = require("../controllers/bookmarkController")
const auth = require("../middlewares/auth")

const router = express.Router()

const bookmarkValidation = [body("url").isURL().withMessage("Please enter a valid URL")]

router.get('/fetch-title', bookmarkController.fetchTitleFromUrl);
router.post("/", auth.auth, bookmarkValidation, bookmarkController.createBookmark)
router.get("/", auth.auth, bookmarkController.getBookmarks)
router.get("/:id", auth.auth, bookmarkController.getBookmarkById)
router.put("/:id", auth.auth, bookmarkValidation, bookmarkController.updateBookmark)
router.delete("/:id", auth.auth, bookmarkController.deleteBookmark)

module.exports = router
