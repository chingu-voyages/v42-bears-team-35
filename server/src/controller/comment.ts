import { QueryRunner } from "typeorm";
import { ErrorType, SuccessType, CommentCreate } from "../types";
import AppDataSource from "../db";
import { Comment } from "../model";
import { getOneCustomer } from "./customer";
import { getOneItem } from "./item";

const queryRunner: QueryRunner = AppDataSource.createQueryRunner();
const commentRepository = AppDataSource.getRepository(Comment);

export async function createComment({
  customerId,
  itemId,
  comments,
}: CommentCreate): Promise<ErrorType | SuccessType> {
  try {
    await queryRunner.startTransaction();

    const customer = await getOneCustomer(customerId);
    if (!customer) {
      return {
        errorCode: 404,
        errorDescription: "Customer not found.",
        errorKey: "Customer",
      };
    }

    const item = await getOneItem(itemId);

    if (!item) {
      return {
        errorCode: 404,
        errorDescription: "Item not found.",
        errorKey: "Item",
      };
    }

    const comment = new Comment();
    comment.comments = comments;
    comment.customer = customer;
    comment.item = item;

    await queryRunner.manager.save(comment);

    await queryRunner.commitTransaction();
    return {
      data: {
        id: comment.id,
        comments: comment.comments,
        customerId: comment.customer,
        itemId: comment.item,
        createdAt: comment.created_at,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await queryRunner.rollbackTransaction();
    if (error.code === "23505") {
      return {
        errorKey: "comments",
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
