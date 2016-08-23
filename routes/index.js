var log = require("debug")("demand-index");
var util = require("util");

var tdx_config = require.main.require("./tdx-config");
var map_config = require.main.require("./hcc-map-config");
var h = require.main.require("./lib/helpers.js")

var express = require('express');
var router = express.Router();



/* get home page. */
router.get('/', h.ensureAuthenticated, function (req, res, next) {

    res.render('index', { title: 'demand-app' });


});


router.get('/login', function (req, res, next) {

    log("login")


    var message = "login";

    //todo change config.testUrl
    var returnUrl = tdx_config.testURL

    var q = req.query;

    if (q.return) {

        log(q.return)

        req.session.lastUrl = q.return;
        message = "time out";
    };

    var tdxURL = util.format("%s/auth?rurl=%s/authCB", tdx_config.authServerURL, returnUrl);
    res.render("login", { title: 'login', message: message, loginURL: tdxURL });

});



// TDX auth server will callback here after authentication.
router.get("/authCB", function (req, res) {
    if (req.query.access_token) {
        // Store the access token with the session.
        log("token is %s", req.query.access_token);
        //at the same time store the tdx_config file details
        req.session.tdx_config = tdx_config;
        req.session.tdx_config.token = req.query.access_token;

        //and store the local authoirty config details
        req.session.map_config = map_config;

    } else {
        log("failed to get access token");
    }


    var redirect = "/"

    if (req.session.lastUrl) {
        redirect = req.session.lastUrl
    }
    // Redirect to home page.
    res.redirect(redirect);
});

router.get("/logout", function (req, res) {
    // Clear session
    req.session.destroy();
    res.redirect("/");
});




module.exports = router;
