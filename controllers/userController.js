const User = require('../models/user')
var { ObjectID } = require("mongodb")

module.exports.get_users = async(req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ message: err });
        throw err;
    }
}

module.exports.get_user = async(req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID invalid : " + req.params.id);
    try {
        const user = await User.findOne({ _id: req.params.id })

        res.status(201).json(user);

    } catch (err) {
        res.status(500).json({ message: err });
        throw err;
    }
}

module.exports.update_user = async(req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID invalid : " + req.params.id);
    try {
        const user = await User.findByIdAndUpdate({ _id: req.params.id }, req.body)
        res.status(201).json(user);

    } catch (err) {
        res.status(500).json({ message: err });
        throw err;
    }
}

module.exports.delete_user = async(req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID invalid : " + req.params.id);
    try {
        const user = await User.findByIdAndDelete({ _id: req.params.id }, req.body)
        res.status(201).json(user);

    } catch (err) {
        res.status(500).json({ message: err });
        throw err;
    }
}