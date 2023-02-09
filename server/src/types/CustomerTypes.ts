export interface NonRegisteredCustomerInterface {
  name: string;
  phone: string;
  address: string;
  email: string;
}
export interface CustomerCreate extends NonRegisteredCustomerInterface {
  // name: string;
  // phone: string;
  // address: string;
  // email: string;
  password?: string;
  isRegistered?: boolean;
}

export interface CustomerResponse extends NonRegisteredCustomerInterface {
  id: string;
  // name: string;
  // phone: string;
  // address: string;
  // email: string;
}

export interface CustomerUpdate {
  name?: string;
  phone?: string;
  address?: string;
  email?: string;
  password?: string;
}
