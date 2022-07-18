const Twitter = require('twitter-v2');




async function main() {
  //const client = new Twitter({
//    bearer_token: 'AAAAAAAAAAAAAAAAAAAAAIMGewEAAAAAL%2BGsIYU3N8HPQh1QeACvHzJrnNw%3DJ6Q2D369mVBE2wKqhdhsnegqCcMyPN4aOEIhutrpCXooU0J0VK'
  //});

  const credentials = {
    consumer_key : 'EOntFK7mgxFKozuhOYhYY7ocU',
    consumer_secret : 'BnlPrpbODns9MAjD7ql5HSnD506KunrV7tFu4dDMSIlrQd9coq',
    bearer_token: 'AAAAAAAAAAAAAAAAAAAAAIMGewEAAAAAPW%2FQO9ICCVxoKUaemvnGCYSdLQM%3D7w5ZKhHSNDfJJJ1xjLIKJ5WkSqx1gwbR6QydDDnD6RNfKQv7FR',
  };
//    access_token_key : '47480567-KwldeL83e4akTXBDoaM5vTojJ5bJqOwWcuAUDhWmp',
//    access_token_secret : '1fgTHpkgWbd3qgbKdZcOCF203JwETtzG6JnCBchFti6fU',

    const client = new Twitter(credentials);





  // Define rule as per twitter docs
  //const body = {"add": [ {"value": "@dutchmonaco"},{"value": "#m0n4c0"}]}

  // Add above rule
  //const r = await client.post("tweets/search/stream/rules", body);
  //console.log(r);

  client.post('tweets', { text: "hello" });
  //client.get('tweets/search/stream/rules').then(function(r){ console.log(r); });

  // Define params

  const streamParams = {'tweet.fields': [ 'author_id'],'expansions': [ 'author_id', 'referenced_tweets.id' ]};
  const stream = client.stream("tweets/search/stream", streamParams);
  setTimeout(() => { stream.close(); }, 60000);
  for await (const { data } of stream){
    console.log(data);
  }



}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
