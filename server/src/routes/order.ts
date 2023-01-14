import { Request, Response, Router } from "express";
import validateData from "../middleware/dataValidation";
import { orderCreateValidator } from "../validators";

const router: Router = Router();

router.post(
  "/",
  validateData(orderCreateValidator),
  (req: Request, res: Response) => {
    return res.sendStatus(204);
  },
);

export default router;
