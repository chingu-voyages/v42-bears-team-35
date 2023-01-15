import { Request, Response, Router } from "express";
import {
  itemCreateValidator,
  itemUpdateValidator,
} from "../validators/ItemValidators";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {});
router.get("/", () => {});
router.get("/:uuid", () => {});
router.put("/:uuid", () => {});

export default router;
