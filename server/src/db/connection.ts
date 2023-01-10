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
    const entities = clearConnection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = clearConnection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  },
};

export default connection;
