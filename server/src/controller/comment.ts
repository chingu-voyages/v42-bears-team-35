import { QueryRunner } from "typeorm";
import { ErrorType, SuccessType, CommentCreate } from "../types";
import AppDataSource from "../db";
import { Comment } from "../model";
import { getOneCustomer } from "./customer";
import { getOneItem } from "./item";

const queryRunner: QueryRunner = AppDataSource.createQueryRunner();
const commentRepository = AppDataSource.getRepository(Comment);

export async function createComment(
  body: CommentCreate,
): Promise<ErrorType | SuccessType> {
  try {
    await queryRunner.startTransaction();
    // eslint-disable-next-line no-console
    console.log(body);

    const comment = new Comment();

    comment.comments = body.comments;

    if (body.customerId) {
      const customerId = await getOneCustomer(body.customerId);

      if (customerId === null)
        return {
          errorCode: 404,
          errorDescription: "Customer not found.",
          errorKey: "Customer",
        };
      comment.customer = customerId;
    }

    if (body.itemId) {
      const itemId = await getOneItem(body.itemId);

      if (itemId === null)
        return {
          errorCode: 404,
          errorDescription: "Item not found.",
          errorKey: "Item",
        };
      comment.item = itemId;
    }

    await queryRunner.manager.save(comment);

    await queryRunner.commitTransaction();
    return {
      data: {
        id: comment.id,
        comments: comment.comments,
        customerId: comment.customer ? comment.customer : null,
        itemId: comment.item ? comment.item : null,
        createdAt: comment.created_at,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await queryRunner.rollbackTransaction();
    if (error.code === "23505") {
      return {
        errorKey: "comment",
        errorDescription: error.detail,
        errorCode: 409,
      };
    }
    return {
      errorKey: "unknown",
      errorCode: 500,
      errorDescription: error.message,
    };
  }
}

export const getAllComments = async (): Promise<Comment[]> => {
  const data: Comment[] = await commentRepository
    .createQueryBuilder("comment")
    .addSelect("comment.id")
    .addSelect("comment.createdAt")
    .getMany();

  return data;
};
