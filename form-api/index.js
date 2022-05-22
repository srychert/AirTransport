const express = require('express')
const cors = require('cors')
const app = express()
const multer = require('multer');
const form = require('./routes/form');
require('dotenv').config()


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}.${file.originalname.split(".")[1]}`) //Appending .jpg
  }
})

const upload = multer({ storage: storage });

const port = 5000

app.use(cors())

// for parsing application/xwww-
app.use(express.urlencoded({ extended: true }));
// for parsing multipart/form-data
app.use(upload.any("filesList"));

app.use("/api/form", form);

app.listen(port, function () {
  console.log(`API listening on port ${port}`)
})