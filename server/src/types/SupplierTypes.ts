export type SupplierCreate = {
  name?: string;
  phone?: string;
  address?: string;
  email?: string;
  password?: string;
};

export type SupplierResponse = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
};
