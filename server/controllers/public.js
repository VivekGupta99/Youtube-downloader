const axios = require("axios")
const ytdl = require("ytdl-core")
require("dotenv").config()

exports.startApi = (req, res, next) => {
  res.status(200).json({ message: "Welcome To Vidown Api" })
}

exports.postYoutube = async (req, res, next) => {
  const ytUrl = req.body.urls
  let videoId = ytUrl.replace("https://www.youtube.com/watch?v=", "")
  videoId = videoId.replace("https://www.youtube.com/shorts/", "")
  videoId = videoId.replace("https://youtu.be/", "")
  videoId = videoId.replace("https://youtube.com/shorts/", "")
  videoId = videoId.replace("https://www.youtube.com/live/", "")
  videoId = videoId.slice(0, 11)

  const metaInfo = await ytdl.getInfo(videoId)

  // console.log("=>> ", metaInfo)

  let data = {
    url: "https://www.youtube.com/embed/" + videoId,
    info: metaInfo.formats,
  }
  console.log(videoId)
  const options = {
    method: "GET",
    url: "https://yt-api.p.rapidapi.com/dl",
    params: { id: videoId },
    headers: {
      "X-RapidAPI-Key": "428e163e64mshd8792cfc1218835p12286ejsne25dcd7e3d9d",
      "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
    },
  }
  try {
    axios
      .request(options)
      .then((response) => {
        const result = response.data
        if (result.thumbnail) {
          let dataList = result.formats.map((obj) => {
            return {
              url: obj.url,
              quality: obj.qualityLabel,
              size: (
                (obj.bitrate * (+obj.approxDurationMs / 1000)) /
                (8 * 1024 * 1024)
              ).toFixed(1),
            }
          })

          res.status(200).json({
            thumb: result["thumbnail"][2].url,
            urls: dataList,
            title: result["title"],
          })

          if (req.users) {
            req.users
              .addActivity({ yturl: ytUrl })
              .then((activityResult) => {
                console.log("User activity logged:", activityResult)
              })
              .catch((err) => {
                console.error("Failed to log user activity:", err)
                next(new Error(err))
              })
          }
        } else {
          res.status(403).json({
            status: "fail",
            error:
              "Sorry, we couldn't locate the video you're looking for. It's possible that the video is set to private or has been removed.",
            code: 403,
          })
        }
      })
      .catch((error) => {
        res.status(403).json({
          status: "fail",
          error:
            "Sorry, we couldn't locate the video you're looking for. It's possible that the video is set to private or has been removed.",
          code: 403,
        })
        const err = new Error(error)
        err.httpStatusCode = 403
        return next(err)
      })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: "fail",
      error: "An unexpected error occurred. Please try again later.",
      code: 500,
    })
    const err = new Error(error)
    err.httpStatusCode = 500
    return next(err)
  }
}
