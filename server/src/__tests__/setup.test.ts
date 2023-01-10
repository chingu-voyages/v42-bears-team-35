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

  it("should receive status code 200 and an empty array when getting the home route", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });
});
