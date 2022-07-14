import { TwitterApi } from 'twitter-api-v2';

// Instantiate with desired auth type (here's Bearer v2 auth)
const twitterClient = new TwitterApi('AAAAAAAAAAAAAAAAAAAAAMNMewEAAAAAN%2BH6fOcUxjxrjEMlI8%2Fl0l1vG9E%3D8SNBrd0U9NUfJePOjdFieCgrJuuOlXrAvvznLG6n5wrRAnoFuu');




// Tell typescript it's a readonly app
const client = twitterClient.readWrite;

// Play with the built in methods
//const user = await roClient.v2.userByUsername('dutchmonaco');
//console.log(user);


//const addedRules = await roClient.v2.updateStreamRules({ add: [{ value: '#m0n4c0', tag: 'hash' },{ value: '@dutchmonaco', tag: 'from' },], });


//const rules = await roClient.v2.streamRules();
//console.log(rules.data.map(rule => rule.id));

//const deleterules = await roClient.v2.updateStreamRules({delete: {  ids: ['1547625543968780293', '1547625543968780294'],},});
//console.log(deleterules);


const stream = await client.v2.searchStream();
for await (const { data } of stream) {
  console.log('This is my tweet:', data);
}
