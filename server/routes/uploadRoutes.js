const express = require('express');
const path = require('path');
const multer = require('multer');
const sharp = require('sharp');
const router = express.Router();

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename(req, file, cb) {
//     cb(null, `262x317-${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
//   },
// });

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

const uploadSingle = upload.single('image');
const resizeProductImg = async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `640x510-${req.file.fieldname}-${Date.now()}${path.extname(req.file.originalname)}`;
  // await sharp(req.file.buffer).resize(640, 510).toFile(`uploads/${req.file.filename}`);
  next();
};

router.post('/', uploadSingle, resizeProductImg, (req, res) => {
  console.log(req.file);
  const imageUrl = `uploads/${req.file.filename}`;
  res.send(`/${imageUrl}`);
});

module.exports = router;
