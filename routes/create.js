var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const multer=require("multer")
const upload=multer({dest:'/uploads/'})
/* GET home page. */
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var Trade = require("../models/trade");
router.get("/", function (req, res, next) {
  res.render("create");
});

router.post("/", jsonParser, async function (req, res, next) {
  console.log(req.body);
  let trade = new Trade(req.body);
  await trade.save();
  res.redirect("/trades");
});
module.exports = router;
