import { Router } from "express";
const router = Router();
import { getProjects } from "../../controllers/projectControllers.js";
import { restrictTo } from "../../middlewares/permissions_project.js";
import { ROLES } from "../../utils/constant.js";


router.post('/create', restrictTo(), getProjects);
router.put('/edit', restrictTo(ROLES.PROJECT_MANAGER), getProjects)
router.post('/delete', restrictTo(), getProjects);

export default router;
restrictTo