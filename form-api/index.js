const express = require('express')
const cors = require('cors')
const app = express()
const multer = require('multer');
const upload = multer({ dest: "uploads/" });
const form = require('./routes/form');

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