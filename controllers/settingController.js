const Setting = require('../models/setting')

module.exports.save_setting = async(req, res) => {
    try {
        const settings = await Setting.find()
        if (settings.length === 0) {
            let newsetting = new Setting({...req.body, creator: req.user.id })
            const setting = await newsetting.save()
            console.log(setting)
            res.status(201).json({ setting })
        } else {
            res.status(500).json({ message: 'You Can\'t add new setting just update' });
        }

    } catch (err) {
        res.status(500).json(err)
    }
}


module.exports.get_setting = async(req, res) => {
    try {
        const settings = await Setting.find()
        return res.status(200).json(settings);
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.update_setting = async(req, res) => {
    try {
        const setting = await Setting.findByIdAndUpdate({ _id: req.params.id }, req.body)
        res.status(201).json(setting);

    } catch (err) {
        res.status(500).json({ message: err });
        throw err;
    }
}