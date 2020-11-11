const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        required: true,
        type: String
    },
    description:{
        required: true,
        type: String
    },
    active: {
        required: true,
        type: Boolean
    }
});

module.exports = mongoose.model('Category',categorySchema);