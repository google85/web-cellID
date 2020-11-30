/* utils
* ========
* reqs:
* - hex2dec     [npm install --save hex2dec]    - https://www.npmjs.com/package/hex2dec
*/
var conv = require('hex2dec');
module.exports = {
    hex2dec: function (hexNo) {
      // whatever
      return conv.hexToDec(hexNo); //hexToDec('0xFA'); // 250
    },
    dec2hexPrefixed: function(decNo) {
        return conv.decToHex('' + decNo); //decToHex('250'); // '0xfa'
    },
    dec2hex: function(decNo) {
        return conv.decToHex('' + decNo, {prefix: false}); //decToHex('250'); // '0xfa'
    },
    div_quotient: function(x, y) {  //catul impartirii, rotunjit
        return Math.floor(x/y);
    }, 
    div_remainder: function(x, y) { // restul impartirii
        return x % y;
    },
    str2int: function(strInt) {
        return parseInt(strInt);    //sau Integer.parseInt(strInt) ?
    }
  };