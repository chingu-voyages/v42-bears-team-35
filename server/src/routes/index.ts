import { Router } from "express";
import home from "./home";
import customer from "./customer";
import supplier from "./supplier";
import order from "./order";
import item from "./item";
import login from "./login";

const router: Router = Router();

router.use("/", home);
router.use("/items", item);
router.use("/customers", customer);
router.use("/suppliers", supplier);
router.use("/orders", order);
router.use("/login", login);

export default router;
