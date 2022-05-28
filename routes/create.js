var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");
/* GET home page. */
var jsonParser = bodyParser.json();
const crypto = require("crypto");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var Trade = require("../models/trade");

//upload image work

let gfs;

var conn = mongoose.createConnection(
  "mongodb+srv://abdi:k4t5rk0o1@servercluster.q691c.mongodb.net/?retryWrites=true&w=majority"
);
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
  // all set!
});

//create storage engine

const storage = new GridFsStorage({
  url: "mongodb+srv://abdi:k4t5rk0o1@servercluster.q691c.mongodb.net/?retryWrites=true&w=majority",
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

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
  res.send(trade);
});

//@route GET /files
//@desc Display all files in JSON

router.get("/files", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        error: "No files exist",
      });
    }

    // Files exist
    return res.json(files);
  });
});

//@route GET /file/:filename
//@desc Display single file in JSON

router.get("/files/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }
    //file exists
    return res.json(file);
  });
});

//display actual file
//router /image/:filename
router.get("/image/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }

    // Check if image
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      // Read output to browser
      const readstream = gfs.createReadStream(req.params.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image",
      });
    }
  });
});

module.exports = router;
