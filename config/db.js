const mongoose = require('mongoose')

async function connectTODB() {
    try {
        await mongoose
            .connect(process.env.Mondo_URL)
        console.log('Connected To MongoDB...')
    } catch (error) {
        console.log('Connection Failed To MongoDB!', error)
    }


}
module.exports = connectTODB;
// mongoose
//     .connect(process.env.Mondo_URL)
//     .then(() => {
//         console.log('Connected To MongoDB...')

//     })
//     .catch((error) => {
//         console.log('Connection Failed To MongoDB!', error)
//     })