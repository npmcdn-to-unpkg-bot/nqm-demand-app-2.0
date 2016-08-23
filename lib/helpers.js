
module.exports = {

    // Authentication helper - include this on any route that should be secure
    ensureAuthenticated: function(req, res, next) {
        // Check if have a valid token for this session.
        console.log(req.session)
        if (req.session && req.session.tdx_config && req.session.tdx_config.token) {
            next();
        } else {
            res.redirect("/login");
        }
    }

}