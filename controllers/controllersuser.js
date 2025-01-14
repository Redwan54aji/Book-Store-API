const asynchandler = require('express-async-handler')
const bcrypt = require("bcryptjs")
const {
    User,
    validateUodateUser
} = require('../Model/User')

/** *
 * @decs Update User
 * @route /api/user/:id
 * @method put
 * @access private
 */
const updateUser = asynchandler(async (req, res) => {
    const {
        error
    } = validateUodateUser(req.body)
    if (error) {
        res.status(400).json({
            message: error.details[0].message
        })
    }
    console.log(req.headers)
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)

    }
    const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
            },

        }, {
            new: true
        }

    ).select('-password')
    res.status(200).json(updateUser)
})


/** *
 * @decs Get All Uesr
 * @route /api/user/
 * @method Get
 * @access private
 */

const getAllUser = asynchandler(async (req, res) => {
    const user = await User.find().select('-password')
    res.status(200).json(user)
})

/** *
 * @decs Get Uesr By Id
 * @route /api/user/:id
 * @method Get
 * @access private
 */
const getUserById = asynchandler(async (req, res) => {
    const userById = await User.findById(req.params.id).select('-password')
    if (userById) {
        res.status(200).json(userById)
    } else {
        res.status(404).json({
            message: "user not found"
        })
    }
})



/** *
 * @decs Delete Uesr By Id
 * @route /api/user/:id
 * @method Delete
 * @access private
 */
const deleteUserById = asynchandler(async (req, res) => {
    const userByIdDeleted = await User.findById(req.params.id)
    if (userByIdDeleted) {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: "user has been deleted"
        })
    } else {
        res.status(404).json({
            message: "user not found"
        })
    }
})



module.exports = {
    updateUser,
    getAllUser,
    getUserById,
    deleteUserById
}