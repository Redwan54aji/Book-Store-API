const asynchandler = require('express-async-handler')
const {
    validateCreateBook,
    validateUpdateBook,
    Book
} = require('../Model/Book')

/** *
 * @decs get all book
 * @route /api/techers
 * @method Get
 * @access public
 */
const getAllBook = asynchandler(
    async (req, res) => {
        const {
            minprice,
            maxprice
        } = req.query
        let Booklist;


        if (minprice && maxprice) {
            Booklist = await Book.find({
                price: {
                    $gte: minprice,
                    $lte: maxprice
                }
            }).populate("autor", ["_id", "fistName", "lastName"]);
        } else {
            Booklist = await Book.find().populate("autor", ["_id", "fistName", "lastName"]);
        }

        res.status(200).json(Booklist)
    });
/** *
 * @decs get  book by id
 * @route /api/book/:id
 * @method Get
 * @access public
 */
const getBookById = asynchandler(async (req, res) => {
    const BooklistbyId = await Book.findById(req.params.id).populate("autor")
    if (BooklistbyId) {
        res.status(200).json(BooklistbyId)
    } else {
        res.status(404).json({
            message: "the not id requist"
        })
    }

})
/** *
 * @decs Create a new book
 * @route /api/book
 * @method Post
 * @access private (only Admin)
 */
const CreateNewBook = asynchandler(async (req, res) => {

    const {
        error
    } = validateCreateBook(req.body)

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }
    const book = new Book({

        title: req.body.title,
        autor: req.body.autor,
        description: req.body.description,
        price: req.body.price,
        cover: req.body.cover,
    })
    const result = await book.save()
    res.status(201).json(result);
})
/** *
 * @decs Update a book by id
 * @route /api/book/:id
 * @method Put
 * @access private (only Admin)
 */
const UpdateBookById = asynchandler(async (req, res) => {
    const {
        error
    } = validateUpdateBook(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }
    const UpdateBook = await Book.findByIdAndUpdate(
        req.params.id, {
            $set: {

                title: req.body.title,
                autor: req.body.autor,
                description: req.body.description,
                price: req.body.price,
                cover: req.body.cover,

            }
        }, {
            new: true
        }
    )
    res.status(200).json(UpdateBook)

})
/** *
 * @decs Delete a book by id
 * @route /api/book/:id
 * @method Delete
 * @access private (only Admin)
 */
const DeleteBookById = asynchandler(async (req, res) => {

    const DeleteBookbyId = await Book.findById(req.params.id)
    if (DeleteBookbyId) {
        await Book.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: "book has been delete"
        })
    } else {
        res.status(404).json({
            message: "book not found "
        })
    }

})
module.exports = {
    getAllBook,getBookById,CreateNewBook,UpdateBookById,DeleteBookById
}