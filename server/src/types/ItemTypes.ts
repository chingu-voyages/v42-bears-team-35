export type ItemCreate = {
  description: string;
  price: number;
  length: number;
  width: number;
  height: number;
  supplier: string;
};

export type ItemResponse = {
  id: string;
  descrition: string;
  price: number;
  length: number;
  width: number;
  height: number;
  supplier: string;
};

export type ItemUpdate = {
  id: string;
  description: string;
  price: number;
  length: number;
  width: number;
  height: number;
  tags: ["string"];
};
