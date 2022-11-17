require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requireAuth = (req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0]) {
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.TOKEN_SECRET, function(err, decode) {
            if (err) req.user = undefined;
            User.findOne({ _id: decode.id })
                .exec((err, user) => {
                    if (err) {
                        res.status(500).send({ message: err });
                    } else {
                        if (user.role !== 'admin') {
                            return res.status(401).json({ message: "Not authorized" })
                        } else {
                            req.user = user;
                            next();
                        }

                    }
                })
        });
    } else {
        req.user = undefined;
        next();
    }
}


module.exports = { requireAuth }