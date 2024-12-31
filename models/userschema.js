const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    first: {
        type: String,
        require: true
    },
    last: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    gender: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    }
});

module.exports = mongoose.model('CURD-api', userschema)