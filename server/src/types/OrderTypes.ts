export type OrderCreate = {
  customer?: string;
  email: string;
  date: string;
  tracking?: string;
};

export type OrderUpdate = {
  customer?: string;
  email?: string;
  tracking?: string;
};
