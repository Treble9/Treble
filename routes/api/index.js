import { Router } from "express";

const router = Router();

// import other routes here
import taskRoutes from './taskRoute.js';
import fileRoutes from './fileRoute.js';
import commentRoutes from './commentRoute.js';
import projectRoutes from './projectRoute.js';
import organizationRoutes from './organizationRoute.js';


router.use('/organization/:organizationId/project/:projectId/task/:taskId/file', fileRoutes);
router.use('/organization/:organizationId/project/:projectId/task/:taskId/comment', commentRoutes);
router.use('/organization/:organizationId/project/:projectId/task', taskRoutes);
router.use('/organization/:organizationId/project', projectRoutes);
router.use('/organization', organizationRoutes);



export default router