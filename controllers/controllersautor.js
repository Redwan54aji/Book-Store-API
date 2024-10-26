const asynchandler = require('express-async-handler')
const {
    Autor,
    validateCreateAutor,
    validateUpdateAutor
} = require('../Model/Autor')


/** *
 * @decs get all autors
 * @route /api/techers
 * @method Get
 * @access public 
 */

const getAllAutor = asynchandler(

    async (req, res) => {
        const {
            pageNumber
        } = req.query;
        const autorPerPage = 2
        const Autherlist = await Autor.find()
            .skip((pageNumber - 1) * autorPerPage)
            .limit(autorPerPage);
        res.status(200).json(Autherlist);
    })


/**  *
 * @decs get  autor by id
 * @route /api/autors/:id
 * @method Get
 * @access public 
 */

const getAutorById = asynchandler(async (req, res) => {
    const AutherlistbyId = await Autor.findById(req.params.id)
    if (AutherlistbyId) {
        res.status(200).json(AutherlistbyId)
    } else {
        res.status(404).json({
            message: "the not id requist"
        })
    }
})

/** *
 * @decs Create a new autor
 * @route /api/autors
 * @method Post
 * @access private(only Admin)
 */

const createNewAutor = asynchandler(async (req, res) => {
    const {
        error
    } = validateCreateAutor(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }
    const autor = new Autor({
        fistName: req.body.fistName,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
    });
    const result = await autor.save();
    res.status(201).json(result);
})

/** *
 * @decs Update a autors
 * @route /api/techers/:id
 * @method Put
 * @access private (only Admin)
 */

const UpdateAutorById = asynchandler(
    async (req, res) => {
        const {
            error
        } = validateUpdateAutor(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }
        const UpdateAutor = await Autor.findByIdAndUpdate(
            req.params.id, {
                $set: {
                    fistName: req.body.fistName,
                    lastName: req.body.lastName,
                    nationality: req.body.nationality,
                }
            }, {
                new: true
            }
        )
        res.status(200).json(UpdateAutor)
    })

/** *
 * @decs Delete a autor
 * @route /api/techers/:id
 * @method Delete
 * @access private (only Admin)
 */
const DeleteAutorById = asynchandler(async (req, res) => {
    const deleteautor = await Autor.findById(req.params.id)
    if (deleteautor) {
        await Autor.findByIdAndDelete(req.params.id, {
            new: true
        })
        res.status(200).json({
            message: "autor has been delete"
        })
    } else {
        res.status(404).json({
            message: "autor not found "
        })
    }

})

module.exports = {
    getAllAutor,
    getAutorById,
    createNewAutor,
    UpdateAutorById,
    DeleteAutorById
}