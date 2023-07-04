import User from "../models/USER.js";

export const register_post = async (req, res) => {
    const { email, password } = req.body;
    if (password.length > 8) {
        try {
User.Create

            req.login()
        } catch (error) {

            res.status().json({})
        }
    } else{
        res.status(400).json({error: 'Password length is too short!'})
    }

}

export const login_post = async (req, res) => {
    try {

    } catch (error) {

        res.status.json({})
    }
}
