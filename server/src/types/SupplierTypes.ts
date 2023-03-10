export type SupplierCreate = {
  name: string;
  phone: string;
  address: string;
  email: string;
};

export type SupplierResponse = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type SupplierUpdate = {
  id: string;
  name: string;
  phone: string;
  address: string;
  email: string;
};
