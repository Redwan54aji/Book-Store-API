const express = require('express');

const router = express.Router();
const {
  verifyTokenAndAdmin
} = require('../middlewares/veryfiletoken')
const {
  getAllAutor,
  createNewAutor,
  getAutorById,
  UpdateAutorById,
  DeleteAutorById
} = require('../controllers/controllersautor')
router.route('/', ).get(getAllAutor).post(verifyTokenAndAdmin, createNewAutor);
router.route('/:id').get(getAutorById).put(verifyTokenAndAdmin, UpdateAutorById).delete(verifyTokenAndAdmin, DeleteAutorById);
module.exports = router;