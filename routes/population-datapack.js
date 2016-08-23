var log = require("debug")("demand-population-datapack");

var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var h = require.main.require("./lib/helpers.js")


router.get('/', h.ensureAuthenticated, function (req, res, next) {

    log("get population datapack")

    //var tdx = {
    //    token: req.session.token,
    //    baseCommandURL: req.session.tdx_config.baseCommandURL,
    //    baseQueryURL: req.session.tdx_config.baseQueryURL,
    //    buildSchema: req.session.tdx_config.buildSchema

    //}

    res.render('population-datapack', {
        title: 'population-datapack',
        tdx: req.session.tdx_config,
        map_config: req.session.map_config
    })


});


module.exports = router;