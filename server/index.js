require("dotenv").config();
const express = require("express");
const app = express();
const rand = require("crypto").randomBytes;
const Busboy = require("busboy");
const path = require("path");
const fs = require("fs");
const videoModel = require('./models/videoSchema')
const mongoose = require("mongoose");
var videoStream = require('./routes/videoRouter')

mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("mongoose connected"))
  .catch((e) => console.log(e));

var kue = require("kue");
var queue = kue.createQueue({
  redis: process.env.REDIS
});

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "*");

  next();
};

app.use(allowCrossDomain);
app.use('/video', videoStream);
app.use(express.static('public'));
app.use(express.static('uploads'));
// app.post("/upload", (req, res) => {

//   let fileuuid = rand(8).toString("hex");
//   fs.mkdirSync(path.join(process.env.FILE_UPLOAD_PATH, fileuuid), { recursive: true });
//   let _filename,saveTo,_encoding;
//   var busboy = new Busboy({ headers: req.headers });
  
//   busboy.on("file", function (fieldname, file, filename,encoding) {
//     saveTo = path.join(process.env.FILE_UPLOAD_PATH, fileuuid, filename);
//     file.pipe(fs.createWriteStream(saveTo));
//     _filename = filename;
//     _encoding = encoding;
//   });
 
//   busboy.on("finish", function () {
//     videoModel({
//       name: _filename,
//       size: fs.statSync(saveTo).size,
//       path: saveTo,
//       encoding: _encoding
//     })
//       .save()
//       .then((video) => {
//         const job = queue
//           .create("convert", {
//             path: path.join(process.env.FILE_UPLOAD_PATH, fileuuid, _filename),
//             fileuuid,
//             _filename,
//             _id: video._id,
//           })
//           .removeOnComplete(true)
//           .save((err) => {
//             if (err) {
//               res.send("error");
//               return;
//             }
//             job.on("failed", () => {
//               res.send("error");
//             });
//           });

//         res.send(video);
//       });
//   });

//   return req.pipe(busboy);
// });

app.use("/queue/", (req,res,next)=>{res.set("Cache-Control","no-cache","no-store");next()},kue.app);

app.listen(process.env.PORT || 5000, () =>
  console.log("Example app listening !")
);
