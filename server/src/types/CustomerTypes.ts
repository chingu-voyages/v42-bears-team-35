export type CustomerCreate = {
  name?: string;
  phone?: string;
  address?: string;
  email?: string;
  password?: string;
};

export type CustomerResponse = {
  id: string;
  name: string;
  phone: string;
  address: string;
  email: string;
};
