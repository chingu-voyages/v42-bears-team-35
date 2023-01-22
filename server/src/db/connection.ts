import { createConnection, getConnection } from "typeorm";

const connection = {
  async create(): Promise<void> {
    await createConnection();
  },

  async close(): Promise<void> {
    await getConnection().close();
  },

  async clear() {
    const clearConnection = getConnection();
    const entities: string[] = [
      "item_tag",
      "tag",
      '"order"',
      "customer",
      "item",
      "supplier",
      "picture",
      "item_picture",
    ];

    entities.forEach(async (entity) => {
      const repository = clearConnection.getRepository(entity);
      await repository.query(`DELETE FROM ${entity}`);
    });
  },
};

export default connection;
