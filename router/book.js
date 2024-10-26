const express = require('express');
const router = express.Router();
const {
  verifyTokenAndAdmin
} = require('../middlewares/veryfiletoken')
const {
  getAllBook,
  getBookById,
  CreateNewBook,
  UpdateBookById,
  DeleteBookById
} = require('../controllers/controllersbook')
// /api/book
router.route('/').get(getAllBook).post(verifyTokenAndAdmin, CreateNewBook);
// /api/book/:id
router.route('/:id').get(getBookById).put(verifyTokenAndAdmin, UpdateBookById).delete(verifyTokenAndAdmin, DeleteBookById)
module.exports = router;