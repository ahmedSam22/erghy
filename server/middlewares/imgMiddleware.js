const sharp = require("sharp");
const multer = require("multer");
const multerStorage = multer.memoryStorage();


const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError("Not an image! Please upload only images.", 400), false);
    }
  };
  
  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });
  
  const uploadUserPhoto = upload.single("pic");
  
  const resizeUserPhoto = async (req, res, next) => {
    if (!req.file) return next();
    const folderName = `image/user-22-${Date.now()}.jpeg`;
    req.pic = (req.file.filename = `${req.protocol}://localhost:5000/${folderName}`);
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`./public/${folderName}`);
    next();
  };

  module.exports = {
    resizeUserPhoto,
    uploadUserPhoto

  }