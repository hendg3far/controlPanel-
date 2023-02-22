const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SettingSchema = new Schema({
    name: { type: String, required: true },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true })

const Setting = mongoose.model('Setting', SettingSchema)
module.exports = Setting