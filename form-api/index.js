const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: "uploads/" });
const form = require('./routes/form');

const port = 5000

app.use(cors())

// for parsing application/json
// app.use(express.json());

// for parsing application/xwww-
// app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(express.urlencoded({ extended: true }));
app.use(upload.any("filesList"));
// app.use(express.static('public'));

app.use("/api/form", form);

app.listen(port, function () {
  console.log(`API listening on port ${port}`)
})