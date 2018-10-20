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
                      // ANALISAR BEM A RESPOSTA E VER A ESTRUTUTA DA MESMA
                      resolve(response.data.mobileFriendliness);
                       },
                       error => {
                           // ANALISAR BEM O ERRO E VER A ESTRUTURA DO MESMO
                          console.log(error)
                          //o que é isto? reject error
                          reject(error);
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
    }

    test() {
        console.log('testing')
        req(this.urls, this.apiKey).then(res => {
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



function batchRequest(urls, timeout // log) {
    
    return new Promise((resolve, reject) => {
      
    // OPTIONAL LOG if(this.options.log)
      console.log(calculateOperationTime(urls.length, timeout/1000))
      // RESULTADOS COM SUCESSO OU ERROS
      let responses = [];
      
      for (let i = 0; i < urls.length; i++) {
          
        setTimeout(() => {
            
          req(urls[i]).then(

            response => {
              // VER COMO VAMOS ESTRUTURAR A RESPOSTA
              responses.push({url: urls[i], result: response});
                // LOG OPCIONAL? if(this.options.log)
              console.log(response)
              // resolve only once all api calls have been successful
              if (urls.length === responses.length) {
                  resolve(responses);
              }
            },
            
            error => {
               // RESOLVER DEPOIS DE VER A ESTRUTURA DO ERRO QUE VEM DO OUTRO? SAO O MESMO ERRO? NÃO SEI :/
               // VER A DIFERENÇA ENTRE O ERRO DO REQ E O ERRO DE CHAMAR REQ?

               // OPÇÃO DE LOGAR O ERRO
               console.log(error)

               // DEVO GUARDAR O ERRO NA ARRAY DOS RESULTADOS? E SE ELES QUISEREM FAZER UM LOOP NELA? Object vs Array
               responses.push({url: urls[i], result: 'Test failed'});
               if (urls.length === responses.length) {
                  resolve(responses);
               }
            } // error

          );
          // ver como estruturar os timeouts
        }, timeout * (i + 1));
      }
    });
  }


module.exports = MobileFriendlinessTest