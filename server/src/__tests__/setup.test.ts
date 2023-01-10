import connection from "../db/connection";

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

  it("should expect true", () => {
    expect(true).toBe(true);
  });
});
