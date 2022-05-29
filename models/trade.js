const mongoose = require("mongoose");

var tradeSchema = mongoose.Schema({
  title: String,
  contact: String,
  address: String,
  description: String,
  city: String,
  category: String,
  date: String,
  image: String,
  availability: String,
});

const Trade = mongoose.model("Trade", tradeSchema);

module.exports = Trade;
