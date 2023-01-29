import request from "supertest";
import connection from "../db/connection";
import app from "../app";

const END_POINT = "/products";
// let productId: string;
const INVALID_UUID = "thisisan-inva-lidu-uidv-aluesoerror";
const NON_EXISTENT_UUID = "12345678-1234-1234-1234-1234567890AB";
let validSupplierUUID: string;

describe("Testing the item model changes required by the Frontend team", () => {
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
  });

  afterAll(async () => {
    await connection.close();
  });

  describe("Create a new item with the fields required", () => {
    describe("Sending incomplete information", () => {
      it("Should return 400 if no imageUrl field", async () => {
        const res = await request(app).post(END_POINT).send({});

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("imageUrl");
        expect(res.body.errorDescription).toBe("imageUrl is required");
      });

      it("Should return 400 if no tags", async () => {
        const res = await request(app).post(END_POINT).send({
          imageUrl: "http://www.images.com",
        });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("tags");
        expect(res.body.errorDescription).toBe("tags is required");
      });

      it("Should return 400 if just 1 tag is sent", async () => {
        const res = await request(app)
          .post(END_POINT)
          .send({
            imageUrl: "http://www.images.com",
            tags: ["one"],
          });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("tags");
        expect(res.body.errorDescription).toBe("at least 2 tags are required");
      });

      it("Should return 400 if more than 2 tags are sent", async () => {
        const res = await request(app)
          .post(END_POINT)
          .send({
            imageUrl: "http://www.images.com",
            tags: ["one", "two", "three"],
          });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("tags");
        expect(res.body.errorDescription).toBe(
          "you should have no more than 2 tags",
        );
      });

      it("Should return 400 if no description", async () => {
        const res = await request(app)
          .post(END_POINT)
          .send({
            imageUrl: "http://www.images.com",
            tags: ["one", "two"],
          });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("description");
        expect(res.body.errorDescription).toBe("description is required");
      });

      it("Should return 400 if description is to short", async () => {
        const res = await request(app)
          .post(END_POINT)
          .send({
            imageUrl: "http://www.images.com",
            tags: ["one", "two"],
            description: "is",
          });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("description");
        expect(res.body.errorDescription).toBe("description is to short");
      });

      it("Should return 400 if no price", async () => {
        const res = await request(app)
          .post(END_POINT)
          .send({
            imageUrl: "http://www.images.com",
            tags: ["one", "two"],
            description: "this is a propper description",
          });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("price");
        expect(res.body.errorDescription).toBe("price is required");
      });

      it("Should return 400 if non numeric price", async () => {
        const res = await request(app)
          .post(END_POINT)
          .send({
            imageUrl: "http://www.images.com",
            tags: ["one", "two"],
            description: "this is a propper description",
            price: "wtf",
          });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("price");
        expect(res.body.errorDescription).toBe(
          "price should be a valid number",
        );
      });

      it("Should return 400 if no supplier id is sent", async () => {
        const res = await request(app)
          .post(END_POINT)
          .send({
            imageUrl: "http://www.images.com",
            tags: ["one", "two"],
            description: "this is a propper description",
            price: 200.56,
            supplier: INVALID_UUID,
          });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("supplier");
        expect(res.body.errorDescription).toBe(
          "supplier should be a valid uuid",
        );
      });

      it("Should return 400 if invaild supplier id is sent", async () => {
        const res = await request(app)
          .post(END_POINT)
          .send({
            imageUrl: "http://www.images.com",
            tags: ["one", "two"],
            description: "this is a propper description",
            price: 200.56,
          });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("supplier");
        expect(res.body.errorDescription).toBe("supplier is required");
      });

      it("Should return 404 if non existent customer is sent", async () => {
        const res = await request(app)
          .post(END_POINT)
          .send({
            imageUrl: "http://www.images.com",
            tags: ["one", "two"],
            description: "this is a propper description",
            price: 200.56,
            supplier: NON_EXISTENT_UUID,
          });

        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("supplier");
        expect(res.body.errorDescription).toBe("no supplier with that id");
      });

      it("Should return 400 if non numeric discount", async () => {
        const res = await request(app)
          .post(END_POINT)
          .send({
            imageUrl: "http://www.images.com",
            tags: ["one", "two"],
            description: "this is a propper description",
            price: 200.56,
            discount: "five percent",
            supplier: validSupplierUUID,
          });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("errorKey");
        expect(res.body).toHaveProperty("errorDescription");
        expect(res.body.errorKey).toBe("discount");
        expect(res.body.errorDescription).toBe(
          "discount should be a valid number",
        );
      });
    });

    describe("Sending complete infomration", () => {
      it("Should return 201 when successfully created", async () => {
        const res = await request(app)
          .post(END_POINT)
          .send({
            imageUrl: "http://www.images.com",
            tags: ["one", "two"],
            description: "this is a propper description",
            price: 200.56,
            supplier: validSupplierUUID,
          });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("data");
        expect(res.body.data).toHaveProperty("id");
        expect(res.body.data).toHaveProperty("imageUrl");
        expect(res.body.data.imageUrl).toBe("http://www.images.com");
        expect(res.body.data).toHaveProperty("description");
        expect(res.body.data.description).toBe("this is a propper description");
        expect(res.body.data).toHaveProperty("price");
        expect(res.body.data.price).toBe(200.56);
        expect(res.body.data).toHaveProperty("discount");
        expect(res.body.data.discount).toBe(0);
        expect(res.body.data).toHaveProperty("productRating");
        expect(res.body.data.productRating).toBe(0);
        expect(res.body.data).toHaveProperty("ratingDetails");
        expect(res.body.data.ratingDetails).toHaveProperty("1");
        expect(res.body.data.ratingDetails[1]).toBe(0);
        expect(res.body.data.ratingDetails).toHaveProperty("2");
        expect(res.body.data.ratingDetails[2]).toBe(0);
        expect(res.body.data.ratingDetails).toHaveProperty("3");
        expect(res.body.data.ratingDetails[3]).toBe(0);
        expect(res.body.data.ratingDetails).toHaveProperty("4");
        expect(res.body.data.ratingDetails[4]).toBe(0);
        expect(res.body.data.ratingDetails).toHaveProperty("5");
        expect(res.body.data.ratingDetails[5]).toBe(0);
        expect(res.body.data).toHaveProperty("dateAdded");
        expect(res.body.data).toHaveProperty("reviews");
        expect(res.body.data.reviews.length).toBe(0);
        expect(res.body.data).toHaveProperty("tags");
        expect(res.body.data.tags.length).toBe(2);
        expect(res.body.data.tags[0]).toBe("one");
        expect(res.body.data.tags[1]).toBe("two");
      });
      it.todo("Should return 409 when duplicate information");
    });
  });
});
