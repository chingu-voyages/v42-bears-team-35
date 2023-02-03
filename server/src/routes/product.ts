import { Router, Request, Response } from "express";
import { validateUUID } from "../middleware/validateUUID";
import validateData from "../middleware/dataValidation";
import {
  productCreateValidator,
  productRatingValidator,
  productCommentValidator,
} from "../validators";
import {
  addComment,
  addRating,
  createNewProduct,
  getAllProducts,
  getOneProduct,
} from "../controller/product";
import { getOneSupplier } from "../controller/supplier";
import { formatManyItems, formatOneItem } from "../formatting/formatItems";
import { validateTokenMiddleware } from "../middleware/authMiddleWare";
import { Item } from "../model";

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

    return res.status(201).json(createdProduct);
  },
);

router.get("/", async (req: Request, res: Response) => {
  const products = await getAllProducts();

  const queriedProducts = formatManyItems(products);

  return res.status(200).json({ data: queriedProducts });
});

router.get("/:uuid", validateUUID, async (req: Request, res: Response) => {
  const product = await getOneProduct(req.params.uuid);

  if (!product)
    return res.status(404).json({
      errorKey: "uuid",
      errorCode: 404,
      errorDescription: "No product with that uuid",
    });

  const formatedProduct = formatOneItem(product);
  return res.status(200).json({ data: formatedProduct });
});

router.post(
  "/:uuid/ratings",
  validateUUID,
  validateTokenMiddleware,
  validateData(productRatingValidator),
  async (req: Request, res: Response) => {
    const { uuid } = req.params;

    const product = await getOneProduct(uuid);

    if (product === null)
      return res.status(404).json({
        errorCode: 404,
        errorKey: "uuid",
        errorDescription: "No product found with that id",
      });

    const data = await addRating(
      product,
      res.locals.customer,
      parseInt(req.body.rating, 10),
    );

    if ("errorKey" in data) return res.status(data.errorCode).json(data);

    const formatedResponse = formatOneItem(data.data as Item);

    return res.status(200).json({ data: formatedResponse });
  },
);

router.post(
  "/:uuid/comments",
  validateUUID,
  validateTokenMiddleware,
  validateData(productCommentValidator),
  async (req: Request, res: Response) => {
    const { uuid } = req.params;

    const product = await getOneProduct(uuid);

    if (product === null)
      return res.status(404).json({
        errorCode: 404,
        errorKey: "uuid",
        errorDescription: "No product found with that id",
      });

    const data = await addComment(
      product,
      res.locals.customer,
      req.body.comment,
    );

    if ("errorKey" in data) return res.status(data.errorCode).json(data);

    const formatedResponse = formatOneItem(data.data as Item);

    return res.status(200).json({ data: formatedResponse });
  },
);

export default router;
