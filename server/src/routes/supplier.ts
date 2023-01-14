import { Request, Response, Router } from "express";
import {
  createSupplier,
  getAllSuppliers,
  getOneSupplier,
  updateOneSupplier,
} from "../controller/supplier";
import validateData from "../middleware/dataValidation";
import { supplierCreateValidator } from "../validators";

const router: Router = Router();

router.post(
  "/",
  validateData(supplierCreateValidator),
  async (req: Request, res: Response) => {
    const data = await createSupplier(req.body);

    if ("errorCode" in data) return res.status(data.errorCode).json(data);

    return res.status(201).json(data);
  },
);

router.get("/", async (req: Request, res: Response) => {
  const data = await getAllSuppliers();

  return res.status(200).json({ data });
});

router.get("/:uuid", async (req: Request, res: Response) => {
  const { uuid } = req.params;
  const data = await getOneSupplier(uuid);

  return res.status(200).json({ data });
});

router.put("/:uuid", async (req: Request, res: Response) => {
  const { uuid } = req.params;

  const supplier = await getOneSupplier(uuid);

  if (!supplier)
    return res.status(404).json({
      errorKey: "uuid",
      errorDescription: "Unable to find supplier",
      errorCode: 404,
    });

  const data = await updateOneSupplier(req.body, supplier);

  return res.status(200).json(data);
});

export default router;
