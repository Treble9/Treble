import { Router } from "express";
const router = Router();

import apiRoutes from './api/index.js'

router.use(
    // ,
    apiRoutes
)
router.use((req, res) => res.status(404).json({error: 'No API route found'}));


export default router