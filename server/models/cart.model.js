const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const cartSchema = new mongoose.Schema({
    idProduct:{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    idColorProduct:{
        type: Schema.Types.ObjectId,
        ref: 'ColorProduct',
        required: true
    },
    idSize:{
        type: String
    },
    idUser:{
        type: String
    }
},{timestamps: true})

module.exports = mongoose.model('Cart', cartSchema);