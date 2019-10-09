'use strict'
const express = require('express')
const app = express()
const boom = require('express-boom')

//imports routes
const userRoutes = require('./userRoutes')
const treeRoutes = require('./treeRoutes')
const memberRoutes = require('./memberRoutes')
const relationshipRoutes = require('./relationshipRoutes')


app.use('/user', userRoutes)
app.use('/tree', treeRoutes)
app.use('/member', memberRoutes)
app.use('/relationship', relationshipRoutes)

/*app.use('*', (req, res) => {
    boom.notFound() // responds with a 404 status code
})*/

module.exports = app
