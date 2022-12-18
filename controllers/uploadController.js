const { storage, fileFilter } = require('../middlewares/upload')
const multer = require('multer');

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter
});


module.exports = upload