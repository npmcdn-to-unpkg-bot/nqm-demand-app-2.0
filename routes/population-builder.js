var log = require("debug")("demand-population-builder");

var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

//var config = require.main.require("./config");
var h = require.main.require("./lib/helpers.js")



//var BuildObj = require.main.require("./buildObj.js");

//var tf = require.main.require("./Table_Functions.js");

router.get('/', h.ensureAuthenticated, function (req, res, next) {

    log("get population builder")

    //var tdx = {
    //    token: req.session.token,
    //    baseCommandURL: req.session.config.baseCommandURL,
    //    baseQueryURL: req.session.config.baseQueryURL,
    //    buildSchema: req.session.config.buildSchema

    //}

    res.render('population-builder', {
        title: 'population-builder',
        tdx: req.session.tdx_config
    })
    

});


//test route for getting inital data into tdx
router.post('/initData/:table', function (req, res) {

    log("get init data")

    var data = require.main.require("./initSessionData.json")

    log(data)

    var table = req.params.table;


    log("get: " + table)
    log(data[table])

    res.json(data[table])


})

//router.get('/geography', function (req, res, next) {

//    log("get geography: ");

//    res.json(req.session.config);


//});

//router.delete('/geography', function (req, res, next) {

//    log("delete geography");

//    var uniqueProperties = JSON.parse(req.query.up)

//    req.session.tableData.geography = tf.remove(req.session.tableData.geography, uniqueProperties)

//    res.send()

//})

//router.post('/', function (req, res, next) {
//    db.insert(prepareItem(req.body), function (err, item) {
//        res.json(item);
//    });
//});

//router.put('/', function (req, res, next) {
//    var item = prepareItem(req.body);

//    db.update({ _id: item._id }, item, {}, function (err) {
//        res.json(item);
//    });
//});

//router.delete('/', function (req, res, next) {
//    var item = prepareItem(req.body);

//    db.remove({ _id: item._id }, {}, function (err) {
//        res.json(item);
//    });
//});


module.exports = router;