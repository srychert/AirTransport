const express = require("express");
const router = express.Router({ mergeParams: true });

router.post('/', async function (req, res) {
  console.log(req.body)
  console.log(req.files)
  res.json({ message: "Successfully sent" });
})

module.exports = router;