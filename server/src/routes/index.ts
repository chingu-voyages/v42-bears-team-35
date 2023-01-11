import { Router } from "express";
import home from "./home";

const router: Router = Router();

router.use("/", home);

export default router;
