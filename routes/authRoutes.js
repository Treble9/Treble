import express from 'express'
const Router = express.Router();
import { local_scope, logout_post, register_post } from '../controllers/authController.js';



Router.route('/register')
    .post(register_post);

Router.route('/login')
    .post(local_scope);

Router.route('/logout')
    .post(logout_post);


export default Router;