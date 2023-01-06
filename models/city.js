const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CitySchema = new Schema({
    name: { type: String, required: true },
    phonecode: { type: String, required: true, unique: true },
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
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
}, { timestamps: true })

const City = mongoose.model('City', CitySchema)
module.exports = City