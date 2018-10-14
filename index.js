    function MobileFriendlinessTest(urls, options) {
        return new mft(urls, options)
    }

    class mft {
        constructor(urls = [], options = {}) {
            this.urls = urls
            this.apiKey = options.apiKey || 'placeholder' // process.env.API_KEY
        }
    
        test() {
           console.log('testing')
        }
    
        google() {
            console.log('testing')
        }
    
    }

module.exports = MobileFriendlinessTest