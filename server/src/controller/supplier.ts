import { QueryRunner, Repository } from "typeorm";
/* eslint-disable import/prefer-default-export */
import {
  ErrorType,
  SuccessType,
  SupplierCreate,
  SupplierResponse,
} from "../types";
import AppDataSource from "../db";
import { Supplier } from "../model";

const queryRunner: QueryRunner = AppDataSource.createQueryRunner();
const supplierRepository: Repository<Supplier> =
  AppDataSource.getRepository(Supplier);

const hashPassword = async (password: string): Promise<string> => {
  return password;
};

export const createSupplier = async (
  body: SupplierCreate,
): Promise<ErrorType | SuccessType> => {
  try {
    await queryRunner.startTransaction();

    const supplier = new Supplier();
    supplier.name = body.name;
    supplier.phone = body.phone;
    supplier.password = await hashPassword(body.password);
    supplier.address = body.address;
    supplier.email = body.email;

    await queryRunner.manager.save(supplier);

    await queryRunner.commitTransaction();

    return {
      data: {
        id: supplier.id,
        name: supplier.name,
        email: supplier.email,
        phone: supplier.phone,
        address: supplier.address,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await queryRunner.rollbackTransaction();
    if (err.code === "23505") {
      return {
        errorKey: "email",
        errorDescription: err.detail,
        errorCode: 409,
      };
    }
    return {
      errorKey: "unknown",
      errorDescription: "unknown error",
      errorCode: 500,
    };
  }
};

export const getAllSuppliers = async (): Promise<SupplierResponse[]> => {
  const allSuppliers: SupplierResponse[] = await supplierRepository
    .createQueryBuilder("supplier")
    .select("supplier.id")
    .addSelect("supplier.name")
    .addSelect("supplier.email")
    .addSelect("supplier.phone")
    .addSelect("supplier.address")
    .orderBy("supplier.name")
    .getMany();

  return allSuppliers;
};

export const getOneSupplier = async (
  uuid: string,
): Promise<SupplierResponse | null> => {
  const supplier: SupplierResponse | null = await supplierRepository
    .createQueryBuilder("supplier")
    .select("supplier.name")
    .addSelect("supplier.email")
    .addSelect("supplier.address")
    .addSelect("supplier.phone")
    .andWhere("supplier.id  = :id")
    .setParameter("id", uuid)
    .getOne();

  return supplier;
};

export const updateOneSupplier = async (
  uuid: string,
): Promise<SupplierResponse | null> => {
  const supplier: SupplierResponse | null = await supplierRepository
    .createQueryBuilder("supplier")
    .select("supplier.name")
    .addSelect("supplier.email")
    .addSelect("supplier.address")
    .addSelect("supplier.phone")
    .andWhere("supplier.id  = :id")
    .setParameter("id", uuid)
    .update("supplier");

  return supplier;
};
