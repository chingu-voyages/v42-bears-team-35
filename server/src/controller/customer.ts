import { QueryRunner, Repository } from "typeorm";
/* eslint-disable import/prefer-default-export */
import {
  ErrorType,
  SuccessType,
  CustomerCreate,
  CustomerResponse,
} from "../types";
import AppDataSource from "../db";
import { Customer } from "../model";

const queryRunner: QueryRunner = AppDataSource.createQueryRunner();
const customerRepositry: Repository<Customer> =
  AppDataSource.getRepository(Customer);

const hashPassword = async (password: string): Promise<string> => {
  return password;
};

export const createCustomer = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: CustomerCreate,
): Promise<ErrorType | SuccessType> => {
  try {
    await queryRunner.startTransaction();

    const customer = new Customer();
    customer.name = body.name;
    customer.phone = body.phone;
    customer.password = await hashPassword(body.password);
    customer.address = body.address;
    customer.email = body.email;

    await queryRunner.manager.save(customer);

    await queryRunner.commitTransaction();

    return {
      data: {
        id: customer.id,
        name: customer.name,
        address: customer.address,
        email: customer.email,
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

export const getAllCustomers = async (): Promise<CustomerResponse[]> => {
  const allCustomers: CustomerResponse[] = await customerRepositry
    .createQueryBuilder("customer")
    .select("customer.id")
    .addSelect("customer.name")
    .addSelect("customer.email")
    .addSelect("customer.address")
    .addSelect("customer.phone")
    .orderBy("customer.name")
    .getMany();

  return allCustomers;
};

export const getOneCustomer = async (
  uuid: string,
): Promise<CustomerResponse | null> => {
  const customer: CustomerResponse | null = await customerRepositry
    .createQueryBuilder("customer")
    .select("customer.id")
    .addSelect("customer.name")
    .addSelect("customer.email")
    .addSelect("customer.address")
    .addSelect("customer.phone")
    .andWhere("customer.id = :id")
    .setParameter("id", uuid)
    .getOne();

  return customer;
};