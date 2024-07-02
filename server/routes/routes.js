const express = require('express')
const Router = express.Router()
const verifyToken = require('../controllers/verifyController')

Router.route('/user/verify').post(verifyToken)

module.exports = Router