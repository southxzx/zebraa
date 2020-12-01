const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const productShema = new mongoose.Schema(
    { 
        name: {
            required: true,
            type: String,
            unique: 1,
            maxlength:100
        },
        description:{
            required: true,
            type: String,
            maxlength:100000
        },
        price:{
            required: true,
            type: Number,
            maxlength: 255
        },
        brand:{
            type: Schema.Types.ObjectId,
            ref: 'Brand',
            required: true
        },
        images:{
            type: Array,
            default:[]
        },
        category:{
            type: Schema.Types.ObjectId,
<<<<<<< HEAD
            ref: 'Type',
            required: true
        },
        available:{
            required: true,
            type: Boolean
=======
            ref: 'Category',
            required: true
        },
        quantity:{
            required: true,
            type: Number
>>>>>>> master
        },
        color:{
            type: Schema.Types.ObjectId,
            ref: 'Color',
            required: true
        },
        size:{
            type: Schema.Types.ObjectId,
            ref: 'Size',
            required: true
<<<<<<< HEAD
        }
    }
)
=======
        },
        review:{
            type: Array,
            default:[]
        },
        active:{
            required: true,
            type:Boolean
        }
    },{timestamps:true});

module.exports = mongoose.model('Product', productShema);
>>>>>>> master
