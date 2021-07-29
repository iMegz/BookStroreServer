const multer = require("multer");
const { join } = require("path");

module.exports = (folder) => {
  folder ||= "products";

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = join(__dirname, "../", "uploads", folder);
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const date = Date.now();
      const fileName = `${date}_${file.originalname}`;
      cb(null, fileName);
    },
  });

  const fileFilter = (req, file, cb) => {
    const error = {
      ErrorCode: "INVALID_FILE_TYPE",
      ErrorData: `${file.originalname} type is invalid!`,
      StatusCode: 400,
    };
    switch (file.mimetype) {
      case "image/jpeg":
      case "image/jpg":
      case "image/png":
        cb(null, true);
        break;
      default:
        cb(error);
        break;
    }
  };

  return multer({ storage, fileFilter });
};
