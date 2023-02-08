import { QueryRunner, Repository } from "typeorm";
/* eslint-disable import/prefer-default-export */
import {
  ErrorType,
  SuccessType,
  CustomerCreate,
  CustomerResponse,
  CustomerUpdate,
} from "../types";
import AppDataSource from "../db";
import { Customer } from "../model";
import { hashPassword } from "../authentication";

const queryRunner: QueryRunner = AppDataSource.createQueryRunner();
const customerRepositry: Repository<Customer> =
  AppDataSource.getRepository(Customer);

export async function createCustomer(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: CustomerCreate,
): Promise<ErrorType | SuccessType> {
  try {
    await queryRunner.startTransaction();

    const customer = new Customer();
    customer.name = body.name;
    customer.phone = body.phone;
    if (body.password !== undefined)
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
}

export async function getAllCustomers(): Promise<CustomerResponse[]> {
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
}

export async function getOneCustomer(uuid: string): Promise<Customer | null> {
  const customer: Customer | null = await customerRepositry
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
}

export async function updateOneCustomer(
  body: CustomerUpdate,
  customer: Customer,
): Promise<SuccessType | ErrorType> {
  const customerToUpdate = customer;
  customerToUpdate.name = body.name ? body.name : customer.name;
  customerToUpdate.email = body.email ? body.email : customer.email;
  customerToUpdate.address = body.address ? body.address : customer.address;
  customerToUpdate.phone = body.phone ? body.phone : customer.phone;

  if (body.password)
    customerToUpdate.password = await hashPassword(body.password);

  try {
    await queryRunner.startTransaction();

    const customerUpdateResponse = await queryRunner.manager.save(
      customerToUpdate,
    );

    await queryRunner.commitTransaction();

    return {
      data: {
        id: customerUpdateResponse.id,
        name: customerUpdateResponse.name,
        address: customerToUpdate.address,
        email: customerToUpdate.email,
        phone: customerToUpdate.phone,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await queryRunner.rollbackTransaction();

    if (err.code !== undefined && err.code === "23505")
      return {
        errorCode: 409,
        errorKey: "email",
        errorDescription: "Customer with email already exists",
      };

    return {
      errorCode: 500,
      errorKey: "unknown",
      errorDescription: err.message,
    };
  }
}

export async function getCustomerByEmail(
  email: string,
): Promise<Customer | null> {
  const customer: Customer | null = await customerRepositry
    .createQueryBuilder("customer")
    .andWhere("customer.email = :email")
    .setParameter("email", email)
    .getOne();

  return customer;
}
