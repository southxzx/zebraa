const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name:{
        required: true,
        type: String,
        unique: true
    },
    description:{
        required: true,
        type: String,
    },
    logo:{
        required: true,
        type: String
    },
    active: {
        required: true,
        type: Boolean
    }

})
module.exports = mongoose.model('Brand',brandSchema);

