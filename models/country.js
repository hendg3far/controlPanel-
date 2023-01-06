const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CountrySchema = new Schema({
    isoCode: { type: String, required: true },
    name: { type: String, required: true },
    phonecode: { type: String, required: true, unique: true },
    flag: { type: String, required: true },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cities: [{
        type: Schema.Types.ObjectId,
        ref: 'City'
    }],
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
}, { timestamps: true })

const Country = mongoose.model('Country', CountrySchema)
module.exports = Country