import { Router } from "express";
import home from "./home";
import customer from "./customer";

const router: Router = Router();

router.use("/", home);
router.use("/customers", customer);

export default router;
