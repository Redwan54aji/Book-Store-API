const express = require('express')
const connectTODB = require('./config/db')
require('dotenv').config();
const logger = require('./middlewares/logger')
const {
   notFound,
   errorHandler
} = require('./middlewares/errors')
//  التصال ب data base
connectTODB();
const app = express()
app.use(express.json());
app.use(logger)
const port = process.env.Port
app.use('/api/book', require('./router/book'))
app.use('/api/autors', require('./router/autor'))
app.use('/api/auth', require('./router/auth'))
app.use('/api/user', require('./router/users'))
// errorHandler
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))