/*
*  CellID by .:DjBpF:.
* =====================
*/
const express = require('express')
const webServer = express()
const oCellClass = require('./include/cellid-functions')

var { serverPort } = require('./config');   // inlocuieste si dotenv.config() si process.env.VARIABILA
serverPort = serverPort || 3000;
/* nu mai e necesar asa, avem config.js
//const dotenv = require('dotenv')
//dotenv.config();    // preluare din .env
*/

webServer.set('view engine', 'ejs')
webServer.use(express.urlencoded({ extended: false }))

webServer.get('/', (req, res) => {
    res.render('index');
})

/* neterminat - folder de /statice
webServer.get('/static/:staticJsFile.js', (req, res) => {
    var jsFile = req.params.staticJsFile;
    console.log('req: ' + JSON.stringify(jsFile))
    res.setHeader("Content-Type", "text/javascript")
    res.render('static/script');
    res.end();
    //res.render(req.param.staticJsFile);
});*/

webServer.get('/cellid.json', async function(req, res) {
    // request ce dureaza
    var oSIMsCellData;
    try {
        oSIMsCellData = await oCellClass._getCellDataSimple();
    } catch {
        oSIMsCellData = {};
        console.log('no data retrieved');
        res.end('plm');
        return false;
    }
    // parsing only
    var oCellData = oCellClass._selectFirstAvailableResult(oSIMsCellData);
    var nCellID = oCellClass._getCellID(oCellData);
    var nCellID2G = oCellClass._getCellID_2G(oCellData);
    var nCellLAC = oCellClass._getLAC(oCellData);
    var nTA = oCellClass._getTimingAdvance(oCellData);

    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    res.send(JSON.stringify({
        'status': 'ok',
        'content': {
            'cellID': nCellID,
            'cellID2G': nCellID2G.CellID,   // cuprinde si eNB, LCID, plm...
            'lac': nCellLAC,
            'ta': nTA,
            'dbm': oCellData.dbm,
            'cellType': oCellData.type,
            'mcc': oCellData.mcc,
            'mnc': oCellData.mnc,
            'all': JSON.stringify(oCellData)
        }
    }));
    res.end();
})
webServer.get('/location.json', async function(req, res) {
    const oLocationClass = require('./include/location-functions')
    // request ce dureaza
    var oGPSLocationData;
    try {
        oGPSLocationData = await oLocationClass._getGPSLocation();
    } catch {
        oGPSLocationData = {};
        console.log('no data retrieved');
        res.end('plm');
        return false;
    }
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    res.send(JSON.stringify({
        'status': 'ok',
        'content': {
            'all': JSON.stringify(oGPSLocationData)
        }
    }));
    res.end();
})

console.log(`Deschide in browser: http://localhost:${serverPort}/`)
webServer.listen(serverPort);
//webServer.listen(process.env.PORT || 3000);