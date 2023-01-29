import { Item } from "../model";
import { FormattedItemResponse } from "../types";

export function formatOneItem(item: Item) {
  let tags: string[] = [];
  let imageArray: string[] = [];
  let reviews: string[] = [];

  if (item.itemTag !== undefined)
    tags = item.itemTag.map((itemTag) => {
      return itemTag.tag.name;
    });

  if (item.itemPicture !== undefined)
    imageArray = item.itemPicture.map((itemPicture) => {
      return itemPicture.pictures.url;
    });

  if (item.comments !== undefined)
    reviews = item.comments.map((comment) => {
      return comment.comment;
    });

  return {
    id: item.id,
    imageUrl: item.imageUrl,
    description: item.description,
    price: item.price,
    discount: item.discount,
    dateAdded: item.created_at,
    supplier: {
      id: item.supplier.id,
      name: item.supplier.name,
      phone: item.supplier.phone,
      address: item.supplier.address,
      email: item.supplier.email,
    },
    productRating: item.productRating,
    ratingDetails: {
      1: item.oneStar,
      2: item.twoStar,
      3: item.threeStar,
      4: item.fourStar,
      5: item.fiveStar,
    },
    tags,
    imageArray,
    reviews,
  };
}

export function formatManyItems(items: Item[]) {
  const formattedItemArray = items.map((item) => formatOneItem(item));

  return formattedItemArray;
}
