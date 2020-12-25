const { Mongoose } = require("mongoose");

const sizeProductSchema = new mongoose.Schema({
    quantity:{
        type: Number,
        required: true
    },
    colorProduct:{
        type: Schema.Types.ObjectId,
        ref: 'ColorProduct'
    },
    size:{
        type: Schema.Types.ObjectId,
        ref: 'Size'
    }
});

module.exports = mongoose.model('SizeProduct', sizeProductSchema)