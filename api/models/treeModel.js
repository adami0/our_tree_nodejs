'use strict';
const pool = require('./../util/pg.js')

const getTreesByUserId = (cb, id) => {
    pool.query('SELECT * from public.tree WHERE user_id=$1', [id], (err, res) => {
        console.log('checkModel');
        console.log(id);
        console.log(cb);
        console.log(res.rows)
        if (err) throw err;
        cb(res.rows);        
    });
}

//create new tree in db
const createTree = (cb, data) => {
    pool.query('INSERT INTO public.tree (name, user_id) VALUES ($1, $2)', [data.name, data.user_id], (err, res) => {
        if (err) throw (err);
        cb(res);
    })
}

const updateTree = (cb, data) => {
    pool.query('UPDATE public.tree SET name=$1 WHERE id=$2 AND user_id=$3', [data.name, data.id, data.user_id], (err, res) => {
        if (err) throw err;
        cb(res);
    })
}

module.exports = {
    getTreesByUserId,
    createTree,
    updateTree
}
