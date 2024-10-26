const {
    Book
} = require('./Model/Book')
const {
    Autor
} = require('./Model/Autor')
const {
    books,autors
} = require('./data')
const connectTODB = require('./config/db')
require('dotenv').config();

// connection To DB
connectTODB();

//import book
const importBook = async () => {
    try {
        await Book.insertMany(books)
       // console.log("book Imported")
    } 
    catch (error) {
       console.log(error)
        process.exit(1)
    }
}
//import autor
const importAutor = async () => {
    try {
        await Autor.insertMany(autors)
         console.log("Autors Imported")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
//remove book
const removeBook = async () => {
    try {
        await Book.deleteMany(books)
        console.log("book Removed!")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
//remove autor
const removeAutor = async () => {
    try {
        await Autor.deleteMany(autors)
        console.log("Autors Removed!")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
if (process.argv[2] === '-imprt'){
    importBook();
} else if (process.argv[2] === '-remove'){
   removeBook();
} else if (process.argv[2] === '-import-autor') {
    importAutor();
}
else if (process.argv[2] === '-remove-autor') {
    removeAutor();
}