import User from "../models/USER";
import Project from "../models/PROJECT";
import { ROLES } from "../utils/constant";

export const ensureEmployee = async (req, res, next) => {
    try {
        const isEmployee = await User.isOrganizationEmployee(organizationId);
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

// 
export const canCreate = async (...roles) => {
    return async (req, res, next) => {
        const user = req.user;
        if (user.role == ROLES.ADMIN) next();
        try {
            const canAccess = await Project.findById(projectId, leads);
            const isLead = canAccess.includes(user._id);
            if (isLead) next()
        } catch (error) {
            res.status(403).json({ error: "You are not authorized to create a Project" })
        }
    }
}


export const canDelete = async (...roles) => {
    return async (req, res, next) => {
        const user = req.user;
        if (user.role == ROLES.ADMIN) next();
        try {
            const canAccess = await Project.findById(projectId, leads);
            const isLead = canAccess.includes(user._id);
            if (isLead) next()
        } catch (error) {
            res.status(403).json({ error: "You are not authorized to create a Project" })
        }
    }
}


// Can edit the Task.
export const canUpdate = (...roles) => {
    return (req, res, next) => {
        const user = req.user;
        if (user.role == ROLES.ADMIN || user.role == ROLES.PROJECT_MANAGER) next();
        res.status(403).json({ error: "You are not authorized to edit this Project" })
    }
}


//