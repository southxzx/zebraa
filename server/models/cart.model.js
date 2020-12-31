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
        type: String
    },
    idSize:{
        type: String
    },
    idUser:{
        type: String
    }
})

module.exports = mongoose.model('Cart', cartSchema);