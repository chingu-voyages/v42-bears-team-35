import { QueryRunner, Repository, TypeORMError } from "typeorm";
/* eslint-disable import/prefer-default-export */
import {
  ErrorType,
  SuccessType,
  CustomerCreate,
  CustomerResponse,
  CustomerUpdate,
  NonRegisteredCustomerInterface,
} from "../types";
import AppDataSource from "../db";
import { Customer } from "../model";
import { hashPassword } from "../authentication";

const queryRunner: QueryRunner = AppDataSource.createQueryRunner();
const customerRepositry: Repository<Customer> =
  AppDataSource.getRepository(Customer);

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

export async function createCustomer(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: CusstomerCreate,
): Promise<ErrorType | SuccessType> {
  try {
    await queryRunner.startTransaction();

    const customer = new Customer();
    customer.name = body.name;
    customer.phone = body.phone;
    customer.email = body.email;
    customer.street = body.street;
    customer.city = body.city;
    customer.state = body.state;
    customer.zip = body.zip;

    if (body.password !== undefined)
      customer.password = await hashPassword(body.password);
    if (body.isRegistered !== undefined)
      customer.is_registered = body.isRegistered;

    await queryRunner.manager.save(customer);

    await queryRunner.commitTransaction();

    return {
      data: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        street: customer.street,
        city: customer.city,
        state: customer.state,
        zip: customer.zip,
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

export async function createNonRegisteredCustomer(
  customerToCreate: NonRegisteredCustomerInterface,
): Promise<Customer | ErrorType> {
  try {
    await queryRunner.startTransaction();

    const customer = new Customer();
    customer.name = customerToCreate.name;
    customer.email = customerToCreate.email;
    customer.phone = customerToCreate.phone;
    customer.street = customerToCreate.street;
    customer.city = customerToCreate.city;
    customer.state = customerToCreate.state;
    customer.zip = customerToCreate.zip; 
    customer.is_registered = false;

    await queryRunner.manager.save(customer);

    await queryRunner.commitTransaction();

    return customer;
  } catch (err: unknown) {
    await queryRunner.rollbackTransaction();

    if (err instanceof TypeORMError && "code" in err && err.code === "23505") {
      const returnedCustomer = await getCustomerByEmail(customerToCreate.email);

      if (returnedCustomer === null) {
        console.error(err);
        return {
          errorCode: 500,
          errorDescription: "Unable to find customer",
          errorKey: "unknown",
        };
      }

      if (returnedCustomer.is_registered === false) return returnedCustomer;

      return {
        errorCode: 403,
        errorDescription: "That is a registered customer, please log in",
        errorKey: "email",
      };
    }

    console.error(err);
    return {
      errorCode: 500,
      errorDescription: "Unknown error",
      errorKey: "unknown",
    };
  }
}

export async function getAllCustomers(): Promise<CustomerResponse[]> {
  const allCustomers: CustomerResponse[] = await customerRepositry
    .createQueryBuilder("customer")
    .select("customer.id")
    .addSelect("customer.name")
    .addSelect("customer.email")
    .addSelect("customer.phone")
    .addSelect("customer.street")
    .addSelect("customer.city")
    .addSelect("customer.state")
    .addSelect("customer.zip")
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
    .addSelect("customer.phone")
    .addSelect("customer.street")
    .addSelect("customer.city")
    .addSelect("customer.state")
    .addSelect("customer.zip")
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
  customerToUpdate.phone = body.phone ? body.phone : customer.phone;
  customerToUpdate.street = body.street ? body.street : customer.street;
  customerToUpdate.city =body.city ? body.city : customer.city;
  customerToUpdate.state = body.state ? body.state : customer.state;
  customerToUpdate.zip = body.zip ? body.zip : customer.zip;

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
        email: customerToUpdate.email,
        phone: customerToUpdate.phone,
        street: customerToUpdate.street,
        city: customerToUpdate.city,
        state: customerToUpdate.state,
        zip: customerToUpdate.zip,
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
