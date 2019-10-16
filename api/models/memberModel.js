'use strict';
const pool = require('./../util/pg.js')

//we check if admin is the requester
const getNbOfMembers = (cb, data) => {
    pool.query(`SELECT COUNT(id) FROM public.user WHERE email=$1 AND admin=true`, [data.user_data.email], (err, res) => {
        if (err) throw err;
        if (res.rows[0].count == 1) {
            pool.query(`SELECT COUNT(id) FROM public.member`, (err, res) => {
                if (err) throw err;
                res.error = false;
                cb(res);
            })
        } else {
            res.error = true;
            cb(res);
        }
    })
}

const getMemberById = (cb, id) => {
    console.log('id:' + id);
    pool.query('SELECT * FROM public.member WHERE id = $1', [id], (err, res) => {
        if (err) throw err;
        cb(res.rows);
    })
}

//we get members and relationship types between them
const getAllMembersByTreeId = (cb, data) => {
    //checking number of members in a table
    pool.query(`SELECT COUNT(m.id)
        FROM public.member m, public.tree t, public.user u
        WHERE u.id = t.user_id
        AND u.email = $2
        AND t.id = m.tree_id
        AND m.tree_id = $1`, [data.tree_id, data.user_data.email], (err, res) => {
        if (err) throw err;
        console.log(res);
        //we check an existing member by id in the tree, if none res.rows[0].count = 0
        if (res.rows[0].count > 1) {
            pool.query(`SELECT m.id
            FROM public.member m 
            WHERE m.tree_id = $1
            ORDER BY id ASC LIMIT 1`, [data.tree_id], (err, res) => {
                if (err) throw err;
                const firstMemberId = res.rows[0].id;
                pool.query(`SELECT m.*, rt.* 
                FROM public.member m, public.relationship r, public.relationship_type rt
                WHERE m.tree_id = $1
                AND r.member1_id = $2
                AND m.id = r.member2_id
                AND r.relationship_type_code = rt.code
                UNION
                (SELECT m.*, rt.*
                FROM public.member m, public.relationship r, public.relationship_type rt
                WHERE m.id = $2
                AND r.member1_id = m.id
                AND r.relationship_type_code = rt.code
                LIMIT 1)
                ORDER BY id ASC`, [data.tree_id, firstMemberId], (err, res) => {
                    if (err) throw err;
                    cb(res.rows);
                })
            })
        } else {
            //retrieving if exists first member of the tree
            pool.query(`SELECT m.*
                FROM public.member m
                WHERE m.tree_id = $1`, [data.tree_id], (err, res) => {
                if (err) throw err;
                console.log(res);
                cb(res.rows);
            });
        }
    })
};



const createMember = (cb, data) => {
    pool.query('INSERT INTO public.member(firstname, lastname, birthdate, death_date, birthplace, death_place, text, tree_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
        [data.firstname, data.lastname, data.birthdate, data.death_date, data.birthplace, data.death_place, data.text, data.tree_id], (err, res) => {
            if (err) throw err;
            console.log("create member res: ");
            console.log(res);
            cb(res);
        })
}

const deleteMember = (cb, data) => {
    pool.query(`
    DELETE FROM public.relationship p
    WHERE p.member2_id = $1`, [data.member_id], (err, res) => {
        if (err) throw err;
        pool.query(`DELETE FROM public.member m
            WHERE m.id = $1`, [data.member_id], (err, res) => {
                if (err) throw err;
                cb(res);
            })
    })
}

const updateMember = (cb, data) => {
    pool.query(`UPDATE public.member
    SET firstname = $1,
    lastname = $2,
    birthdate = $3,
    death_date = $4,
    birthplace = $5,
    death_place = $6,
    text = $7
    WHERE id = $8`, [data.firstname, data.lastname, data.birthdate, data.death_date, data.birthplace, data.death_place, data.text, data.member_id], (err, res) => {
        if (err) throw err;
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
    getNbOfMembers,
    updateMember,
    deleteMember,
    getMemberById,
    getAllMembersByTreeId,
    createMember,
    getMemberByFirstnameAndLastname
}