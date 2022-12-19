const City = require('../models/city');
const Country = require('../models/country');

module.exports.save_city = async(req, res) => {
    try {
        let newCity = new City({...req.body, creator: req.user.id })
        await Country.updateMany({ '_id': newCity.country }, { $push: { cities: newCity._id } });
        const city = await newCity.save()
        res.status(201).json({ city })

    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports.get_cities = async(req, res) => {
    try {
        const cities = await City.find();
        return res.status(200).json(cities);
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.get_city = async(req, res) => {
    try {
        const city = await City.findOne({ _id: req.params.id })
        res.status(201).json(city);

    } catch (err) {
        res.status(500).json({ message: err });
        throw err;
    }
}

module.exports.update_city = async(req, res) => {
    try {
        const city = await City.findByIdAndUpdate({ _id: req.params.id }, req.body)
        res.status(201).json(city);

    } catch (err) {
        res.status(500).json({ message: err });
        throw err;
    }
}

module.exports.delete_city = async(req, res) => {
    try {
        const city = await City.findByIdAndDelete({ _id: req.params.id }, req.body)
        res.status(201).json(city);

    } catch (err) {
        res.status(500).json({ message: err });
        throw err;
    }
}