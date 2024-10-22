const joi = require('joi')
const mongoose = require('mongoose');
//mongoose.connect('mongodb://127.0.0.1:27017/techers and autors');
const TecherSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
            minlenght: 3,
            maxlenght: 300,
            trim: true,
        },

        autor: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Autor"
        },
        description: {
            type: String,
            trim: true,
            require: true,
            minlenght: 5,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        cover: {
            type: String,
            required: true,
            enum: ["soft cover", "hard cover"]
        }
    }, {
        timestamps: true,
    }


)

function validateCreateBook(obj) {
    const schame = joi.object({
        title: joi.string().trim().min(3).max(250).required(),
        autor: joi.string().required(),
        description: joi.string().trim().min(5).required(),
        price: joi.number().min(0).required(),
        cover: joi.string().valid("soft cover", "hard cover").required(),

    })
    return schame.validate(obj)
}

function validateUpdateBook(obj) {
    const schame = joi.object({
        title: joi.string().trim().min(3).max(250),
        autor: joi.string(),
        description: joi.string().trim().min(5),
        price: joi.number().min(0),
        cover: joi.string().valid("soft cover", "hard cover"),
    })
    return schame.validate(obj)
}

const Book = mongoose.model('Book', TecherSchema);
module.exports = {
    Book,
    validateCreateBook,
    validateUpdateBook
}