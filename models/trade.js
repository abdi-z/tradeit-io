const mongoose = require("mongoose");

var tradeSchema = mongoose.Schema({
  title: String,
  contact: Number,
  address: String,
  description: String,
  city: String,
  category: String,
  date: String,
});

const Trade = mongoose.model("Trade", tradeSchema);

module.exports = Trade;
