const express = require('express');
const Router = express.Router();
const verifyGoogleToken = require('../controllers/verifyGoogleController');
const {createAcc, loginUser} = require('../controllers/createAccount');
const { chatController } = require('../controllers/chatController');
const { userHistory, selectSingleChat, deleteHistory } = require('../controllers/controllers');


Router.route('/user/verify-google').post(verifyGoogleToken);
Router.route('/user/create').post(createAcc);
Router.route('/user/login').post(loginUser);
Router.route('/chat/v2.5/nayveechat').post(chatController);
Router.route('/chat/v2.5/user/history').post(userHistory);
Router.route('/chat/v2.5/nayveechat/:chatId').get(selectSingleChat).delete(deleteHistory)
module.exports = Router