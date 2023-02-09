export type OrderCreate = {
  customer?: string;
};

export type OrderUpdate = {
  customer?: string;
  email?: string;
  tracking?: string;
};
