const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
    name:{
        required: true,
        type: String,
        unique: true
    },
    active: {
        required: true,
        type: Boolean
    }
})

module.exports = mongoose.model('Color', colorSchema);