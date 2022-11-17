const AppError = require("../utils/appError");
const conn = require("../services/db");
const { uploadfiletoS3 } = require("../services/aws");
const multer = require("multer");

const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, "./uploads/");
  // },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const upload = multer({ storage: storage });

(exports.upload = upload.single("image")),
  (req, res, next) => {
    next();
  };

exports.addImage = async (req, res, next) => {
  const file = req.file;
  console.log(file);

  var result = await uploadfiletoS3(file);

  var date = new Date();
  var path = `https://answersheet-image.s3.amazonaws.com/${result.Key}`;
  conn.query(
    "INSERT INTO answersheet (submitdate, path) VALUES(?,?)",
    [date, path],
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: "success",
        message: "image uploaded",
      });
    }
  );
};
