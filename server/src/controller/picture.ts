import { QueryRunner, Repository } from "typeorm";
import { Picture } from "../model";
import AppDataSource from "../db";

const queryRunner: QueryRunner = AppDataSource.createQueryRunner();
const pictureRepository: Repository<Picture> =
  AppDataSource.getRepository(Picture);

export async function getPictureByUrl(
  pictureURL: string,
): Promise<Picture | null> {
  const pictureLookup = await pictureRepository
    .createQueryBuilder("picture")
    .addSelect("picture.id")
    .addSelect("picture.url")
    .andWhere("picture.url = :url")
    .setParameter("url", pictureURL)
    .getOne();

  return pictureLookup;
}

export async function insertPicture(picture: string): Promise<Picture> {
  try {
    const findPicture = await getPictureByUrl(picture);

    if (findPicture) return findPicture;

    const createdPicture = new Picture();
    createdPicture.url = picture;

    await queryRunner.manager.save(createdPicture);

    return createdPicture;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(err);
    throw new Error(err.message);
  }
}
