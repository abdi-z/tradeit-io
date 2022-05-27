var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
/* GET home page. */
var jsonParser = bodyParser.json();
var multer = require("multer");
const upload = multer({ dest: "uploads/" });

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var Trade = require("../models/trade");

router.get("/", function (req, res, next) {
  res.render("create");
});

router.post(
  "/",
  upload.single("tradeImage"),
  jsonParser,
  async function (req, res, next) {
    console.log(req.body);
    console.log(req.file);
    const d = new Date();
    let today = d.toString().substring(0, 15);
    let trade = new Trade({
      title: req.body.title,
      contact: req.body.contact,
      address: req.body.address,
      description: req.body.description,
      city: req.body.city,
      category: req.body.category,
      date: today,
    });
    await trade.save();
    res.send(trade);
  }
);
module.exports = router;
