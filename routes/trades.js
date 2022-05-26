var express = require("express");
var Trade = require("../models/trade");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  Trade.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.render("trades", { trades: data });
    }
  });
});

router.get("/:id", function (req, res, next) {
  Trade.findById(req.params.id, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.render("details", { trade: data });
    }
  });
});

module.exports = router;
