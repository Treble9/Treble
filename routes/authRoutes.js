import express from 'express'
const Router = express.Router();

import {register_post} from '../controllers/authController.js'


Router.route('/register')
    .post(register_post);


export default Router;