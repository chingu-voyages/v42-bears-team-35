/* eslint-disable no-console */
import request from "supertest";
import connection from "../db/connection";
import app from "../app";

describe("setup", () => {
  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  it("should expect true", async () => {
    const response = await request(app).get("/");

    console.log(response);

    expect(response.statusCode).toBe(200);
  });
});
