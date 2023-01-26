import { Request, Response, Router } from "express";

import { createComment, getAllComments } from "../controller/comment";
// import { validateUUID } from "../middleware/validateUUID";

const router: Router = Router();

router.post("/:itemId/:customerId", async (req: Request, res: Response) => {
  const { itemId, customerId } = req.params;
  const data = await createComment({ ...req.body, itemId, customerId });

  if ("errorCode" in data) return res.status(data.errorCode).json(data);

  return res.status(201).json(data);
});

router.get("/", async (req: Request, res: Response) => {
  const data = await getAllComments();

  return res.status(200).json({ data });
});

export default router;
