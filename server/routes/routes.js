const express = require('express')
const Router = express.Router()
const verifyGoogleToken = require('../controllers/verifyGoogleController')
const {createAcc, loginUser} = require('../controllers/createAccount')

Router.route('/user/verify-google').post(verifyGoogleToken)
Router.route('/user/create').post(createAcc)
Router.route('/user/login').get(loginUser)
module.exports = Router