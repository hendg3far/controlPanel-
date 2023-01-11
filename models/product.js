const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, default: 0, required: true },
    multiImg: {
        type: Array,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required: true
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: 'City',
        required: true
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
})

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product