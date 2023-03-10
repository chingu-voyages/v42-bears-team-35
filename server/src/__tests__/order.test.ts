import request from "supertest";
import connection from "../db/connection";
import app from "../app";

const HOME_ROUTE = "/orders";
let validOrderId: string;
const INVALID_UUID = "thisisan-inva-lidu-uidv-aluesoerror";
const NON_EXISTENT_UUID = "12345678-1234-1234-1234-1234567890AB";

// TODO add a login method

describe("Order route tests", () => {
  beforeAll(async () => {
    await connection.create();
    await connection.clear();
  });

  afterAll(async () => {
    await connection.close();
  });

  describe("Add a new order", () => {
    describe("When the information sent by the user is not valid", () => {
      it("Should return 400 if the user doesn't send a date", async () => {
        const res = await request(app).post(HOME_ROUTE).send({});

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("date");
        expect(res.body.errorDescription).toBe("date is required");
      });

      it("Should return 400 if the user sends an invalid date", async () => {
        let res = await request(app).post(HOME_ROUTE).send({
          date: "2023-01-45",
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("date");
        expect(res.body.errorDescription).toBe("date is not a valid date");

        res = await request(app).post(HOME_ROUTE).send({
          date: "20230130",
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("date");
        expect(res.body.errorDescription).toBe("date is not a valid date");

        res = await request(app).post(HOME_ROUTE).send({
          date: "2023-30-01",
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("date");
        expect(res.body.errorDescription).toBe("date is not a valid date");
      });

      it("Should return 400 if the user is not logged in or provide an email", async () => {
        const res = await request(app).post(HOME_ROUTE).send({
          date: "2023-01-30",
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("email");
        expect(res.body.errorDescription).toBe("email is required");
      });

      it("Should return 400 if the user sends an ivalid email", async () => {
        const res = await request(app).post(HOME_ROUTE).send({
          date: "2023-01-30",
          email: "a",
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("email");
        expect(res.body.errorDescription).toBe("email should be a valid email");
      });
    });

    describe("When the informations ent by the user is valid", () => {
      it("Should return 201 when the order is succesfully created with a non logged in user", async () => {
        const res = await request(app).post(HOME_ROUTE).send({
          date: "2022-01-14",
          email: "a@b.c",
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.data).toHaveProperty("id");
        expect(res.body.data).toHaveProperty("date");
        expect(res.body.data).toHaveProperty("email");
        expect(res.body.data).toHaveProperty("total");
        expect(res.body.data).toHaveProperty("customer");
        expect(res.body.data.customer).toBe(null);
        expect(res.body.data.total).toBe(0);
        expect(res.body.data.email).toBe("a@b.c");
      });
      it.todo(
        "Should return 201 when the order is succesfully created with a logged in user",
      );
    });
  });

  describe("Get the orders", () => {
    it("Should return 200 when retrieving all of the orders", async () => {
      const res = await request(app).get(HOME_ROUTE);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(typeof res.body.data[0].id).toBe("string");
      validOrderId = res.body.data[0].id;
    });

    describe("When retreiving a specifc order", () => {
      it("Should return 400 if the user sends an invalid uuid", async () => {
        const res = await request(app).get(`${HOME_ROUTE}/${INVALID_UUID}`);

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("uuid");
        expect(res.body.errorDescription).toBe("Uuid provided is invalid");
      });

      it("Should return 404 if there is no order with that specific uuid", async () => {
        const res = await request(app).get(
          `${HOME_ROUTE}/${NON_EXISTENT_UUID}`,
        );

        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("uuid");
        expect(res.body.errorDescription).toBe("Unable to find order");
      });

      it("Should return 200 if there is an order with that specific uuid", async () => {
        const res = await request(app).get(`${HOME_ROUTE}/${validOrderId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.data).toHaveProperty("id");
        expect(res.body.data).toHaveProperty("date");
        expect(res.body.data).toHaveProperty("email");
        expect(res.body.data).toHaveProperty("total");
      });
    });
  });

  describe("Update the orders", () => {
    it("Should return 400 if the user sends an invalid uuid", async () => {
      const res = await request(app).put(`${HOME_ROUTE}/${INVALID_UUID}`);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("errorKey");
      expect(res.body).toHaveProperty("errorDescription");
      expect(res.body.errorKey).toBe("uuid");
      expect(res.body.errorDescription).toBe("Uuid provided is invalid");
    });

    it("Should return 404 if there is no order with that specific uuid", async () => {
      const res = await request(app).put(`${HOME_ROUTE}/${NON_EXISTENT_UUID}`);

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("errorKey");
      expect(res.body).toHaveProperty("errorDescription");
      expect(res.body.errorKey).toBe("uuid");
      expect(res.body.errorDescription).toBe("Unable to find order");
    });

    it("Should not be able to update the order date", async () => {
      const res = await request(app).put(`${HOME_ROUTE}/${validOrderId}`).send({
        date: "2023-04-23",
      });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data.id).toBe(validOrderId);
      expect(res.body.data.date.toLocaleString("en-us")).toBe("2022-01-13");
    });

    it("Should not be able to update the order total", async () => {
      const res = await request(app).put(`${HOME_ROUTE}/${validOrderId}`).send({
        total: 200,
      });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data.total).toBe(0);
    });
    it("Can modify the tracking number", async () => {
      const res = await request(app).put(`${HOME_ROUTE}/${validOrderId}`).send({
        tracking: "updated1234",
      });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data.tracking).toBe("updated1234");
    });
  });
});
