const mongoose = require('mongoose');
cartSchema = require("../models/cart.model").schema;

const Schema = mongoose.Schema;
const orderSchema = new mongoose.Schema({
    idUser:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    cart:[cartSchema],
    status:{
        type: String
    },
    payment:{
        type: String
    },
    shipment:{
        type: String
    },
    name:{
        type: String
    },
    note:{
        type: String
    },
    address:{
        type: String
    },
    phone:{
        type: String
    },
    totalRaw:{
        type: Number
    },
    shipmentFee:{
        type: Number
    },
    discount:{
        type: Number
    },
    totalOrder:{
        type: Number
    }
},{timestamps: true});

module.exports = mongoose.model('Order',orderSchema)