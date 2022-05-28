var express = require("express");
var router = express.Router();
var Trade = require("../models/trade");
//handling image
var multer = require("multer");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine });

router.get("/", function (req, res, next) {
  res.render("create");
});

router.post("/", upload.single("file"), async function (req, res, next) {
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
    image: req.file.filename,
  });
  await trade.save();
  res.redirect("/trades");
});

module.exports = router;
