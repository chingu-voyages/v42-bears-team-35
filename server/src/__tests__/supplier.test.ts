import request from "supertest";
import connection from "../db/connection";
import app from "../app";

const HOME_ROUTE = "/suppliers";

describe("Operations on the supplier route", () => {
  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.close();
  });

  describe("Creating a new supplier", () => {
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
          name: "new supplier",
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("phone");
        expect(res.body.errorDescription).toBe("phone is required");
      });

      it("Should return 400 if no address is sent to the route", async () => {
        const res = await request(app).post(HOME_ROUTE).send({
          name: "new supplier",
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
          name: "new supplier",
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
          name: "new supplier",
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
          name: "new supplier",
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
          name: "new supplier",
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
          name: "supplier 1",
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
        expect(res.body.data.name).toBe("supplier 1");
      });

      it("Should return 409 if a supplier with the same name exists", async () => {
        const res = await request(app).post(HOME_ROUTE).send({
          name: "supplier 1",
          phone: "12345678",
          address: "my address",
          password: "whatever",
          email: "c@email.com",
        });

        expect(res.statusCode).toBe(409);
        expect(res.body).toHaveProperty("errorKey");
      });

      it("Should return 409 if a supplier with the same email exists", async () => {
        const res = await request(app).post(HOME_ROUTE).send({
          name: "supplier 2",
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

  describe("Reading data from supplier route", () => {
    it.todo("Should return 200 and an array when retrieving all the suppliers");

    describe("Getting a specific supplier", () => {
      it.todo("Should return 400 if the user passes an invalid id");
      it.todo(
        "Should return 404 if the supplier with the provided id is not found",
      );
      it.todo("Should return 200 when the supplier is found");
    });
  });

  describe("Updating supplier information", () => {
    it.todo("Should return 400 if the user passes an invalid id");
    it.todo(
      "Should return 404 if the supplier with the provided id is not found",
    );

    describe("Should return error on ivalid data", () => {
      it.todo("Should return 400 if the password is to short");
      it.todo("Should return 400 if the email is invalid");
    });

    describe("Expected responses on valid data", () => {
      it.todo("It should update name if only the name is recieved");
    });
  });
});
