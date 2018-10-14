var axios = require('axios')

// Calls the object contructor 'mft' so that there is no need to use the keyword 'new'
function MobileFriendlinessTest(urls, options) {
    return new mft(urls, options)
}


/**
 * req
 * this function takes an api url and uses the fetch api to get the response.
 * if the request worked, it will return the response in a promise
 * @param {string} url
 * @return {Promise}
 */

class mft {
    constructor( urls = [], options = {} ) {
        this.urls = urls
        this.apiKey = options.apiKey || process.env.API_KEY
    }

    test() {
        console.log('testing')
        req(this.urls, this.apiKey).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err);
        })
    }

    google() {
        console.log('googling')
    }

}


function justlog() {
    console.log('worked')
}


/**
 * req
 * this function takes an api url and uses the fetch api to get the response.
 * if the request worked, it will return the response in a promise
 * @param {string} url
 * @return {Promise}
 */

function req(url, apiKey) {
    return new Promise((resolve, reject) => {
      axios.post(`https://searchconsole.googleapis.com/v1/urlTestingTools/mobileFriendlyTest:run?key=${apiKey}`, {
                   url: url
                  }).then(
                      response => {
                      resolve(response.data.mobileFriendliness);
                       },
                       error => {
                          console.log(error.Error + '1')
                          reject(error);
                   }
                );
            });
          }

module.exports = MobileFriendlinessTest