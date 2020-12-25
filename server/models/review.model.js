const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const reviewSchema = new mongoose.Schema({
    product:{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    comment:{
        type: String,
        maxlength: 1000
    }
},{timestamps: true});

module.exports = mongoose.model('Review', reviewSchema);