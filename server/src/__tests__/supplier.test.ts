import request from "supertest";
import connection from "../db/connection";
import app from "../app";

const HOME_ROUTE = "/suppliers";

describe("Operation on the supplier route", () => {
  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.close();
  });

  describe("Creating a new supplier", () => {
    describe("Should return error on invalid data", () => {
      it("Should return 400 if no name is sent to the route", async () => {
        const res = await request(app).post(HOME_ROUTE).send({
          phone: "123456789",
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("name");
        expect(res.body.errorDescription).toBe(
          "Need to provide a name for the supplier",
        );
      });

      it("Should return 400 if no email is sent to the route", async () => {
        const res = await request(app).post(HOME_ROUTE).send({
          name: "supplier 1",
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("email");
        expect(res.body.errorDescription).toBe(
          "Need to provide a email for the supplier",
        );
      });

      it("Should return 400 if no password is sent to the route", async () => {
        const res = await request(app).post(HOME_ROUTE).send({
          address: "whereever location",
          password: "",
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("password");
        expect(res.body.errorDescription).toBe(
          "Needs to provide a password for the supplier",
        );
      });
      it("Should return 400 if no phone number is sent to the route", async () => {
        const res = await request(app).post(HOME_ROUTE).send({
          name: "supplier 1",
          email: "fake@email.com",
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("phone");
        expect(res.body.errorDescription).toBe(
          "Need to provide a phone number for  the supplier",
        );
      });
      it("Should return 400 if no address is sent to the route", async () => {
        const res = await request(app).post(HOME_ROUTE).send({
          name: "supplier 1",
          email: "fake@email.com",
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("address");
        expect(res.body.errorDescription).toBe(
          "Need to provide an address for  the supplier",
        );
      });

      it("Should return 401 if an invalid email is sent to th route", async () => {
        const res = await request(app).post(HOME_ROUTE).send({
          name: "supplier 1",
          email: "fake@emai",
        });

        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("email");
        expect(res.body.errorDescription).toBe(
          "Supplier with email already exist",
        );
      });
    });

    describe("Should return success with valid data", () => {
      it("Should return 201 if all data is valid", async () => {
        await connection.clear();
        const res = await request(app).post(HOME_ROUTE).send({
          name: "supplier 1",
          email: "fake@email.com",
          password: "imnotreal",
          address: "whereever location",
          phone: "123456789",
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).not.toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("data");
        expect(res.body.data).not.toHaveProperty("password");
        expect(res.body.data).toHaveProperty("id");
        expect(res.body.data.name).toBe("supplier 1");
      });

      it("Should return 409 if a supplier with the same name already exists", async () => {
        const res = await request(app).post(HOME_ROUTE).send({
          name: "supplier 1",
          email: "fake@email.com",
          password: "imnotreal",
          address: "whereever location",
          phone: "123456789",
        });
        expect(res.statusCode).toBe(409);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
      });
    });
  });
});
