const express = require('express')
const Router = express.Router()
const verifyGoogleToken = require('../controllers/verifyGoogleController')

Router.route('/user/verify-google').post(verifyGoogleToken)

module.exports = Router