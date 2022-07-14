const Twitter = require('twitter-v2');




async function main() {
  //const client = new Twitter({
//    bearer_token: 'AAAAAAAAAAAAAAAAAAAAAIMGewEAAAAAL%2BGsIYU3N8HPQh1QeACvHzJrnNw%3DJ6Q2D369mVBE2wKqhdhsnegqCcMyPN4aOEIhutrpCXooU0J0VK'
  //});

  const credentials = {
    bearer_token: 'AAAAAAAAAAAAAAAAAAAAAIMGewEAAAAAL%2BGsIYU3N8HPQh1QeACvHzJrnNw%3DJ6Q2D369mVBE2wKqhdhsnegqCcMyPN4aOEIhutrpCXooU0J0VK',
  };

    const client = new Twitter(credentials);





  // Define rule as per twitter docs
  //const body = {"add": [ {"value": "@dutchmonaco"},{"value": "#m0n4c0"}]}

  // Add above rule
  //const r = await client.post("tweets/search/stream/rules", body);
  //console.log(r);

  //client.post('tweets/search/stream/rules', { delete: {ids: ['1547645673784258562','1547645673784258561']} })
  //client.get('tweets/search/stream/rules').then(function(r){ console.log(r); });

  // Define params

  const streamParams = {'tweet.fields': [ 'author_id'],'expansions': [ 'author_id', 'referenced_tweets.id' ]};
  const stream = client.stream("tweets/search/stream", streamParams);
  setTimeout(() => { stream.close(); }, 60000);
  for await (const { data } of stream){ console.log(data); }



}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
