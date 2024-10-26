const express = require('express');
const router = express.Router()
const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require('../middlewares/veryfiletoken')
const {
    deleteUserById,
    getAllUser,
    getUserById,
    updateUser
} = require('../controllers/controllersuser')
router.route('/:id').put(verifyTokenAndAuthorization, updateUser).get(verifyTokenAndAuthorization, getUserById).delete( verifyTokenAndAuthorization, deleteUserById);
router.route('/').get(verifyTokenAndAdmin, getAllUser)
module.exports = router;