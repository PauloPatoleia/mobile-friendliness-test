// 3TH PARTY DEPENDENCIES 
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

function req(url, apiKey) {

    return new Promise((resolve, reject) => {
      axios.post(`https://searchconsole.googleapis.com/v1/urlTestingTools/mobileFriendlyTest:run?key=${apiKey}`, {
                   url: url
                  }).then(

                      response => {
                      if(response.data.testStatus.status === "PAGE_UNREACHABLE") {
                        return resolve(response.data.testStatus.status)
                      }
                      resolve(response.data.mobileFriendliness);
                       },

                       err => {
                          reject(err.response);
                   }
                );
            });
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
        this.timeout = options.timeout || 15000
        this.log = options.log || null
    }

    test() {
        console.log('testing')
        batchRequest(this.urls, this.timeout, this.apiKey, this.log).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err);
        })
    }

    google(searchTerm) {
        console.log('googling...')
        return this
    }
}

/**
 * batchRequest
 * Calls req function for each link and sets a timeout
 * @param {string} url
 * @param {number} timeout miliseconds
 * @return {array} of objects
 */

function batchRequest(urls, timeout, apiKey, log) {
    
    if(log) {
        console.log('Starting...')
        console.log(urls)
    }
    
    
    return new Promise((resolve, reject) => {

      let responses = [];

      for(i = 0; i < urls.length; i++) {

        let index = i
        let time = timeout * index

        setTimeout(() => {
           
          req(urls[index], apiKey).then(

            response => {
                console.log(response)
              responses.push({url: urls[index], result: response});
              // resolve only once all requests have been made
              if (urls.length === responses.length) {
                  resolve(responses);
              }
            },
            
            error => {
                console.log(error.status);
                
               if(error.status === 429) {
                    console.log('Too many requests, try setting a bigger timeout.')
               } 
                   
               responses.push({url: urls[index], result: 'Test failed', code: error.status});
               
               
               if (urls.length === responses.length) {
                  resolve(responses);
               }
            }
          );
        }, time)
      }
    });
  }


module.exports = MobileFriendlinessTest