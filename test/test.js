const { describe } = require('mocha');
const { expect } = require('chai');

const assert = require('assert');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

//put the actualized token of the user 'pp' here
const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBwIiwiaWF0IjoxNTcxMDcxMDY2LCJleHAiOjE1NzExMDcwNjZ9.g8CFg39GHGgXyHFXvVYblGt5ClbTDpebjQf0PLUWRlx15WEQLmeHZRxvD2l0VBTtCfXKXGjSyAUYYO_mKx8G_Q"

describe('Simple test suite:', function () {
    it('1 === 1 should be true', function () {
        expect(1).to.equal(1);
    });
});

chai.use(chaiHttp);


//user part
describe('testing auth', function () {
    it('should have status 200', (done) => {
        let user = {
            email: 'pp',
            password: 'a'
        }
        chai.request(server)
            .post('/api/user/auth')
            .send(user)
            .end((err, res) => {
                if (err) throw err;
                res.should.have.status(200);
                res.should.have.property('error').eql(false);
                done();
            })
    })
});

describe('getting user id by email', function () {
    it('should have status 200', (done) => {
        let data = {
            token: token,
            email: 'pp'
        }
        chai.request(server)
            .post('/api/user/email/pp')
            .send(data)
            .end((err, res) => {
                if (err) throw err;
                res.should.have.status(200);
                res.should.have.property('error').eql(false);
                done();
            })
    })
});

//tree part
describe('getting list of trees by user id', function () {
    it('should have status 200', (done) => {
        let data = {
            token: token,
            email: 'pp'
        }
        chai.request(server)
            .post('/api/tree/user_id/15')
            .send(data)
            .end((err, res) => {
                if (err) throw err;
                res.should.have.status(200);
                res.should.have.property('error').eql(false);
                done();
                return;
            })
    })
});

describe('getting list of trees by user id', function () {
    it('should have status 403 beacause of invalid token', (done) => {
        let data = {
            token: 'invalid token',
            email: 'tanya'
        }
        chai.request(server)
            .post('/api/tree/user_id/16')
            .send(data)
            .end((err, res) => {
                if (err) throw err;
                res.should.have.status(403);
                //res.should.have.property('error').eql(true);
                done();
                return;
            });
    })
});

describe('creating tree', function () {
    it('should have status 201', (done) => {
        let data = {
            name: 'test_name_post',
            user_id: '15',
            token: token,
            email: 'pp'
        }
        chai.request(server)
            .post('/api/tree/post_tree')
            .send(data)
            .end((err, res) => {
                if (err) throw err;
                res.should.have.status(201);
                res.should.have.property('error').eql(false);
                done();
                return;
            })
    })
});

describe('updating tree', function () {
    it('should have status 200', (done) => {
        let data = {
            id: 1,
            name: 'test_name_update',
            user_id: '15',
            token: token,
            email: 'pp'
        }
        chai.request(server)
            .put('/api/tree/update_tree')
            .send(data)
            .end((err, res) => {
                if (err) throw err;
                res.should.have.status(200);
                res.should.have.property('error').eql(false);
                done();
                return;
            })
    })
});

//member part
describe('get members by tree id', function () {
    it('should have status 200', (done) => {
        let data = {
            token: token,
            tree_id: 1
        }
        chai.request(server)
            .post('/api/member/all_by_tree')
            .send(data)
            .end((err, res) => {
                if (err) throw err;
                res.should.have.status(200);
                res.should.have.property('error').eql(false);
                done();
                return;
            })
    })
});

