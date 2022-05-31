const { order, product } = require("../model/index");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file)

    cb(null, path.join(__dirname, "..", "public", "assets", "profile"));
   
  },
  filename: (req, file, cb) => {

    console.log("error uploading 2")
    const fileName = Date.now() + path.extname(file.originalname);
    req.body.images = "/assets/profile/" + fileName;

    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

const uploadFileHandler = async (req, res) => {
  
  const data = req.body;
  return res.status(200).json(data);
};

module.exports = {
    upload,
    uploadFileHandler
};
