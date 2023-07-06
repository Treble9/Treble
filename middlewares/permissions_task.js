import User from "../models/USER.js";
import Project from "../models/PROJECT.js";
import { ROLES } from "../utils/constant.js";
import Task from "../models/TASK.js";

// Can edit the Task.
 const canUpdate = (...roles) => {
    return async (req, res, next) => {
        const user = req.user;
        if (user.role == ROLES.ADMIN || user.role == ROLES.PROJECT_MANAGER) next();
        const canEdit = await Task.getEditors(taskId);

        res.status(403).json({ error: "You are not authorized to edit this Project" })
    }
}

export default canUpdate;