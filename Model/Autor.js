const joi = require('joi')
mongoose = require('mongoose');
//mongoose.connect('mongodb://127.0.0.1:27017/techers and autors');
const AuthorSchema = new mongoose.Schema({
        fistName: {
            type: String,
            required: true,
            minlenght: 3,
            maxlenght: 300,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            minlenght: 3,
            maxlenght: 300,
            trim: true,
        },
        nationality: {
            type: String,
        },
        image: {
            type: String,
            default: "default avrg.png"
        }
    }, {
        timestamps: true,
    }


)

function validateCreateAutor(obj) {
    const schame = joi.object({
        fistName: joi.string().trim().min(3).max(200).required(),
        lastName: joi.string().trim().min(3).max(300).required(),
        nationality: joi.string().min(2).max(100).required(),
    })
    return schame.validate(obj)
}

function validateUpdateAutor(obj) {
    const schame = joi.object({
        fistName: joi.string().trim().min(3).max(200),
        lastName: joi.string().trim().min(3).max(300),
        nationality: joi.string().min(2).max(100),
    })
    return schame.validate(obj)
}
const Autor = mongoose.model('Autor', AuthorSchema);
module.exports = {
    Autor,
    validateCreateAutor,
    validateUpdateAutor
}