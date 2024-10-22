const joi = require('joi')
const mongoose = require('mongoose');
const JWT = require("jsonwebtoken")

//User schema

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        minlenght: 5,
        maxlenght: 100,
        unique: true,
        trim: true,
    },
    username: {
        type: String,
        require: true,
        minlenght: 2,
        maxlenght: 200,
        trim: true,
    },
    password: {
        type: String,
        require: true,
        minlenght: 6,
        trim: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
})
//Generate Token
userSchema.methods.generateToken = function () {
   return JWT.sign({
        id: this._id,
        isAdmin: this.isAdmin
    }, process.env.key)
}



function validateRegisterUser(obj) {
    const schame = joi.object({
        email: joi.string().trim().min(5).max(100).required().email(),
        username: joi.string().trim().min(2).max(200).required(),
        password: joi.string().trim().min(2).required(),
    })
    return schame.validate(obj)
}

function validateLoginUser(obj) {
    const schame = joi.object({
        email: joi.string().trim().min(5).max(100).required().email(),
        password: joi.string().trim().min(2).required(),
    })
    return schame.validate(obj)
}

function validateUodateUser(obj) {
    const schame = joi.object({
        email: joi.string().trim().min(5).max(100).email(),
        username: joi.string().trim().min(2).max(200),
        password: joi.string().trim().min(2),

    })
    return schame.validate(obj)
}
const User = mongoose.model("User", userSchema);
module.exports = {
    User,
    validateLoginUser,
    validateRegisterUser,
    validateUodateUser,
}