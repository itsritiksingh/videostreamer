require("dotenv").config();
const express = require("express");
const app = express(); 
const {globalErrorHandler} = require("./utils/errorHandler");
const mongoose = require("mongoose");
var videoStream = require('./routes/videoRouter');

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

if(process.env.NODE_ENV != "production") app.use(allowCrossDomain); 

app.use(express.static('public'));
app.use(express.static('uploads'));
app.use('/video', videoStream);

app.use("/queue/", (req,res,next)=>{res.set("Cache-Control","no-cache","no-store");next()},kue.app);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
 });

app.use(globalErrorHandler);

// app.listen(process.env.PORT || 5000, () =>
//   console.log("Example app listening !")
// );
module.exports = {app};