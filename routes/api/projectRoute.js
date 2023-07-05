import { Router } from "express";
// import authorizer from '../../middlewares/authorizer.js';
import { getProjects } from "../../controllers/projectControllers.js";


const router = Router();

router.post('/projects',
//  authorizer, 
 getProjects);


export default router;