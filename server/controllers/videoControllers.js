const {videoModel} = require("../models/videoSchema");
const rand = require("crypto").randomBytes;
const path = require("path");
const fs = require("fs");
const { getVideoDurationInSeconds } = require('get-video-duration')
const genThumbnail = require('simple-thumbnail')
const Busboy = require("busboy");
const {queue} = require("../config/kue");

module.exports.allVideos = async (req, res) => {
    videoModel.find({}).then(videos => res.send(videos)).catch(e => console.log(e));
}

module.exports.getVideoById = async (req, res) => {
    const videoId = req.params.videoId;
    videoModel.findById(videoId).then(videos => res.send(videos)).catch(e => console.log(e));
}

module.exports.uploadVideo = async (req, res) => {
    let fileuuid = rand(8).toString("hex");
    const fields = {};
    fs.mkdirSync(path.join(process.env.FILE_UPLOAD_PATH, fileuuid), { recursive: true });
    let _filename, saveTo, _encoding;
    var busboy = Busboy({ headers: req.headers });

    busboy.on("file", function (fieldname, file, {filename,encoding}) {
        console.log(process.env.FILE_UPLOAD_PATH, fileuuid, filename);
        saveTo = path.join(process.env.FILE_UPLOAD_PATH, fileuuid, filename);
        file.pipe(fs.createWriteStream(saveTo));
        _filename = filename;
        _encoding = encoding;
    });
    busboy.on('field', (fieldname, val) => {
        fields[fieldname] = val;
    });
    busboy.on("finish", async function () {
        const duration = await getVideoDurationInSeconds(saveTo);
        await genThumbnail(saveTo, path.join(process.env.FILE_UPLOAD_PATH, fileuuid, 'thumbnail.png'), '250x?')
        const video = await videoModel({
            ...fields,
            duration,
            thumbnail:path.join(fileuuid, 'thumbnail.png'),
            path: saveTo,
        }).save()
        
        const job = queue
            .create("convert", {
                path: path.join(process.env.FILE_UPLOAD_PATH, fileuuid, _filename),
                fileuuid,
                _filename,
                _id: video._id,
            })
            .removeOnComplete(true)
            .save((err) => {
                if (err) {
                    res.send("error");
                    return;
                }
                job.on("failed", () => {
                    res.send("error");
                });
            });

        res.send(video);
    });

    return req.pipe(busboy);
}

module.exports.streamVideo = async (req, res) => {
    const videoPath = decodeURIComponent(req.params.videoPath);
    console.log(videoPath)
    const video_file = fs.readFileSync(path.join(process.cwd(), videoPath));
    const total = video_file.length;
    var range = req.headers.range;
    if (range) {
      var positions = range.replace(/bytes=/, "").split("-");
      var start = parseInt(positions[0], 10);
      var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
      var chunksize = (end - start) + 1;
      res.writeHead(206, {
        "Content-Range": "bytes " + start + "-" + end + "/" + total,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4"
      });
      res.end(video_file.subarray(start, end + 1), "binary");
  
    } else {
      res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'video/mp4' });
      fs.createReadStream(path.join(process.cwd(), videoPath)).pipe(res);
    }
  }