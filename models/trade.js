const mongoose=require('mongoose');

var tradeSchema=mongoose.Schema({
    title:String,
    description:String,
    location:String,
    picture:String,
    date:String,
})


const Trade=mongoose.model('Trade',tradeSchema);

module.exports = Trade;