const multer = require('multer');
const path = require('path')

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'))
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/svg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

module.exports = { fileFilter, storage }