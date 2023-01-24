import request from "supertest";
import connection from "../db/connection";
import app from "../app";

let validSupplierUUID: string;
let validItemUUID: string;
let validOrderUUID: string;

const INVALID_UUID = "thisisan-inva-lidu-uidv-aluesoerror";
const NON_EXISTENT_UUID = "12345678-1234-1234-1234-1234567890AB";
const HOME_ROUTE = "/orders";

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
        price: 200.0,
        length: 10.0,
        width: 10.0,
        height: 20.0,
        tags: ["tag1", "tag2"],
        pictures: ["url1", "url2"],
      });

    validItemUUID = item.body.data.id;

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
      it.todo("Should return 201 when sending the propper information");
      it.todo(
        "Should return 409 when trying to add an item that already exists to the order",
      );
    });
  });
});
