const express = require('express');
const asynchandler = require('express-async-handler')
const router = express.Router();
const {
  verifyTokenAndAdmin
} = require('../middlewares/veryfiletoken')
const {
  validateCreateBook,
  validateUpdateBook,
  Book
} = require('../Model/Book')



/** *
 * @decs get all techers
 * @route /api/techers
 * @method Get
 * @access public
 */
router.get('/', asynchandler(
  async (req, res) => {
    const Booklist = await Book.find().populate("autor", ["_id", "fistName", "lastName"]);
    res.status(200).json(Booklist)
  }));

/** *
 * @decs get  techer by id
 * @route /api/techers/:id
 * @method Get
 * @access public
 */
router.get('/:id', asynchandler(async (req, res) => {
  const BooklistbyId = await Book.findById(req.params.id).populate("autor")
  if (BooklistbyId) {
    res.status(200).json(BooklistbyId)
  } else {
    res.status(404).json({
      message: "the not id requist"
    })
  }

}))
/** *
 * @decs Create a new techer
 * @route /api/techers
 * @method Post
 * @access private (only Admin)
 */
router.post("/", verifyTokenAndAdmin, asynchandler(async (req, res) => {

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
}))
/** *
 * @decs Update a techer by id
 * @route /api/techers/:id
 * @method Put
 * @access private (only Admin)
 */
router.put('/:id', verifyTokenAndAdmin, asynchandler(async (req, res) => {
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

}))
/** *
 * @decs Delete a techer by id
 * @route /api/techers/:id
 * @method Delete
 * @access private (only Admin)
 */

router.delete('/:id', verifyTokenAndAdmin, asynchandler(async (req, res) => {

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

}))




module.exports = router;