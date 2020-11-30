/* location-functions
* ====================
* reqs:
* - termux-api  [npm install termux-api --save] - https://www.npmjs.com/package/termux
* - utils - custom class by me
* biblio:
* - https://github.com/edupsousa/node-termux-api/blob/master/readme.md
*/
var api = require('termux-api').default;
var utils = require('./utils');
module.exports = {
    _getGPSLocation: async function () {
        var result = api.createCommand()
            .location()
            .fromGPSProvider()
            .requestOnce()
            .build()
            .run();
        var oRes = {};
        try {
            oRes = await result.getOutputObject();
        } catch {
            oRes = {};
        }
        return oRes; 
    },/*
    _getTimingAdvance: function(oCellData) {
        if (typeof oCellData.timing_advance != 'undefined') {
            return oCellData.timing_advance;
        }
        return '-';
    },*/
    foo: function() {
        return 0;
    }
  };
