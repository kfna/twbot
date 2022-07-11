var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'YmplDZWdzaB3DX6Xk0uWD7B66',
  consumer_secret: 'wX4gokRWWPRt1IqVBG860GIWPWt8VjQp4UucDDaxe4ktmbCKyI',
  access_token_key: '192895236-aywjFzIwDJe5kLjlDeRdSQW83oCdKilALKkj1W5U',
  access_token_secret: 'S0YJPXXVQmYY9kPpEJsbTlOeD43fNzHqdvSzkS25jwkng'
});

//bearer AAAAAAAAAAAAAAAAAAAAABW5OgAAAAAAnNVswYWb%2FkF6pPe6LN9smkRSKdo%3DukzyFtD8O3AGzsMYLTfISZfe5RHKD5L9LMYuKLkkUvWKbjDxi4



client.get('search/tweets', {q: 'Monterrey-Laredo'}, function(error, tweets, response) {
   console.log(tweets);
});
