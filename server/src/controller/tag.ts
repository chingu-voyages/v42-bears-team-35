import { QueryRunner, Repository } from "typeorm";
import { Tag } from "../model";
import AppDataSource from "../db";

const queryRunner: QueryRunner = AppDataSource.createQueryRunner();
const tagRepository: Repository<Tag> = AppDataSource.getRepository(Tag);

export async function getTagByName(tagName: string): Promise<Tag | null> {
  const tagLookup = await tagRepository
    .createQueryBuilder("tag")
    .addSelect("tag.id")
    .addSelect("tag.name")
    .andWhere("tag.name = :name")
    .setParameter("name", tagName)
    .getOne();

  return tagLookup;
}

export async function insertTag(tag: string): Promise<Tag> {
  try {
    const findTag = await getTagByName(tag);

    if (findTag) return findTag;

    const createdTag = new Tag();
    createdTag.name = tag;

    await queryRunner.manager.save(createdTag);

    return createdTag;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(err);
    throw new Error(err.message);
  }
}
