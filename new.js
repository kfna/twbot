import { TwitterApi } from 'twitter-api-v2';




//await client.v1.tweet('My tweet text with two images!');
const client = new TwitterApi({ appKey: 'EOntFK7mgxFKozuhOYhYY7ocU', appSecret: 'BnlPrpbODns9MAjD7ql5HSnD506KunrV7tFu4dDMSIlrQd9coq' });
//const { client: refreshedClient, accessToken, refreshToken } = await client.refreshOAuth2Token('AAAAAAAAAAAAAAAAAAAAAIMGewEAAAAAPW%2FQO9ICCVxoKUaemvnGCYSdLQM%3D7w5ZKhHSNDfJJJ1xjLIKJ5WkSqx1gwbR6QydDDnD6RNfKQv7FR');
const authLink = await client.generateAuthLink('https://powerful-journey-66233.herokuapp.com/callback');
console.log(authLink);
