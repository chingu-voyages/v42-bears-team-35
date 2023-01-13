import { Request, Response, Router } from "express";
import {
  createCustomer,
  getAllCustomers,
  getOneCustomer,
  updateOneCustomer,
} from "../controller/customer";
import validateData from "../middleware/dataValidation";
import {
  customerCreateValidator,
  customerUpdateValidator,
} from "../validators";
import { validateUUID } from "../middleware/validateUUID";

const router: Router = Router();

router.post(
  "/",
  validateData(customerCreateValidator),
  async (req: Request, res: Response) => {
    const data = await createCustomer(req.body);

    if ("errorCode" in data) return res.status(data.errorCode).json(data);

    return res.status(201).json(data);
  },
);

router.get("/", async (req: Request, res: Response) => {
  const data = await getAllCustomers();

  return res.status(200).json({ data });
});

router.get("/:uuid", validateUUID, async (req: Request, res: Response) => {
  const { uuid } = req.params;

  const data = await getOneCustomer(uuid);

  if (data === null)
    return res.status(404).json({
      errorKey: "uuid",
      errorDescription: "Unable to find customer",
    });

  return res.status(200).json({ data });
});

router.put(
  "/:uuid",
  validateUUID,
  validateData(customerUpdateValidator),
  async (req: Request, res: Response) => {
    const { uuid } = req.params;

    const data = await getOneCustomer(uuid);

    if (data === null)
      return res.status(404).json({
        errorKey: "uuid",
        errorDescription: "Unable to find customer",
      });

    const updatedData = await updateOneCustomer(req.body, data);

    if ("errorCode" in updatedData)
      return res.status(updatedData.errorCode).json({ data: updatedData });

    return res.status(200).json(updatedData);
  },
);

export default router;
