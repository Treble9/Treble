import errorHandler from "../middlewares/errorHandler.js";
import User from "../models/USER.js";
import passport from "passport";

export const register_post = async (req, res, next) => {
    const { email, password } = req.body;
    if (password.length >= 8) {
        try {
            const newUser = await User.CreateAccount(email, password);
            if (newUser) {
                // setting up passport serializer
                req.login(newUser, (err) => {
                    console.log('we in');
                    if (err) {
                        console.error(err);
                        console.log('but theres a problem');
                        return next(err);
                    }
                });
                res.status(201).json({ success: { message: "Account created succesfully!", data: newUser } })
            }
        } catch (error) {
            console.log(error);
            const cleanedError = errorHandler(error);
            res.status(400).json(error)
        }
    } else {
        res.status(400).json({ error: { message: 'Password length is too short!' } })
    }
}

export const logout_post = async (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        console.log('nigga just logged out');
        // what's the appropriate code for loggin out?
        res.status(200).json({ success: { message: "Logged out successfully" } })
    });
}

export const local_scope = (req, res, next) => {
    passport.authenticate('local')(req, res, next);
};
