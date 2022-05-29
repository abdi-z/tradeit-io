var express = require("express");
var router = express.Router();
var Trade = require("../models/trade");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Tradeit.gg" });
});

/*Delete trade*/
router.get("/delete/:id", function (req, res, next) {
  Trade.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/trades");
    }
  });
});

module.exports = router;
