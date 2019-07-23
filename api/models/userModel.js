'use strict';
const pool = require('./../util/pg.js')
const auth = require('./../util/auth.js')

const getUsers = (cb) => {
    pool.query('SELECT * FROM public.user', (err, res) => {
        if (err) throw err; // in case of query error, an exception is thrown
        cb(res.rows); // result is send in calback
    });
};

const getUserById = (cb, id) => {
    pool.query('SELECT * from public.user WHERE id=$1', [id], (err, res) => {
        console.log(id);
        console.log(cb);
        if (err) throw err;
        cb(res.rows);        
    });
}

const register = (cb, data) => {
    auth.checkEmailUnicity(
        response => {
            console.log("response count" + response.rows[0].count);
            if(response.rows[0].count > 0) {
                //email existing in db
                return cb({
                    status: 500,
                    message: 'account already linked to this email'});
            } else {
                console.log("data.email" + data.email);
                pool.query('INSERT INTO public.user(email, password) VALUES ($1, $2)', [data.email, data.password], (err, res) => {
                    console.log("resdb"+res);
                    if (err) throw err;
                    res.message='user inserted';
                    cb(res);
                })
            }
        }, data.email
    );
}

module.exports = {
    getUsers,
    getUserById,
    register
}