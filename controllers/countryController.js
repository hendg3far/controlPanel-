const Country = require('../models/country');


module.exports.save_country = async(req, res) => {
    try {
        let newCountry = new Country({...req.body, creator: req.user.id, flag: req.file.path })
        const country = await newCountry.save()
        res.status(201).json({ country })
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports.get_countries = async(req, res) => {
    try {
        const countries = await Country.find();
        return res.status(200).json(countries);
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.get_country = async(req, res) => {
    try {
        const country = await Country.findOne({ _id: req.params.id })
        res.status(201).json(country);

    } catch (err) {
        res.status(500).json({ message: err });
        throw err;
    }
}

module.exports.update_country = async(req, res) => {
    try {
        const country = await Country.findByIdAndUpdate({ _id: req.params.id }, req.body)
        res.status(201).json(country);

    } catch (err) {
        res.status(500).json({ message: err });
        throw err;
    }
}

module.exports.delete_country = async(req, res) => {
    try {
        const country = await Country.findByIdAndDelete({ _id: req.params.id }, req.body)
        res.status(201).json(country);

    } catch (err) {
        res.status(500).json({ message: err });
        throw err;
    }
}