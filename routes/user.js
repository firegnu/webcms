exports.user = function(req, res) {

};

exports.post = function(req, res) {

};

exports.reg = function(req, res) {
    res.render('reg', {
        title: '用户注册'
    });
};

exports.doReg = function(req, res) {
    req.checkBody('username', 'Username is required').notEmpty();
    /*req.checkBody('password', 'Password is required').notEmpty();
     req.checkBody('email', 'Email is required').notEmpty();
     req.checkBody('email', 'Email does not appear to be valid').isEmail();*/

    var errors = req.validationErrors();
    console.log(errors);

    if (errors) {
        res.render('reg', { flash: { type: 'alert-danger', messages: errors }});
    }
    else {
        var mysql      = require('mysql');
        var connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '000128',
            database : 'webcms'
        });

        connection.connect();

        connection.query('select usr from tz_members', function(err, results, fields) {
            if (err && err.number != mysql.ERROR_DB_CREATE_EXISTS) {
                throw err;
            }
            else {
                console.log(results);
                console.log(fields);
            }
        });

        connection.end();
    }
};

exports.login = function(req, res) {
    res.render('login', {
        title: '用户登陆'
    });
};

exports.doLogin = function(req, res) {
    res.send("dologin done");
};

exports.logout = function(req, res) {
    res.send("logout done");
};

exports.list = function(req, res){
    res.send("respond with a resource");
};