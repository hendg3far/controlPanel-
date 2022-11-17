const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    fullname: { type: String, required: [true, "fullname not provided "] },
    email: {
        type: String,
        unique: [true, "email already exists in database!"],
        required: [true, "email not provided"]
    },
    phone: { type: String, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        required: [true, "Please specify user role"]
    },
    countries: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country'
    }
}, { timestamps: true })


UserSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email')

}

const User = mongoose.model('User', UserSchema);
module.exports = User;