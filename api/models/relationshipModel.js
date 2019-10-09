'use strict';
const pool = require('./../util/pg.js')

const getRelationshipsByTreeId = (cb, id) => {
    console.log('id: ' + id);
    pool.query('SELECT r.*, m.firstname, m.lastname FROM public.relationship r, public.member m WHERE m.tree_id = $1 AND r.member1_id = m.id', [id], (err, res) => {
        if (err) throw err;
        console.log(res);
        cb(res.rows);
    })
}

const createRelationship = (cb, data) => {
    pool.query('INSERT INTO public.relationship(member1_id, member2_id, relationship_type_code, member1_role_code, member2_role_code) VALUES ($1, $2, $3, $4, $5)', [data.member1_id, data.member2_id, data.relationship_type_code, data.member1_role_code, data.member2_role_code], (err, res) => {
        if (err) throw err;
        cb(res);
    })
}

module.exports = {
    getRelationshipsByTreeId,
    createRelationship
}
