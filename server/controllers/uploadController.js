const path = require('path');
const multer = require('multer');
const sharp = require('sharp');

const storage = multer.memoryStorage();

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only');
  }
}
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

exports.uploadSingle = upload.single('image-file');

exports.renameProductImg = async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `640x510-${req.file.fieldname}-${Date.now()}${path.extname(req.file.originalname)}`;
  next();
};
exports.resizeProductImg = async (req, res, next) => {
  if (!req.file) return next();
  const filename = req.body.image.slice(1);
  await sharp(req.file.buffer).resize(640, 510).toFile(`${filename}`);
  next();
};
