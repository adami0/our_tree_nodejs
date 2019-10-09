'use strict';
const pool = require('./../util/pg.js')
const util = require('./../util/util.js')
const bcrypt = require('bcrypt')

const getUsers = (cb) => {
    pool.query('SELECT * FROM public.user', (err, res) => {
        if (err) throw err; // in case of query error, an exception is thrown
        cb(res.rows); // result is send in callback
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

const getUserByEmail = (cb, email) => {
    pool.query('SELECT id from public.user WHERE email=$1', [email], (err, res) => {
        if (err) throw err;
        console.log(res);
        cb(res.rows[0]);
    })
}

const register = (cb, data) => {
    util.checkEmailUnicity(
        response => {
            console.log("response count: " + response.rows[0].count);
            //if email already exists in db
            if(response.rows[0].count > 0) {
                response.error = true;
                return cb(response);
            } else {
                let hash = bcrypt.hashSync(data.password, 10);
                console.log("data.password: " + data.password);
                console.log("hash: " + hash);
                console.log("data.email: " + data.email);
                pool.query('INSERT INTO public.user(email, password) VALUES ($1, $2)', [data.email, hash], (err, res) => {
                    console.log("resdb: "+res);
                    if (err) throw err;
                    cb(response);
                })
            }
        }, data.email
    );
}

const auth = (cb, data) => {
    pool.query('SELECT password FROM public.user WHERE email=$1', [data.email], (err, res) => {
        if (err) throw err;
        //if email exists
        if (res.rowCount > 0) {
            //checking if passwords match, response is true if they do
            bcrypt.compare(data.password, res.rows[0].password, (error, response) => {
                if (error) throw error;
                if (response) {
                    //creating an object storing informations
                    res.error = false;
                    console.log("error : " + res.error);
                    res.email = data.email;
                    return cb(res);
                } else {
                    res.error = true;
                    console.log("error : " + res.error);
                    return cb(res);
                }
            })
        } else {
            console.log('no email found');
            res.error = true;
            console.log("error : " + res.error);
            return cb(res);
        }
    })
}

module.exports = {
    getUsers,
    getUserById,
    getUserByEmail,
    register,
    auth
}