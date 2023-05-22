const mongoose = require('mongoose');
const schema = mongoose.Schema
const video = schema({
    name:{
        type:String,
        required: true
    },
    duration:{
        //duration in milliseconds
        type:Number,
        // required: true
    },
    path:{
        type:String,
        required: true
    },
    thumbnail:{
        type:String,
        // required: true
    },

})

const videoModel = mongoose.model("video",video);
module.exports.videoModel = videoModel;