import { Router } from "express";
import { createTask, 
    deleteTask,
    getTaskDetails,
    getTasks, 
    updateTask } from "../../controllers/taskControllers.js";
    import permissions from '../../middlewares/permissions_task.js';


const router = Router();

router.get('/projects/{projectId}/tasks',
    //  permissions, 
    getTasks);

router.post(
    '/projects/{projectId}/tasks',
    //permissions, 
    createTask
);

router.get(
    '/projects/{projectId}/tasks/:id',
    //premissions,
    getTaskDetails
)

router.patch(
    '/projects/{projectId}/tasks/:id',
    //permissions, 
    updateTask
);

router.delete(
    '/projects/{projectId}/tasks/:id',
    //permissions, 
    deleteTask
)

export default router;