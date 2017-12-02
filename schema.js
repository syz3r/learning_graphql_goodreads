// key: qS6uGMXwUOXQOQZllUtVDQ
// secret: Du3Bu2EUZ6mZIkqPzvtjXPGvPpQqcxsgYRCx1XA8U
const fetch = require('node-fetch')
const util = require('util')
const parseXML = util.promisify(require('xml2js').parseString)

const x = fetch('https://www.goodreads.com/author/show/18541?format=xml&key=qS6uGMXwUOXQOQZllUtVDQ')
.then(res => res.text())
.then(parseXML)

x