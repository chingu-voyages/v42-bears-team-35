export type ItemCreate = {
  description: string;
  price: number;
  length: number;
  width: number;
  height: number;
  supplier: string;
  tags: string[];
};

export type ItemUpdate = {
  id: string;
  description: string;
  price: number;
  length: number;
  width: number;
  height: number;
  tags: string[];
};
