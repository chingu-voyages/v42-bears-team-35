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

export interface RatingDetails {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

export interface ReviewDetails {
  name: string;
  date: Date;
  review: string;
}

export interface FormattedItemResponse {
  id: string;
  imageUrl: string;
  description: string;
  price: number;
  discount: number;
  dateAdded: Date;
  supplier: SupplierResponse;
  productRating: number;
  ratingDetails: RatingDetails;
  tags: string[];
  imageArray: string[];
  reviews: ReviewDetails[];
}
