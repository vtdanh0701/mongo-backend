const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rate: Number,
    comment: String
})

module.exports = mongoose.model('Review', reviewSchema)