export type ItemCreate = {
  description: string;
  price: number;
  length: number;
  width: number;
  height: number;
};

export type ItemResponse = {
  id: string;
  descrition: string;
  price: number;
  length: number;
  width: number;
  height: number;
};

export type ItemUpdate = {
  id: string;
  descrition: string;
  price: number;
  length: number;
  width: number;
  height: number;
  tags: ["string"];
};
