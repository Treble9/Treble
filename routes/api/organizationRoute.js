import { Router } from "express";
import {
    registerCompany,
    updateCompanyDetails
} from "../../controllers/organizationControllers.js";
const router = Router();

router.post('/create', registerCompany);
router.put('/edit', updateCompanyDetails);
router.delete('/delete', updateCompanyDetails);


export default router;