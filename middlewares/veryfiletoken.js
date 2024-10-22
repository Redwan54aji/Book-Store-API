const jwt = require('jsonwebtoken')
// veryfile token
function verifyToken(req, res, next) {
    const token = req.headers.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.KEY);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({
                message: "Invalid token"
            });
        }
    } else {
        res.status(401).json({
            message: "No token provided"
        });
    }
}

// veryfile token & authorize the user
function verifyTokenAndAuthorization(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({
                message: "You are not allowed"
            });
        }
    })
}
// veryfile token & Admin 
function verifyTokenAndAdmin(req, res, next) {
    verifyToken(req, res, () => {
                if (req.user.isAdmin) {
                    next();
                } else {
                    res.status(403).json({
                        message: "You are not allowed, only admin allowed"
                    });
                }})}
module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
}
