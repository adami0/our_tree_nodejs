'use strict'
const express = require('express')
const app = express()

//imports routes
const userRoutes = require('./userRoutes')
const treeRoutes = require('./treeRoutes')


app.use('/user', userRoutes)
app.use('/tree', treeRoutes)

app.use('*', (req, res) => {
    res.boom.notFound() // responds with a 404 status code
  })

module.exports = app
