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
  if (body.name === undefined)
    return {
      errorKey: "name",
      errorDescription: "Need to provide a name for the supplier",
      errorCode: 400,
    };
  if (body.email === undefined)
    return {
      errorKey: "email",
      errorDescription: "Need to provide a email for the supplier",
      errorCode: 400,
    };
  if (body.password === undefined)
    return {
      errorKey: "password",
      errorDescription: "Need to provide a password for the supplier",
      errorCode: 400,
    };
  if (body.phone === undefined)
    return {
      errorKey: "phone",
      errorDescription: "Need to provide a phone number for the supplier",
      errorCode: 400,
    };
  if (body.address === undefined)
    return {
      errorKey: "address",
      errorDescription: "Need to provide a address for the supplier",
      errorCode: 400,
    };
  try {
    await queryRunner.startTransaction();

    const supplier = new Supplier();
    supplier.name = body.name;
    supplier.email = body.email ? body.email : "";
    supplier.password = await hashPassword(body.password ? body.password : " ");
    supplier.phone = body.phone;
    supplier.address = body.address ? body.address : "";

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
  } catch (error: any) {
    await queryRunner.rollbackTransaction();
    if (error.code === "23505") {
      return {
        errorKey: "email",
        errorDescription: error.detail,
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
    .orderBy("name")
    .getMany();

  return allSuppliers;
};
