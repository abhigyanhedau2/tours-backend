const multer = require('multer');
const path = require('path');
const AppError = require('./appError');

module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, res, cb) => {
        let extension = path.extname(file.originalname);
        if (extension !== ".jpg" && extension !== ".png" && extension !== ".jpeg") {
            cb(new AppError(400, "Invalid image extension"), false);
            return;
        }
        cb(null, true);
    }
});