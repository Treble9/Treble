import { Router } from "express";

const router = Router();

// import other routes here
import taskRoutes from './taskRoute.js';
import fileRoutes from './fileRoute.js';
import commentRoutes from './commentRoute.js';
import projectRoutes from './projectRoute.js';

router.use('/task', taskRoutes);
router.use('/file', fileRoutes);
router.use('/comment', commentRoutes);
router.use('/project', projectRoutes);



export default router