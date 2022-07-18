
const Twitter = require('twitter-v2');
var fs = require('fs')
var http = require('http');
const Axios = require('axios')
var images = require("images");
const express = require("express")
const app = express()
require('dotenv').config();


app.use(express.static("public"))

app.get("/", function (req, res) {
  res.send("<h1>Hello World!</h1>")
})

// start the server listening for requests
app.listen(process.env.PORT || 3000,	() => console.log("Server is running..."));

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});



async function listenForever(streamFactory, dataConsumer) {
  try {
    for await (const { data } of streamFactory()) {
      dataConsumer(data);
    }
    // The stream has been closed by Twitter. It is usually safe to reconnect.
    console.log('Stream disconnected healthily. Reconnecting.');
    listenForever(streamFactory, dataConsumer);
  } catch (error) {
    // An error occurred so we reconnect to the stream. Note that we should
    // probably have retry logic here to prevent reconnection after a number of
    // closely timed failures (may indicate a problem that is not downstream).
    console.warn('Stream disconnected with error. Retrying.', error);
    listenForever(streamFactory, dataConsumer);
  }
}

listenForever(() => client.stream('tweets/search/stream'),(data) => console.log(data));
