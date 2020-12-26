const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const sizeProductSchema = new mongoose.Schema({
    quantity:{
        type: Number,
        required: true
    },
    size:{
        type: Schema.Types.ObjectId,
        ref: 'Size'
    },
    colorProduct:{
        type: Schema.Types.ObjectId,
        ref: 'ColorProduct'
    }
});

module.exports = mongoose.model('SizeProduct', sizeProductSchema)