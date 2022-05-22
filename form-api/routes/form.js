const express = require("express");
const router = express.Router({ mergeParams: true });


router.post('/', async function (req, res) {
  console.log(req.body)
  console.log(req.files)
  res.json({ mesg: "Successfully uploaded" });
})

module.exports = router;