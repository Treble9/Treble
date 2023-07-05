import User from "../models/USER";
import Project from "../models/PROJECT";
import { ROLES } from "../utils/constant";
import Task from "../models/TASK";

// Can edit the Task.
export const canUpdate = async (...roles) => {
    return async (req, res, next) => {
        const user = req.user;
        if (user.role == ROLES.ADMIN || user.role == ROLES.PROJECT_MANAGER) next();
        const canEdit = await Task.getEditors(taskId);

        res.status(403).json({ error: "You are not authorized to edit this Project" })
    }
}


//