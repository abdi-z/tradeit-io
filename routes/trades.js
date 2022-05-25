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
      res.render("trades",{trades:data});
    }
  });
  
});

module.exports = router;
