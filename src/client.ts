import Twitter = require('twitter')

const client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})

export default client

export function findLastPercent(): Promise<number> {
  return client.get('statuses/user_timeline', []).then(tweets => {
    for (let tweet of <Array<any>>tweets) {
      const match = /^(\d{1,3})%/.exec(tweet.text)
      if (match)
        return parseInt(match[0]) / 100
    }
      
    return -1
  })
}