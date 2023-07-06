import User from "../models/USER.js";


export const ensureEmployee = async (req, res, next) => {
    const userId = req.user._id;
    try {
        const isEmployee = await User.isOrganizationEmployee(userId, organizationId);
        if (isEmployee) {
            next();
        }
        res.status(403).json({
            error: `You've not been added as an Employee of this Organization`
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Something funny must have happened` });
    }
}