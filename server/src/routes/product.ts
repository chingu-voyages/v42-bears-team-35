import { Router, Request, Response } from "express";
import validateData from "../middleware/dataValidation";
import { productCreateValidator } from "../validators";
import { createNewProduct } from "../controller/product";
import { getOneSupplier } from "../controller/supplier";

const router: Router = Router();

router.post(
  "/",
  validateData(productCreateValidator),
  // eslint-disable-next-line consistent-return
  async (req: Request, res: Response) => {
    const supplier = await getOneSupplier(req.body.supplier);

    if (!supplier)
      return res.status(404).json({
        errorKey: "supplier",
        errorDescription: "no supplier with that id",
      });

    const createdProduct = await createNewProduct(req.body, supplier);

    if ("errorKey" in createdProduct)
      return res.status(createdProduct.errorCode).json(createdProduct);

    res.status(201).json(createdProduct);
  },
);

export default router;
