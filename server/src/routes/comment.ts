import { Request, Response, Router } from "express";

import { createComment, getAllComments } from "../controller/comment";
import validateData from "../middleware/dataValidation";
// import { validateUUID } from "../middleware/validateUUID";
import commentValidator from "../validators/commentValidator";

const router: Router = Router();

router.post(
  "/",
  validateData(commentValidator),
  async (req: Request, res: Response) => {
    const data = await createComment(req.body);

    if ("errorCode" in data) return res.status(data.errorCode).json(data);

    return res.status(201).json(data);
  },
);

router.get("/", async (req: Request, res: Response) => {
  const data = await getAllComments();

  return res.status(200).json({ data });
});

export default router;
