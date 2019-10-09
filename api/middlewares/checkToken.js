const fs = require('fs');
const jwt = require('jsonwebtoken');

var public_key = fs.readFileSync('./public.key', 'utf8');

const checkToken = (req, res, next) => {
    console.log('checkToken');
    console.log(req.body.user_token);
    try {
        const token = req.body.user_token;
        const decoded = jwt.verify(token, public_key, { algorithm: ['RS256'] });
        console.log('decoded' + decoded);
        next();
    } catch (error) {
        console.log('error');
        return 'invalid token';
    }
}
    


module.exports = {
    checkToken
}
