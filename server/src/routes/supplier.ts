import { Request, Response, Router } from "express";
import {
  createSupplier,
  getAllSuppliers,
  getOneSupplier,
  updateOneSupplier,
} from "../controller/supplier";
import validateData from "../middleware/dataValidation";
import {
  supplierUpdateValidator,
  supplierCreateValidator,
} from "../validators/supplierValidator";
import { isValidUUID } from "../middleware/validateUUID";
import { isEmailValid } from "../middleware/validateEmail";

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

  if (!isValidUUID(uuid))
    return res.status(400).json({
      errorKey: "uuid",
      errorDescription: "Uuid provided was invalid",
      errorCode: 400,
    });

  const data = await getOneSupplier(uuid);

  if (!data)
    return res.status(404).json({
      errorKey: "uuid",
      errorDescription: "Unable to find supplier",
      errorCode: 404,
    });

  return res.status(200).json({ data });
});

router.put(
  "/:uuid",
  validateData(supplierUpdateValidator),
  async (req: Request, res: Response) => {
    const { uuid } = req.params;

    const supplier = await getOneSupplier(uuid);

    if (!supplier)
      return res.status(404).json({
        errorKey: "uuid",
        errorDescription: "Unable to find supplier",
        errorCode: 404,
      });

    if (!isEmailValid(supplier.email))
      return res.status(400).json({
        errorKey: "uuid",
        errorDescription: "email should be a valid email",
        errorCode: 400,
      });

    const data = await updateOneSupplier(req.body, supplier);

    return res.status(200).json(data);
  },
);

export default router;
