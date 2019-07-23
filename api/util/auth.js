'use strict'
const crypto = require('crypto')
const pool = require('./pg.js')

const checkEmailUnicity = (cb, email) => {
    pool.query('SELECT count(email) FROM public.user WHERE email = $1', [email], (err, res) => {
        if (err) throw err;
        cb(res);
    })    
}

module.exports = {
    checkEmailUnicity
};
