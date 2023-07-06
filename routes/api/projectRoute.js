import { Router } from "express";
const router = Router();
import { restrictTo } from "../../middlewares/permissions_project.js";
import { ROLES } from "../../utils/constant.js";
import {
    createProject,
    deleteProjects,
    getProjectDetails,
    getProjects,
    updateProject
} from "../../controllers/projectControllers.js";


router.post('/create', restrictTo(), getProjects);
router.put('/edit', restrictTo(ROLES.PROJECT_MANAGER), getProjects)
router.post('/delete', restrictTo(), getProjects);


router.get('/projects',
    //  permissions, 
    getProjects);

router.post(
    '/projects',
    //permissions, 
    createProject
);

router.get(
    '/projects/:id',
    //premissions,
    getProjectDetails
)

router.patch(
    '/projects/:id',
    //permissions, 
    updateProject
);

router.delete(
    '/projects/:id',
    //permissions, 
    deleteProjects
)

export default router;