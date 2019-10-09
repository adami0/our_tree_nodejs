'use strict';
const pool = require('./../util/pg.js')

const getMemberById = (cb, id) => {
    console.log('id:'+id);
    pool.query('SELECT * FROM public.member WHERE id = $1', [id], (err, res) => {
        if (err) throw err;
        cb(res.rows);
    })
}

const getAllMembersByTreeId = (cb, id) => {
    pool.query('SELECT * FROM public.member WHERE tree_id = $1 ORDER BY id ASC', [id], (err, res) => {
        if (err) throw err;
        cb(res.rows);
    })
}

const createMember = (cb, data) => {
    pool.query('INSERT INTO public.member(firstname, lastname, birthdate, death_date, birthplace, death_place, text, tree_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
    [data.firstname, data.lastname, data.birthdate, data.death_date, data.birthplace, data.death_place, data.text, data.tree_id], (err, res) => {
        if (err) throw err;
        console.log("create member res: ");
        console.log(res);
        cb(res);
    })
}

const getMemberByFirstnameAndLastname = (cb, data) => {
    pool.query('SELECT * FROM public.member WHERE firstname = $1 AND lastname = $2 AND tree_id = $3', [data.firstname, data.lastname, data.tree_id], (err, res) => {
        if (err) throw err;
        cb(res);
    })
}

module.exports = {
    getMemberById,
    getAllMembersByTreeId,
    createMember,
    getMemberByFirstnameAndLastname
}