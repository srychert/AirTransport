const express = require("express");
const router = express.Router({ mergeParams: true });
const email = require("../email")

router.post('/', async function (req, res) {
  console.log(req.body)
  console.log(req.files)
  email(req.body, req.files)
    .then(response => res.json({ message: "Successfully sent" }))
    .catch(error => {
      console.error(error)
      res.status(500).json({ message: error.message ? error.message : "Error while sending" })
    });
})

module.exports = router;