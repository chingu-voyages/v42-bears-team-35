import request from "supertest";
import connection from "../db/connection";
import app from "../app";

const HOME_ROUTE = "/customers";

describe("Operations on the customer route", () => {
  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.close();
  });

  describe("Creating a new customer", () => {
    describe("Should return error on invalid data", () => {
      it("Should return 400 if no name is sent to the route", async () => {
        const res = await request(app).post(HOME_ROUTE).send({});

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("name");
        expect(res.body.errorDescription).toBe("name is required");
      });

      it("Should return 400 if no phone is sent to the route", async () => {
        const res = await request(app).post(HOME_ROUTE).send({
          name: "new customer",
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("phone");
        expect(res.body.errorDescription).toBe("phone is required");
      });

      it("Should return 400 if no address is sent to the route", async () => {
        const res = await request(app).post(HOME_ROUTE).send({
          name: "new customer",
          phone: "123456",
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("address");
        expect(res.body.errorDescription).toBe("address is required");
      });

      it("Should return 400 if no password is sent to the route", async () => {
        const res = await request(app).post(HOME_ROUTE).send({
          name: "new customer",
          phone: "123456",
          address: "address",
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("password");
        expect(res.body.errorDescription).toBe("password is required");
      });

      it("Should return 400 if no email is sent to the route", async () => {
        const res = await request(app).post(HOME_ROUTE).send({
          name: "new customer",
          phone: "123456",
          address: "address",
          password: "password",
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("email");
        expect(res.body.errorDescription).toBe("email is required");
      });

      it("Should return 400 if an invalid email is sent to the route", async () => {
        const res = await request(app).post(HOME_ROUTE).send({
          name: "new customer",
          phone: "123456",
          address: "address",
          password: "password",
          email: "a",
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("email");
        expect(res.body.errorDescription).toBe("email should be a valid email");
      });
    });

    describe("Should return success on valid data", () => {
      it("Should return 201 if all data is valid", async () => {
        await connection.clear();
        const res = await request(app).post(HOME_ROUTE).send({
          name: "customer 1",
          phone: "12345678",
          address: "my address",
          password: "whatever",
          email: "name@email.com",
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).not.toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("data");
        expect(res.body.data).not.toHaveProperty("password");
        expect(res.body.data).toHaveProperty("id");
        expect(res.body.data.name).toBe("customer 1");
      });

      it("Should return 409 if a customer with the same name exists", async () => {
        const res = await request(app).post(HOME_ROUTE).send({
          name: "customer 1",
          phone: "12345678",
          address: "my address",
          password: "whatever",
          email: "c@email.com",
        });
        expect(res.statusCode).toBe(409);
        expect(res.body).toHaveProperty("errorKey");
      });

      it.todo("Should return 409 if a customer with the same email exists");
    });
  });
});
