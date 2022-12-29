const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: { type: String, required: true },
    decscription: { type: String, required: true },
    price: { type: Number, default: 0, required: true },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subcategory: [{
        type: String,
        colour: [{
            name: String,
            image: String,
        }, ],
        size: [{
            val: Number,
            price: Number,
        }],
    }],
    productImg: { type: String, required: true },
    multiImg: { type: Array },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    available: {
        type: Boolean,
        default: true
    },
    comments: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }
})

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product