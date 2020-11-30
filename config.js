// apel:
/*
const { serverPort } = require('./config');
console.log(`Your port is ${serverPort}`); // 8626
*/

// deps:
// fisierul '.env'     - de aici se citesc cu env.
// # npm install dotenv

// biblio:
// https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786

// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  serverPort: process.env.PORT
};
