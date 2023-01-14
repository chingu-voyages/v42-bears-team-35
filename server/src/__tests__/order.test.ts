import request from "supertest";
import connection from "../db/connection";
import app from "../app";

const HOME_ROUTE = "/orders";
const INVALID_UUID = "thisisan-inva-lidu-uidv-aluesoerror";
const NON_EXISTENT_UUID = "12345678-1234-1234-1234-1234567890AB";

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

      it.todo("Should return 400 if the user sends an ivalid email");
    });

    describe("When the informations ent by the user is valid", () => {
      it.todo(
        "Should return 201 when the order is succesfully created with a non logged in user",
      );
      it.todo(
        "Should return 201 when the order is succesfully created with a logged in user",
      );
    });
  });

  describe("Get the orders", () => {
    it.todo("Should return 200 when retrieving all of the orders");

    describe("When retreiving a specifc order", () => {
      it.todo("Should return 400 if the user sends an invalid uuid");
      it.todo("Should return 404 if there is no order with that specific uuid");
      it.todo("Should return 200 if there is an order with that specific uuid");
    });
  });

  describe("Update the orders", () => {
    it.todo("Should not be able to update the order date");
    it.todo("Should not be able to update the order total");
    it.todo("Can modify the tracking number");
  });
});