import request from "supertest";
import connection from "../db/connection";
import app from "../app";

const HOME_ROUTE = "/suppliers";
let supplierID: string;
const INVALID_UUID = "thisisan-inva-lidu-uidv-aluesoerror";
const FAKE_UUID = "51466a13-f404-4763-bd48-496f7926eeaa";

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
    it("Should return 200 and an array when retrieving all the suppliers", async () => {
      const res = await request(app).get(HOME_ROUTE);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBe(1);
      supplierID = res.body.data[0].id;
    });

    describe("Getting a specific supplier", () => {
      it("Should return 400 if the user passes an invalid id", async () => {
        const res = await request(app).get(`${HOME_ROUTE}/${INVALID_UUID}`);

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("uuid");
        expect(res.body.errorDescription).toBe("Uuid provided was invalid");
      });

      it("Should return 404 if the supplier with the provided id is not found", async () => {
        const res = await request(app).get(`${HOME_ROUTE}/${FAKE_UUID}`);
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("uuid");
        expect(res.body.errorDescription).toBe("Unable to find supplier");
      });

      it("Should return 200 when the supplier is found", async () => {
        const res = await request(app).get(`${HOME_ROUTE}/${supplierID}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).not.toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("data");
        expect(res.body.data).toHaveProperty("id");
        expect(res.body.data).toHaveProperty("name");
        expect(res.body.data).toHaveProperty("phone");
        expect(res.body.data).toHaveProperty("address");
        expect(res.body.data).toHaveProperty("email");
      });
    });
  });

  describe("Updating supplier information", () => {
    it("Should return 400 if the user passes an invalid id", async () => {
      const res = await request(app).get(`${HOME_ROUTE}/${INVALID_UUID}`);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("errorKey");
      expect(res.body).toHaveProperty("errorDescription");
      expect(res.body.errorKey).toBe("uuid");
      expect(res.body.errorDescription).toBe("Uuid provided was invalid");
    });

    it("Should return 404 if the supplier with the provided id is not found", async () => {
      const res = await request(app).get(`${HOME_ROUTE}/${FAKE_UUID}`);
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("errorKey");
      expect(res.body).toHaveProperty("errorDescription");
      expect(res.body.errorKey).toBe("uuid");
      expect(res.body.errorDescription).toBe("Unable to find supplier");
    });

    describe("Should return error on ivalid data", () => {
      it("Should return 400 if the email is invalid", async () => {
        const res = await request(app)
          .put(`${HOME_ROUTE}/${supplierID}`)
          .send({ email: "1234" });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("email");
        expect(res.body.errorDescription).toBe("email should be a valid email");
      });
    });

    describe("Expected responses on valid data", () => {
      it("Should only update name if only the name is recieved", async () => {
        const res = await request(app)
          .put(`${HOME_ROUTE}/${supplierID}`)
          .send({ name: "supplier 1" });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("data");

        expect(res.body.data.name).toBe("supplier 1");
        expect(res.body.data.phone).toBe("12345678");
        expect(res.body.data.email).toBe("name@email.com");
        expect(res.body.data.address).toBe("my address");
      });

      it("Should only update phone if only the phone is recieved", async () => {
        const res = await request(app)
          .put(`${HOME_ROUTE}/${supplierID}`)
          .send({ phone: "12345678" });

        expect(res.statusCode).toBe(200);
        expect(res.body).not.toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("data");

        expect(res.body.data.name).toBe("supplier 1");
        expect(res.body.data.phone).toBe("12345678");
        expect(res.body.data.email).toBe("name@email.com");
        expect(res.body.data.address).toBe("my address");
      });

      it("Should only update email if only the email is recieved", async () => {
        const res = await request(app)
          .put(`${HOME_ROUTE}/${supplierID}`)
          .send({ email: "supplier@email.com" });

        expect(res.statusCode).toBe(200);
        expect(res.body).not.toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("data");

        expect(res.body.data.name).toBe("supplier 1");
        expect(res.body.data.phone).toBe("12345678");
        expect(res.body.data.email).toBe("supplier@email.com");
        expect(res.body.data.address).toBe("my address");
      });

      it("Should only update address if only the address is recieved", async () => {
        const res = await request(app)
          .put(`${HOME_ROUTE}/${supplierID}`)
          .send({ address: "my address" });

        expect(res.statusCode).toBe(200);
        expect(res.body).not.toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("data");

        expect(res.body.data.name).toBe("supplier 1");
        expect(res.body.data.phone).toBe("12345678");
        expect(res.body.data.email).toBe("supplier@email.com");
        expect(res.body.data.address).toBe("my address");
      });
    });
  });
});
