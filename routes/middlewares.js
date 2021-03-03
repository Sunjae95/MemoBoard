const db = require('../db');

exports.isLogged = async (req, res, next) => {
    const dbToken = await db.query('SELECT * FROM users WHERE token = ?', [ req.cookies.user ]);

    if(dbToken[0][0] === undefined ){
         res.redirect('login');
    } else {
        next();
    }
};

exports.isNotLogged = (req, res, next) => {
    if(!req.cookies.user){
        next();
    } else {
        res.redirect('login');
    }
};