const mongoose = require('mongoose');

const connectDb = async ()=>{
    await mongoose.connect("mongodb+srv://basilvarghese:ED2dmAHngZcpfmBf@namasthebasil.xotfbd7.mongodb.net/devTinder")
}

module.exports = connectDb;