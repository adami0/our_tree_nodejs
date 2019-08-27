'use strict';
const pool = require('./../util/pg.js')

const getTreesByUserId = (cb, id) => {
    pool.query('SELECT * from public.tree WHERE user_id=$1', [id], (err, res) => {
        console.log(id);
        console.log(cb);
        if (err) throw err;
        cb(res.rows);        
    });
}

module.exports = {
    getTreesByUserId
}
