var express = require("express");
var Trade = require("../models/trade");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  let formated = req.query.search + "";
  const srch =
    formated.charAt(0).toUpperCase() + formated.slice(1).toLowerCase();
  console.log(srch);
  Trade.find({ city: srch }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.render("trades", { trades: data });
    }
  });
});

module.exports = router;
