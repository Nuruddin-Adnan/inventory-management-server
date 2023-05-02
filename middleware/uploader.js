const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './public/assets/images/products/',
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

const uploader = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const supportedFormate = /png|jpg|webp|gif/;
        const extension = path.extname(file.originalname);

        if (supportedFormate.test(extension)) {
            cb(null, true);
        } else {
            cb(new Error("Must be a png/jpg/webp/gif image"));
        }
    },
    limits: {
        fileSize: 5000000
    }
})

module.exports = uploader;