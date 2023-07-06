import { Router } from "express";
import { ensureLoggedIn } from "../middlewares/authenticate.js";
const router = Router();

import apiRoutes from './api/index.js'

router.use(
    ensureLoggedIn(), //authenticate
    apiRoutes);

router.use((req, res) => res.status(404).json({ status: "error", message: "This route is not yet defined" }));


export default router