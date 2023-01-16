// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";
import connection from "../db/connection";
import app from "../app";

const HOME_ROUTE = "/items";
// let itemId: string;
// const INVALID_UUID = "thisisan-inva-lidu-uidv-aluesoerror";
// const NON_EXISTENT_UUID = "12345678-1234-1234-1234-1234567890AB";
// let supplierId: string;

describe("Operation on the item route", () => {
  beforeAll(async () => {
    await connection.create();
  });
  afterAll(async () => {
    await connection.close();
  });

  describe("Creating a new item", () => {
    describe("When the information sent by the supplier is invalid", () => {
      it("Should return 400 if description is not provided", async () => {
        const res = await request(app).post(HOME_ROUTE).send({});

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("description");
        expect(res.body.errorDescription).toBe("description is required");
      });

      it("Should return 400 if a price is not provided", async () => {
        const res = await request(app).post(HOME_ROUTE).send({
          description: "a very good product.",
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("price");
        expect(res.body.errorDescription).toBe("price is required");
      });

      it("Should return 400 if a length is not provided", async () => {
        const res = await request(app).post(HOME_ROUTE).send({
          description: "a very good product",
          price: 200.0,
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("length");
        expect(res.body.errorDescription).toBe("length is required");
      });

      it("Should return 400 if a width is not provided", async () => {
        const res = await request(app).post(HOME_ROUTE).send({
          description: "a very good product",
          price: 200.0,
          length: 10.0,
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("width");
        expect(res.body.errorDescription).toBe("width is required");
      });

      it("Should return 400 if height is not provided", async () => {
        const res = await request(app).post(HOME_ROUTE).send({
          description: "a very good product",
          price: 200.0,
          length: 10.0,
          width: 10.0,
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("height");
        expect(res.body.errorDescription).toBe("height is required");
      });
    });
    describe("Expected response on valid data", () => {
      it("Should return 201 when successfully created data", async () => {
        const res = await request(app).post(HOME_ROUTE).send({
          description: "a very good product",
          price: 200.0,
          length: 10.0,
          width: 10.0,
          height: 20.0,
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).not.toHaveProperty("errorKey");
        expect(res.body.data).toHaveProperty("description");
        expect(res.body.data).toHaveProperty("price");
        expect(res.body.data).toHaveProperty("length");
        expect(res.body.data).toHaveProperty("width");
        expect(res.body.data).toHaveProperty("height");
      });
    });
  });
  describe("Reading data from the item route", () => {});
  describe("Reading a specific item", () => {});
  describe("Updating the item information", () => {});
});
