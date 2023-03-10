import request from "supertest";
import connection from "../db/connection";
import app from "../app";

const HOME_ROUTE = "/customers";
let validCustomerId: string;
const INVALID_UUID = "thisisan-inva-lidu-uidv-aluesoerror";
const NON_EXISTENT_UUID = "12345678-1234-1234-1234-1234567890AB";

describe("Operations on the customer route", () => {
  beforeAll(async () => {
    await connection.create();
    await connection.clear();
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

      it("Should return 400 if the password is to short", async () => {
        const res = await request(app).post(HOME_ROUTE).send({
          name: "new customer",
          phone: "123456",
          address: "address",
          password: "aaa",
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("password");
        expect(res.body.errorDescription).toBe("password is to short");
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

    describe("Expected responses on valid data", () => {
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

      it("Should return 409 if a customer with the same email exists", async () => {
        const res = await request(app).post(HOME_ROUTE).send({
          name: "customer 2",
          phone: "12345678",
          address: "my address",
          password: "whatever",
          email: "name@email.com",
        });

        expect(res.statusCode).toBe(409);
        expect(res.body).toHaveProperty("errorKey");
      });
    });
  });

  describe("Reading data from customer route", () => {
    it("Should return 200 and an array when retrieving all the customers", async () => {
      const res = await request(app).get(HOME_ROUTE);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBe(1);
      validCustomerId = res.body.data[0].id;
    });

    describe("Getting a specific customer", () => {
      it("Should return 400 if the user passes an invalid id", async () => {
        const res = await request(app).get(`${HOME_ROUTE}/${INVALID_UUID}`);

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("uuid");
        expect(res.body.errorDescription).toBe("Uuid provided is invalid");
      });

      it("Should return 404 if the customer with the provided id is not found", async () => {
        const res = await request(app).get(
          `${HOME_ROUTE}/${NON_EXISTENT_UUID}`,
        );

        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("uuid");
        expect(res.body.errorDescription).toBe("Unable to find customer");
      });

      it("Should return 200 when the customer is found", async () => {
        const res = await request(app).get(`${HOME_ROUTE}/${validCustomerId}`);

        expect(res.status).toBe(200);
        expect(res.body).not.toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("data");
        expect(res.body.data).not.toHaveProperty("password");
        expect(res.body.data).toHaveProperty("id");
        expect(res.body.data).toHaveProperty("name");
        expect(res.body.data).toHaveProperty("phone");
        expect(res.body.data).toHaveProperty("address");
        expect(res.body.data).toHaveProperty("email");
      });
    });
  });

  describe("Updating customer information", () => {
    it("Should return 400 if the user passes an invalid id", async () => {
      const res = await request(app).put(`${HOME_ROUTE}/${INVALID_UUID}`);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("errorKey");
      expect(res.body).toHaveProperty("errorDescription");
      expect(res.body.errorKey).toBe("uuid");
      expect(res.body.errorDescription).toBe("Uuid provided is invalid");
    });

    it("Should return 404 if the customer with the provided id is not found", async () => {
      const res = await request(app).put(`${HOME_ROUTE}/${NON_EXISTENT_UUID}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("errorKey");
      expect(res.body).toHaveProperty("errorDescription");
      expect(res.body.errorKey).toBe("uuid");
      expect(res.body.errorDescription).toBe("Unable to find customer");
    });

    describe("Should return error on ivalid data", () => {
      it("Should return 400 if the password is to short", async () => {
        const res = await request(app)
          .put(`${HOME_ROUTE}/${validCustomerId}`)
          .send({
            password: "aaa",
          });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("password");
        expect(res.body.errorDescription).toBe("password is to short");
      });

      it("Should return 400 if an invalid email is sent to the route", async () => {
        const res = await request(app)
          .put(`${HOME_ROUTE}/${validCustomerId}`)
          .send({ email: "aaa" });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("email");
        expect(res.body.errorDescription).toBe("email should be a valid email");
      });
    });

    describe("Expected responses on valid data", () => {
      it("It should only update name if only the name is recieved", async () => {
        const res = await request(app)
          .put(`${HOME_ROUTE}/${validCustomerId}`)
          .send({ name: "updated customer" });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("data");
        expect(res.body.data).not.toHaveProperty("password");
        expect(res.body.data.name).toBe("updated customer");
        expect(res.body.data.phone).toBe("12345678");
        expect(res.body.data.address).toBe("my address");
        expect(res.body.data.email).toBe("name@email.com");
      });

      it("It should only update password if only the password is recieved", async () => {
        const res = await request(app)
          .put(`${HOME_ROUTE}/${validCustomerId}`)
          .send({ password: "updatedpassword" });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("data");
        expect(res.body.data).not.toHaveProperty("password");
        expect(res.body.data.name).toBe("updated customer");
        expect(res.body.data.phone).toBe("12345678");
        expect(res.body.data.address).toBe("my address");
        expect(res.body.data.email).toBe("name@email.com");
      });
    });
  });
});
