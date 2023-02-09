var express = require('express');
var router = express.Router();
const video = require("../controllers/videoControllers")

router.get('/',video.allVideos);
router.post('/upload', video.uploadVideo);
router.post('/:videoId',video.streamVideo);

module.exports = router;