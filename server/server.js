const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err))

app.use('/health-check',(req,res)=>{
  res.json("Server is running");
})

// Routes
app.use("/api/notes", require("./routes/notes"))
app.use("/api/bookmarks", require("./routes/bookmarks"))
app.use("/api/auth", require("./routes/auth"))

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: "Something went wrong!" })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})