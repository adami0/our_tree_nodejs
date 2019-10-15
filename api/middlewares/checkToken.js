const fs = require('fs');
const jwt = require('jsonwebtoken');

var public_key = fs.readFileSync('./public.key', 'utf8');

const checkToken = (req, res, next) => {
    console.log(req.body);
    console.log('checkToken');
    console.log(req.body.token);
    console.log('checkEmail');
    console.log(req.body.email);
    try {
        const token = req.body.token;
        const decoded = jwt.verify(token, public_key, { algorithm: ['RS256'] });
        console.log('decoded' + JSON.stringify(decoded));
        req.body.user_data = decoded;
        res.error = false;
        next();
    } catch (error) {
        console.log('error');
        res.error=true;
        return res.status(403).send('invalid token');
    }
}
    


module.exports = {
    checkToken
}
