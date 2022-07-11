
var Twit = require('twit')
var fs = require('fs')
var http = require('http');
const Axios = require('axios')
var images = require("images");

var T = new Twit({
  consumer_key:         process.env.consumer_key,
  consumer_secret:       process.env.consumer_secret,
  access_token:          process.env.access_token,
  access_token_secret:   process.env.access_token_secret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})



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
              cb(tid+"_share.jpg");
            });

    });
}

var stream = T.stream('statuses/filter', { track: process.env.hash });
stream.on('direct_message', function (directMsg) {
  console.log(directMsg);
})

stream.on('tweet', function (tweet) {

    console.log(tweet.user);
    downloadImage(tweet.user.profile_image_url.replace("_normal",""),tweet.user.id+".png",tweet.user.id,function(imagen){


      var b64content = fs.readFileSync(imagen, { encoding: 'base64' });

          T.post('media/upload', { media_data: b64content }, function (err, data, response) {
            var mediaIdStr = data.media_id_string;
            var altText = "Testing"
            var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
            T.post('media/metadata/create', meta_params, function (err, data, response) {
              console.log("la crea..");
              console.log(err);
              if (!err) {
                var res = { status: process.env.reply_msg+' @' + tweet.user.screen_name, in_reply_to_status_id: '' + tweet.id_str,media_ids: [mediaIdStr] };
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
