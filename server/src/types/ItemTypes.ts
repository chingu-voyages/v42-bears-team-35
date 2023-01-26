/* eslint-disable import/no-cycle */
import { SupplierResponse } from ".";

export type ItemCreate = {
  name: string;
  price: number;
  length: number;
  width: number;
  height: number;
  supplier: string;
  tags: string[];
  pictures: string[];
};

export type ItemUpdate = {
  id: string;
  name: string;
  price: number;
  length: number;
  width: number;
  height: number;
  tags: string[];
  pictures: string[];
};

export interface FormattedItemResponse {
  id: string;
  name: string;
  price: number;
  height: number;
  width: number;
  length: number;
  supplier: SupplierResponse;
  tags: string[];
  pictures: string[];
}
