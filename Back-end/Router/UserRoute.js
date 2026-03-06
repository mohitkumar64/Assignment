const express = require('express')
const Router = express.Router();
const {UpdateUser , getQuery , postQuery , uploadImage} = require('../Controller/userController');
const auth = require('../middleware/auth')
const upload = require('../middleware/upload');

Router.route('/updateUser').get((req ,res)=>{
res.send('hello')
});
Router.route('/updateUser').put(auth ,UpdateUser);
Router.route('/query').get( auth , getQuery).post(auth ,postQuery)
Router.route('/uploadimage').put(auth , upload.single('image') , uploadImage);

module.exports = Router