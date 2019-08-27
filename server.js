'use strict'
const express = require('express')
const app = express()
const helmet = require('helmet')
const bodyParser = require('body-parser')
//const cookieParser = require('cookie-parser')
const cors = require('cors')
const boom = require('express-boom')
//const passport = require('passport')

//imports .env files
require('dotenv').config()

//imports routes
const routes = require('./api/routes/routes')

//using helmet to secure app
app.use(helmet());

//initializes passport configuration
//app.use(passport.initialize());
//imports conf file holding verification callbacks and things like secret
//require('./passport-config')(passport);

// using morgan to show the logs in console
if (process.env.NODE_ENV === 'development') {
    const morgan = require('morgan')
    app.use(morgan('dev'))
}

// using body parser middlewares to parse requests
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

console.log("server.js origin url :"+ process.env.ORIGIN_URL)

//setting cors config
app.use(
    cors({
        origin: process.env.ORIGIN_URL,
        optionsSuccessStatus: 200
    })
)

//prefixing routes with 'api'
app.use('/api/', routes)

//using boom to handle errors
app.use(boom())
app.use((req, res) => {
    res.boom.notFound() // Responds with a 404 status code
})

app.listen(process.env.PORT || 8000)
console.log(`server running on port http://localhost:${process.env.PORT || 8000}`)

module.exports = app