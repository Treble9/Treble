import express from 'express'
const Router = express.Router();
import { local_scope, logout_post, register_post } from '../controllers/authController.js';
import { ensureLoggedIn, ensureLoggedOut } from '../middlewares/authenticate.js';

Router.route('/register')
    .post(
        ensureLoggedOut(),
        register_post);

Router.route('/login')
    .post(
        ensureLoggedOut(),
        local_scope, (req, res) => {
            res.status(200).json({ status: "Success", message: "Logged In Successfully" });
        });

Router.route('/logout')
    .post(
        ensureLoggedIn(),
        logout_post);


export default Router;