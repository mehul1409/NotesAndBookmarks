const mongoose = require("mongoose")

const bookmarkSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^https?:\/\/.+/.test(v),
        message: "Please enter a valid URL",
      },
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    isFavorite: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
)

// Text search index
bookmarkSchema.index({ title: "text", description: "text" })

module.exports = mongoose.model("Bookmark", bookmarkSchema)
