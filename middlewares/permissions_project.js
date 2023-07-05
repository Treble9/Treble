import User from "../models/USER.js";
import Project from "../models/PROJECT.js";
import { ROLES } from "../utils/constant.js";


// Can see the Project
export const ensureTeamMember = async (req, res, next) => {
    try {
        const permittedTeams = await getPermittedTeams();
        const userTeams = await getUserTeams(req.user);


        const isMember = userTeams.some((team) => permittedTeams.includes(team));

        if (isMember) {
            next();
        } else {
            res.status(403).json({ error: `Only people in ${teams} can access this resource` });
        }

    } catch (error) {
        console.log(error);

    }
};

export const restrictTo = (...roles) => {
    return async (req, res, next) => {
        const user = req.user;
        if (user.role === ROLES.ADMIN) {
            next();
        }
        const hasRoles = roles.includes(user.role);
        if (hasRoles) {
            next();
        } else {
            res.status(403).json({ error: "You are not authorized to create a Project" });
        }
    };
};