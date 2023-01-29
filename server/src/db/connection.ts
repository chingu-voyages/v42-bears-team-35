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
      "order_item",
      "item_tag",
      "tag",
      '"order"',
      "customer",
      "item_picture",
      "picture",
      "item",
      "supplier",
    ];

    for (let i = 0; i < entities.length; i += 1) {
      const entity = entities[i];
      const repository = clearConnection.getRepository(entity);
      // eslint-disable-next-line no-await-in-loop
      await repository.query(`DELETE FROM ${entity}`);
    }
  },
};

export default connection;
