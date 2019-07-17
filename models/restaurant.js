const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: String,
    address: String,
    review: [{type: mongoose.Schema.Types.ObjectId, ref:'Review'}]
});

module.exports = mongoose.model('Restaurant', restaurantSchema)