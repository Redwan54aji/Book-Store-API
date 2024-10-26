const express = require('express');
const {
    getForgotPasswordViews,
    sendForgotPasswordLink,
    resetThePassword,
    getResetPasswordViwe
} = require('../controllers/controllerspasswrd');
const router = express.Router();
router.route('/forgot-password').get(getForgotPasswordViews).post(sendForgotPasswordLink)
router.route('/reset-password/:userId/:token').get(getResetPasswordViwe).post(resetThePassword)
module.exports = router;