# Mobile friendliness test

Enables you to run various performance and validation checks against a single or multiple web pages to check if they are mobile friendly

### Installing

```
npm install --save mobile-friendly
```

### Usage Examples

```js
var mft = require('mobile-friendliness-test')

// Default options will be used if none are provided
var options = {
    timeout: 15000, // The wait time between requests. We suggest at leat 20s to avoid code 429 error
    log: true, // console.logs usefull information, good for CLI usage
    apiKey: Aisfndi9sjfe9jf // You Google Search Console URL Testing tool API KEY - for more info -> https://developers.google.com/webmaster-tools/search-console-api/v1/configure
}

links = ["https://www.quora.com", "https://github.com", "https://www.npmjs.com"]

mft(links, options).test().then((results) => {
  // Do something with results
}, (error) => {
  // error
});

// return an array of objects, example:
// [ { url: 'https://github.com', result: 'MOBILE_FRIENDLY' },
//  { url: 'https://www.quora.com', result: 'MOBILE_FRIENDLY' },
//  { url: 'https://www.npmjs.com', result: 'MOBILE_FRIENDLY']

To use links from a google search:

searchOptions = {
    query: 'cars',
    host: 'www.google.com',
    lang: 'en',
    age: 'd1', // last 24 hours ([hdwmy]\d? as in google URL)
    limit: 10,
    params: {} // params will be copied as-is in the search URL query string
}

mft([], options).google(searchOptions).test()

```



## Built With

* [Google URL Testing Tools API (Beta)](https://developers.google.com/webmaster-tools/search-console-api/) - The mobile tester used
* [google-search-scraper](https://www.npmjs.com/package/google-search-scraper) - Used for Google search result urls fetching

## Authors

* **Valentino Patoleia** - *Initial work* - [FixTheInternet](https://github.com/FixTheInternet)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Ben for the idea!

