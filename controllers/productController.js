const City = require('../models/city');
const Country = require('../models/country');
const Product = require('../models/product');

module.exports.save_product = async(req, res) => {
    console.log(req.files)
    const country = await Country.findById({ _id: req.body.country });
    const city = await City.findById({ _id: req.body.city });
    if (!country && city)
        return res.status(400).send("Country or City ID invalid");
    try {
        const multiImg = req.files
        let newProduct = new Product({...req.body, creator: req.user.id, multiImg: multiImg });
        await Country.updateMany({ '_id': newProduct.country }, { $push: { products: newProduct._id } });
        await City.updateMany({ '_id': newProduct.city }, { $push: { products: newProduct._id } });
        const product = await newProduct.save()
        res.status(201).json({ product })
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports.get_products = async(req, res) => {
    try {
        const products = await Product.find()
        return res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.get_product = async(req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id })
        res.status(201).json(product);

    } catch (err) {
        res.status(500).json({ message: err });
        throw err;
    }
}

module.exports.update_product = async(req, res) => {
    try {
        const product = await Product.findByIdAndUpdate({ _id: req.params.id }, req.body)
        res.status(201).json(product);

    } catch (err) {
        res.status(500).json({ message: err });
        throw err;
    }
}

module.exports.delete_product = async(req, res) => {
    try {
        const product = await Product.findByIdAndDelete({ _id: req.params.id }, req.body)
        await Country.updateMany({ '_id': product.country }, { $pull: { products: product._id } });
        await City.updateMany({ '_id': product.city }, { $pull: { products: product._id } });
        res.status(201).json(product);

    } catch (err) {
        res.status(500).json({ message: err });
        throw err;
    }
}