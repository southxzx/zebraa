const mongoose = require("mongoose");

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
    sizeProducts:[
        {
            type: Schema.Types.ObjectId,
            ref: 'SizeProduct'
        }
    ],
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