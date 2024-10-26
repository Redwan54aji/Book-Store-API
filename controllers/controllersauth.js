const asynchandler = require('express-async-handler')
const {
    User,
    validateLoginUser,
    validateRegisterUser
} = require("../Model/User")
const bcrypt = require("bcryptjs")
/** *
 * @decs Register New User
 * @route /api/auth/register
 * @method Post
 * @access public
 */
module.exports.registerUser = asynchandler(async (req, res) => {
    const {
        error
    } = validateRegisterUser(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }
    let user = await User.findOne({
        email: req.body.email
    })
    if (user) {
        return res.status(400).json({
            message: "this user alrady registered"
        })
    }
    const salt = await bcrypt.genSalt(10)
    req.body.password = await bcrypt.hash(req.body.password, salt)

    const auth = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    });
    const result = await auth.save();
    const token = user.generateToken()

    const {
        password,
        ...other
    } = result._doc;
    res.status(201).json({
        ...other,
        token
    });


})

/** *
 * @decs Login  User
 * @route /api/auth/longin
 * @method Post
 * @access public
 */
module.exports.loginUser = asynchandler(async (req, res) => {
    const {
        error
    } = validateLoginUser(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }
    let user = await User.findOne({
        email: req.body.email
    })
    if (!user) {
        return res.status(400).json({
            message: "invalid email or password"
        })
    }
    //فحص إذا كان الباسود صحيح
    const isMathPassword = await bcrypt.compare(req.body.password, user.password)
    if (!isMathPassword) {
        return res.status(400).json({
            message: "invalid email or password"
        })
    }

    const token = user.generateToken()
    const {
        password,
        ...other
    } = user._doc;
    res.status(201).json({
        ...other,
        token
    });

})

