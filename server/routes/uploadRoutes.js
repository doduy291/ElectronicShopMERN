const express = require('express');
const { renameProductImg, uploadSingle } = require('../controllers/uploadController');
const router = express.Router();

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename(req, file, cb) {
//     cb(null, `262x317-${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
//   },
// });

router.post('/', uploadSingle, renameProductImg, (req, res) => {
  const imageUrl = `uploads/${req.file.filename}`;
  res.send(`/${imageUrl}`);
});

module.exports = router;
