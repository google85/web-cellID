/* cellid-functions
* ==================
* reqs:
* - termux-api  [npm install termux-api --save] - https://www.npmjs.com/package/termux
* - utils - custom class by me
*/
var api = require('termux-api').default;
var utils = require('./utils');
module.exports = {
    _getCellDataSimple: async function () {
        var result = api.createCommand()
            .telephonyCellInfo()
            .build()
            .run();
        var oRes = {};
        try {
            oRes = await result.getOutputObject();
        } catch {
            oRes = {};
        }
        return oRes; 
    },
    _selectFirstAvailableResult: function(vCellData) {
        if (!!vCellData.length && vCellData.length > 0) {
            if (!!vCellData[0].registered)
                return vCellData[0];
            if (!!vCellData[1].registered)
                return vCellData[1];
        }
        return null;
    },
    _getTimingAdvance: function(oCellData) {
        if (typeof oCellData.timing_advance != 'undefined') {
            return oCellData.timing_advance;
        }
        return '-';
    },
    _getCellID: function(oCellData) {
        if (typeof oCellData.type == 'undefined') {
            return '';
        }
        if (oCellData.type == 'lte') {
            if (typeof oCellData.ci != 'undefined') {
                return oCellData.ci;
            }    
        }
        if (oCellData.type == 'wcdma') {
            if (typeof oCellData.cid != 'undefined') {
                return oCellData.cid;
            }    
        }
        if (oCellData.type == 'gsm') {
            if (typeof oCellData.cid != 'undefined') {
                return oCellData.cid;
            }    
        }

        // restul cazurilor
        if (typeof oCellData.cid != 'undefined') {
            return oCellData.cid;
        }
        
        // daca nu si nu
        return 0;
    },
    _getLAC: function(oCellData) {
        if (typeof oCellData.type == 'undefined') {
            return '';
        }

        if (oCellData.type == 'lte') {
            if (typeof oCellData.tac != 'undefined') {
                return oCellData.tac;
            }    
        }
        if (oCellData.type == 'wcdma') {
            if (typeof oCellData.lac != 'undefined') {
                return oCellData.lac;
            }    
        }
        if (oCellData.type == 'gsm') {
            if (typeof oCellData.lac != 'undefined') {
                return oCellData.lac;
            }    
        }

        // restul cazurilor
        if (typeof oCellData.lac != 'undefined') {
            return oCellData.lac;
        }        
        // daca nu si nu
        return 0;
    },
    _getCellID_2G: function(oCellData) {
        var nCellID = this._getCellID(oCellData);   // cea de 4G sau 3G initiala
        var mcc = oCellData.mcc;
        var mnc = oCellData.mnc;
        var nType = oCellData.type;
        //var lte_eNB = 0;
        //var lte_LCID = 0;
        switch (nType) {
            case 'lte': {
                var lte_eNB = 0;
                var lte_LCID = 0;
                switch (mcc) {
                    case 226: {
                        //console.log('RO');
                        switch (mnc) {
                            case 10: {
                                //console.log('Orange');
                                lte_eNB = utils.div_quotient(nCellID, 0x100);   // div 256
                                lte_LCID = utils.div_remainder(nCellID, 0x100);   // div 256

                            } break;
                            default: {

                            } break;
                        }
                    } break;
                    default: {

                    } break;
                }
                return {'CellID': lte_eNB, 'eNB': lte_eNB, 'LCID': lte_LCID};  // rezultat din lte
            } break;

            case 'wcdma': {    //3G
                var wcdma_RNC = 0;
                var wcdma_CID = 0;
                switch (mcc) {
                    case 226: {
                        //console.log('RO');
                        switch (mnc) {
                            case 10: {
                                //console.log('Orange');
                                wcdma_RNC = utils.div_quotient(nCellID, 0x10000);   // div 256
                                wcdma_CID = utils.div_remainder(nCellID, 0x10000);   // div 256

                            } break;
                            default: {

                            } break;
                        }
                    } break;
                    default: {

                    } break;
                }
                return {'CellID': wcdma_CID, 'RNC': wcdma_RNC, 'CID': wcdma_CID};  // rezultat din lte
            } break;

            case 'gsm': {    //2G
                return {'CellID': nCellID};  // rezultat direct
            } break;


            default: {

            } break;
        }

        return {};
    },
    foo: function() {
        return 0;
    }
    /*,
    getCellDataCallback: getCellDataCallback(callback)*/    //merge si definita normal, si exportata
  };

/*
  async function getCellDataCallback(callback) {
    var result = api.createCommand()
        .telephonyCellInfo()
        .build()
        .run();
    
    result.getOutputObject()
        .then(function(cellData) {
           // oResult = cellData;
            callback(cellData);
        });
}
*/

/* 
if (!api.hasTermux) process.exit(1)
 
api.vibrate()
   .duration(1000)
   .run()
 
api.clipboardGet()
   .run()
   .then(function (text) {
     // ...
   })
*/