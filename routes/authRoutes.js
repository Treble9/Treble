import express from 'express'
const Router = express.Router();

import {register_post} from '../controller/authController.js'


Router.route('/register')
    .post(register_post);


export default Router;