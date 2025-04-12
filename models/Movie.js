const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    genre:{
        type: String,
        required: true
    },
    year: { 
        type: Number,
        required: true
    },
    price:{ 
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Movie", movieSchema);