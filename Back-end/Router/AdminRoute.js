const express = require('express');
const Router = express.Router();
const {getallusers , UpdateUser , getuserdata , getQuery , delQuery} = require('../Controller/AdminController');



Router.route('/admin/getallusers').get(getallusers).put(UpdateUser);
Router.route('/admin/getuserdata').post(getuserdata);
Router.route('/admin/getquery').get(getQuery);
Router.route('/admin/getquery/:id').delete(delQuery);
module.exports = Router