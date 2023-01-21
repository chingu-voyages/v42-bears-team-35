// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";
import connection from "../db/connection";
import app from "../app";

const HOME_ROUTE = "/items";
let itemId: string;
const INVALID_UUID = "thisisan-inva-lidu-uidv-aluesoerror";
const NON_EXISTENT_UUID = "12345678-1234-1234-1234-1234567890AB";
let supplierId: string;

describe.skip("Operation on the item route", () => {
  beforeAll(async () => {
    await connection.create();
    await connection.clear();
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

      it("Should return 400 if no tags are provided", async () => {
        const res = await request(app).post(HOME_ROUTE).send({
          description: "a very good product",
          price: 200.0,
          length: 10.0,
          width: 10.0,
          height: 10.0,
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("tags");
        expect(res.body.errorDescription).toBe("tags is required");
      });

      it("Should return 400 if an empty array is provided", async () => {
        const res = await request(app).post(HOME_ROUTE).send({
          description: "a very good product",
          price: 200.0,
          length: 10.0,
          width: 10.0,
          height: 10.0,
          tags: [],
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("tags");
        expect(res.body.errorDescription).toBe("tags are required");
      });
    });
    describe("Expected response with valid data ", () => {
      it("Should return 201 when successfully created data with a non logged in supplier", async () => {
        const res = await request(app)
          .post(HOME_ROUTE)
          .send({
            description: "a very good product",
            price: 200.0,
            length: 10.0,
            width: 10.0,
            height: 20.0,
            tags: ["tag1", "tag2"],
          });

        expect(res.statusCode).toBe(201);
        expect(res.body).not.toHaveProperty("errorKey");
        expect(res.body.data).toHaveProperty("id");
        expect(res.body.data).toHaveProperty("supplier");
        expect(res.body.data.supplier).toBe(null);
        expect(res.body.data).toHaveProperty("description");
        expect(res.body.data).toHaveProperty("price");
        expect(res.body.data).toHaveProperty("length");
        expect(res.body.data).toHaveProperty("width");
        expect(res.body.data).toHaveProperty("height");
      });

      it.skip("Should return 201 when successfully created data is sent with a valid supplier uuid", async () => {
        const res = await request(app).post(HOME_ROUTE).send({
          description: "a very good product",
          price: 200.0,
          length: 10.0,
          width: 10.0,
          height: 20.0,
          supplierId,
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).not.toHaveProperty("errorKey");
        expect(res.body.data).toHaveProperty("id");
        expect(res.body.data).toHaveProperty("supplier");
        // expect(res.body.data.supplier).toHaveProperty();
        expect(res.body.data).toHaveProperty("description");
        expect(res.body.data).toHaveProperty("price");
        expect(res.body.data).toHaveProperty("length");
        expect(res.body.data).toHaveProperty("width");
        expect(res.body.data).toHaveProperty("height");
      });
    });
  });

  describe("Get all the items", () => {
    it("Should return 200 when retreving all the items", async () => {
      const res = await request(app).get(HOME_ROUTE);

      expect(res.statusCode).toBe(200);
      expect(res.body).not.toHaveProperty("errorKey");
      expect(res.body).toHaveProperty("data");
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(typeof res.body.data[0].id).toBe("string");
      itemId = res.body.data[0].id;
    });
  });

  describe.skip("Getting a specific item", () => {
    it("Should return 400 if user sends an invalid uuid", async () => {
      const res = await request(app).get(`${HOME_ROUTE}/${INVALID_UUID}`);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("errorKey");
      expect(res.body).toHaveProperty("errorDescription");
      expect(res.body.errorKey).toBe("uuid");
      expect(res.body.errorDescription).toBe("Uuid provided is invalid");
    });

    it("Should return 404 if there is no item with the given uuid", async () => {
      const res = await request(app).get(`${HOME_ROUTE}/${NON_EXISTENT_UUID}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("errorKey");
      expect(res.body).toHaveProperty("errorDescription");
      expect(res.body.errorKey).toBe("uuid");
      expect(res.body.errorDescription).toBe("Unable to find item");
    });

    it("Should return 200 if there is an item with the given uuid", async () => {
      const res = await request(app).get(`${HOME_ROUTE}/${itemId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.data).toHaveProperty("id");
      // expect(res.body.data).toHaveProperty("supplier");
      expect(res.body.data).toHaveProperty("description");
      expect(res.body.data).toHaveProperty("price");
      expect(res.body.data).toHaveProperty("length");
      expect(res.body.data).toHaveProperty("width");
      expect(res.body.data).toHaveProperty("height");
    });
  });

  describe.skip("Updating the item information", () => {
    it("Should return 400 if there is no item with the given uuid", async () => {
      const res = await request(app).put(`${HOME_ROUTE}/${INVALID_UUID}`);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("errorKey");
      expect(res.body).toHaveProperty("errorDescription");
      expect(res.body.errorKey).toBe("uuid");
      expect(res.body.errorDescription).toBe("Uuid provided is invalid");
    });

    it("Should return 404 if there is no item with that given uuid", async () => {
      const res = await request(app).put(`${HOME_ROUTE}/${NON_EXISTENT_UUID}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("errorKey");
      expect(res.body).toHaveProperty("errorDescription");
      expect(res.body.errorKey).toBe("uuid");
      expect(res.body.errorDescription).toBe("Unable to find item");
    });
  });
});
