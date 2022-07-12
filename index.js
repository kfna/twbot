
var Twit = require('twit')
var fs = require('fs')
var http = require('http');
const Axios = require('axios')
var images = require("images");
const express = require("express")
const app = express()
require('dotenv').config();

console.log("Done! 122");

// use the express-static middleware
app.use(express.static("public"))

// define the first route
app.get("/", function (req, res) {
  res.send("<h1>Hello World!</h1>")
})

// start the server listening for requests
app.listen(process.env.PORT || 3000,
	() => console.log("Server is running..."));


var T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:       process.env.CONSUMER_SECRET,
  access_token:          process.env.ACCESS_TOKEN,
  access_token_secret:   process.env.ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

console.log()

async function downloadImage(url, filepath,tid,cb) {
    const response = await Axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });
    return new Promise((resolve, reject) => {
        response.data.pipe(fs.createWriteStream(filepath))
            .on('error', reject)
            .once('close', () => {
              resolve(filepath)
              images(filepath).size(512).draw(images("overlay.png"), 0, 0).save(tid+"_share.jpg", { quality : 100 });
              cb(tid+"_share.jpg",tid);
            });

    });
}


var stream = T.stream('statuses/filter', { track: '#'+process.env.HASH+" @poncho_cruz" });
stream.on('direct_message', function (directMsg) {
})

stream.on('tweet', function (tweet) {
    console.log("Start process..");
    downloadImage(tweet.user.profile_image_url.replace("_normal",""),tweet.user.id+".png",tweet.user.id,function(imagen,tid){

      var b64content = fs.readFileSync(imagen, { encoding: 'base64' });

          T.post('media/upload', { media_data: b64content }, function (err, data, response) {
            var mediaIdStr = data.media_id_string;
            var altText = "Testing";
            var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
            T.post('media/metadata/create', meta_params, function (err, data, response) {
              if (!err) {
                var res = { status: process.env.REPLY_MSG+' @' + tweet.user.screen_name, in_reply_to_status_id: '' + tweet.id_str,media_ids: [mediaIdStr] };
                T.post('statuses/update', res, function (err, data, response) {
                  
                  fs.unlinkSync(tid+".png");
                  fs.unlinkSync(tid+"_share.jpg");
                })
              }
            })
          })

    });


        //return res.json({result: body, status: 'success'});






})
