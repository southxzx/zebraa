const mongoose = require("mongoose");
sizeProductSchema = require("../models/size_product").schema;

const Schema = mongoose.Schema;
const colorProductSchema = new mongoose.Schema({
    color: {
        type: Schema.Types.ObjectId,
        ref: 'Color'
    },
    images: {
        type: Array,
        default:[]
    },
    sizeProducts:[sizeProductSchema],
    price: {
        type: Number,
        required: true
    },
    avatar: {
        type: Boolean,
        default: false
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
},{timestamps: true});

module.exports = mongoose.model('ColorProduct',colorProductSchema);