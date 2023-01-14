import { Router } from "express";
import home from "./home";
import customer from "./customer";
import supplier from "./supplier";

const router: Router = Router();

router.use("/", home);
router.use("/customers", customer);
router.use("/suppliers", supplier);

export default router;
