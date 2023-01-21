import { QueryRunner, Repository } from "typeorm";
/* eslint-disable import/prefer-default-export */
import {
  ErrorType,
  SuccessType,
  SupplierCreate,
  SupplierResponse,
  SupplierUpdate,
} from "../types";
import AppDataSource from "../db";
import { Supplier } from "../model";

const queryRunner: QueryRunner = AppDataSource.createQueryRunner();
const supplierRepository: Repository<Supplier> =
  AppDataSource.getRepository(Supplier);

export const createSupplier = async (
  body: SupplierCreate,
): Promise<ErrorType | SuccessType> => {
  try {
    await queryRunner.startTransaction();

    const supplier = new Supplier();
    supplier.name = body.name;
    supplier.phone = body.phone;
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
): Promise<Supplier | null> => {
  const supplier: Supplier | null = await supplierRepository
    .createQueryBuilder("supplier")
    .select("supplier.name")
    .addSelect("supplier.id")
    .addSelect("supplier.email")
    .addSelect("supplier.address")
    .addSelect("supplier.phone")
    .andWhere("supplier.id  = :id")
    .setParameter("id", uuid)
    .getOne();

  return supplier;
};

export async function updateOneSupplier(
  body: SupplierUpdate,
  supplier: Supplier,
): Promise<SuccessType | ErrorType> {
  const supplierToUpdate = supplier;

  supplierToUpdate.name = body.name ? body.name : supplier.name;
  supplierToUpdate.email = body.email ? body.email : supplier.email;
  supplierToUpdate.address = body.address ? body.address : supplier.address;
  supplierToUpdate.phone = body.phone ? body.phone : supplier.phone;

  try {
    await queryRunner.startTransaction();

    const supplierUpdateResponse = await queryRunner.manager.save(
      supplierToUpdate,
    );

    await queryRunner.commitTransaction();

    return {
      data: {
        id: supplierUpdateResponse.id,
        name: supplierUpdateResponse.name,
        address: supplierUpdateResponse.address,
        email: supplierUpdateResponse.email,
        phone: supplierUpdateResponse.phone,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await queryRunner.rollbackTransaction();

    if (err.code !== undefined && err.code === "23505")
      return {
        errorCode: 409,
        errorKey: "email",
        errorDescription: "Supplier with email already exists",
      };

    return {
      errorCode: 500,
      errorKey: "unknown",
      errorDescription: err.message,
    };
  }
}
