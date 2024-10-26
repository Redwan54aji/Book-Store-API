const express = require('express')
const connectTODB = require('./config/db')
require('dotenv').config();
const logger = require('./middlewares/logger')
const {
   notFound,
   errorHandler
} = require('./middlewares/errors')
const path = require('path')
const helmet = require('helmet')
const cors = require('cors')
//  التصال ب data base
connectTODB();
//init app
const app = express()
//static folder
app.use(express.static(path.join(__dirname, "images")))
//apply middlewares
app.use(express.json());
app.use(express.urlencoded({
   extended: false
}))
app.use(logger)
// helmet
app.use(helmet())
// cors polisy
app.use(cors())
// viws 
app.set('view engine', 'ejs')
const port = process.env.Port
// Routes
app.use('/api/book', require('./router/book'))
app.use('/api/autors', require('./router/autor'))
app.use('/api/auth', require('./router/auth'))
app.use('/api/user', require('./router/users'))
app.use('/password', require('./router/passwoord'))
app.use('/api/upload', require('./router/upload'))
// errorHandler
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))