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
            maxlength:10000
        },
        category:{
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        review:[
            {
                type: Schema.Types.ObjectId,
                ref: 'Review'
            }
        ],
        active:{
            required: true,
            type:Boolean
        },
        colorProducts:[
            {
                type: Schema.Types.ObjectId,
                ref: 'ColorProduct'
            }
        ]
    },{timestamps:true});

module.exports = mongoose.model('Product', productShema);
