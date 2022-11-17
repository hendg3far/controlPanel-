const User = require('../models/user')
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge })
}

module.exports.sign_up = async(req, res) => {

    try {
        const user = await User.create(req.body);
        const token = createToken(user._id);
        res.cookie(process.env.TOKEN_SECRET, token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({ user: user._id });
    } catch (err) {
        res.status(400).json({
            message: "User not successful created",
            error: err.message,
        })
    }
}

module.exports.sign_in = async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie(process.env.TOKEN_SECRET, token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).json({ user: user._id, token: token });

    } catch (err) {
        res.status(400).json({
            message: "An error occurred",
            error: err.message,
        });
    }
}