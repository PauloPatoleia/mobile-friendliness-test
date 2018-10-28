// 3TH PARTY DEPENDENCIES 
var axios = require('axios')


// TENTAR PERCEBER COMO FUNCIONAM AS PROMESSAS E OS .THEN .THEN .THEN


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
        this.timeout = options.timeout || 10000
    }

    test() {
        console.log('testing')
        batchRequest(this.urls, this.timeout, this.apiKey).then(res => {
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
 * @param {number} timeout
 * @return {array} of objects
 */

function batchRequest(urls, timeout, apiKey) {
    
    return new Promise((resolve, reject) => {
      
    // OPTIONAL LOG if(this.options.log)
      // console.log(calculateOperationTime(urls.length, timeout/1000))

      let responses = [];
      let time = timeout
      for (let i = 0; i < urls.length; i++) {

        setTimeout(() => {
            console.log(time);
            
          req(urls[i], apiKey).then(

            response => {

              responses.push({url: urls[i], result: response});
                tries++
              // resolve only once all requests have been made
              if (urls.length === responses.length) {
                  resolve(responses);
              }
            },
            
            error => {
                console.log(error);
                
               if(error.status === 429) {
                    console.log('Too many requests, retrying...')
               } else {
                    responses.push({url: urls[i], result: 'Test failed'});
               }
               
               if (urls.length === responses.length) {
                  resolve(responses);
               }
            }
          );
        }, (time * (i + 1)));
      }
    });
  }


module.exports = MobileFriendlinessTest