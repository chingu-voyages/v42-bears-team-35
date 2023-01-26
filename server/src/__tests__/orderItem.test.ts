import request from "supertest";
import connection from "../db/connection";
import app from "../app";

let validSupplierUUID: string;
let validItemUUID: string;
let validOrderUUID: string;
const itemIdArray: string[] = [];

const INVALID_UUID = "thisisan-inva-lidu-uidv-aluesoerror";
const NON_EXISTENT_UUID = "12345678-1234-1234-1234-1234567890AB";
const HOME_ROUTE = "/orders";

const NUMBER_OF_ITEMS = 2; // Math.floor(Math.random() * 10) + 1;

async function createItems(iteration: number) {
  const newItem = await request(app)
    .post("/items")
    .send({
      name: `Product ${iteration}`,
      supplier: validSupplierUUID,
      price: Math.random() * 1000 + 100,
      length: Math.random() * 100 + 1,
      width: Math.random() * 100 + 1,
      height: Math.random() * 100 + 1,
      tags: ["tag1", "tag2"],
      pictures: [`url1_${iteration}`, `url2_${iteration}`],
    });

  if ("data" in newItem.body && "id" in newItem.body.data)
    itemIdArray.push(newItem.body.data.id);

  if (iteration <= NUMBER_OF_ITEMS) createItems(iteration + 1);
}

describe("Order Items tests", () => {
  beforeAll(async () => {
    await connection.create();
    await connection.clear();

    const supplier = await request(app).post("/suppliers").send({
      name: "supplier 1",
      phone: "12345678",
      address: "my address",
      password: "whatever",
      email: "name@email.com",
    });

    validSupplierUUID = supplier.body.data.id;

    const item = await request(app)
      .post("/items")
      .send({
        name: "a very good product",
        supplier: validSupplierUUID,
        price: 200.78,
        length: 10.0,
        width: 10.0,
        height: 20.0,
        tags: ["tag1", "tag2"],
        pictures: ["url1", "url2"],
      });

    validItemUUID = item.body.data.id;

    await createItems(0);

    const order = await request(app).post("/orders").send({
      date: "2022-01-14",
      email: "a@b.c",
    });

    validOrderUUID = order.body.data.id;
  });

  afterAll(async () => {
    await connection.close();
  });

  describe("Create an order Item", () => {
    describe("Validation errors", () => {
      it("Should return 400 when trying to create an order item with an invalid order uuid", async () => {
        const res = await request(app).post(
          `${HOME_ROUTE}/${INVALID_UUID}/items`,
        );

        expect(res.statusCode).toBe(400);
      });

      it("Should return 404 when trying to create an order item in an unexistent order", async () => {
        const res = await request(app).post(
          `${HOME_ROUTE}/${NON_EXISTENT_UUID}/items`,
        );

        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("uuid");
        expect(res.body.errorDescription).toBe("Unable to find order");
      });

      it("Should return 400 when not sending an item", async () => {
        const res = await request(app).post(
          `${HOME_ROUTE}/${validOrderUUID}/items`,
        );

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("item");
        expect(res.body.errorDescription).toBe("item is required");
      });

      it("Should return 400 when trying to add un invalid item to the order", async () => {
        const res = await request(app)
          .post(`${HOME_ROUTE}/${validOrderUUID}/items`)
          .send({
            item: INVALID_UUID,
          });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("item");
        expect(res.body.errorDescription).toBe("item should be a valid uuid");
      });

      it("Should return 400 when not sending a quantity", async () => {
        const res = await request(app)
          .post(`${HOME_ROUTE}/${validOrderUUID}/items`)
          .send({
            item: validItemUUID,
          });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("quantity");
        expect(res.body.errorDescription).toBe("quantity is required");
      });

      it("Should return 400 when trying to send a non numeric value as quantity", async () => {
        const res = await request(app)
          .post(`${HOME_ROUTE}/${validOrderUUID}/items`)
          .send({
            item: validItemUUID,
            quantity: "not a number",
          });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("quantity");
        expect(res.body.errorDescription).toBe(
          "quantity should be a valid number",
        );
      });

      it("Should return 404 when trying to add an unexistent item to the order", async () => {
        const res = await request(app)
          .post(`${HOME_ROUTE}/${validOrderUUID}/items`)
          .send({
            item: NON_EXISTENT_UUID,
            quantity: 5.6,
          });

        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("item");
        expect(res.body.errorDescription).toBe("Unable to find Item");
      });
    });

    describe("When sending the correct information", () => {
      it("Should return 201 when sending the propper information", async () => {
        const res = await request(app)
          .post(`${HOME_ROUTE}/${validOrderUUID}/items`)
          .send({
            item: validItemUUID,
            quantity: 3,
          });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("data");
        expect(res.body.data.quantity).toBe(3);
        expect(res.body.data.cost).toBe(200.78);

        const resOrder = await request(app).get(
          `${HOME_ROUTE}/${validOrderUUID}`,
        );

        expect(resOrder.status).toBe(200);
        expect(resOrder.body.data.total).toBe(602.34);
      });

      it.skip("Should return 409 when trying to add an item that already exists to the order", async () => {
        const res = await request(app)
          .post(`${HOME_ROUTE}/${validOrderUUID}/items`)
          .send({
            item: validItemUUID,
            quantity: 3,
          });

        expect(res.status).toBe(409);
      });
    });
  });

  describe("Retrieve data from the order items", () => {
    beforeAll(async () => {
      for (let i = 0; i < itemIdArray.length; i += 1) {
        const itemId = itemIdArray[i];
        // eslint-disable-next-line no-await-in-loop
        await request(app)
          .post(`${HOME_ROUTE}/${validOrderUUID}/items`)
          .send({
            item: itemId,
            quantity: Math.floor(Math.random() * 10) + 1,
          });
      }
    });

    it("Should return 400 when sending an invalid order id", async () => {
      const res = await request(app).get(`${HOME_ROUTE}/${INVALID_UUID}/items`);

      expect(res.status).toBe(400);
    });

    it("Should return 404 when sending an non existent order id", async () => {
      const res = await request(app).get(
        `${HOME_ROUTE}/${NON_EXISTENT_UUID}/items`,
      );

      expect(res.status).toBe(404);
    });

    it("Should return 200 when retrieving all the items on the order", async () => {
      const res = await request(app).get(
        `${HOME_ROUTE}/${validOrderUUID}/items`,
      );

      expect(res.status).toBe(200);
    });
  });
});
