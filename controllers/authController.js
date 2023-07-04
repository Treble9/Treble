export const register_post = async (req, res) => {
    try {

        req.login()
    } catch (error) {

        res.status().json({})
    }

}

export const login_post = async (req, res) => {
    try {

    } catch (error) {

        res.status.json({})
    }
}
