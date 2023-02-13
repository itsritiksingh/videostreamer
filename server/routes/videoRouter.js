var express = require('express');
var router = express.Router();
const video = require("../controllers/videoControllers")

router.get('/:videoPath',video.streamVideo);
router.get('/id/:videoId',video.getVideoById);
router.post('/upload', video.uploadVideo);
router.get('/',video.allVideos);

module.exports = router;