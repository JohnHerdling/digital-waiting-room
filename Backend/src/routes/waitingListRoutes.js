const express = require("express");
const router = express.Router();
const { waitingList } = require("../data/store");

router.get("/", (req, res) => {
  res.json(waitingList);
});

module.exports = router;