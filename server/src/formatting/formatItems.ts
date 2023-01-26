import { Item } from "../model";
import { FormattedItemResponse } from "../types";

export function formatOneItem(item: Item): FormattedItemResponse {
  const tags = item.itemTag.map((itemTag) => {
    return itemTag.tag.name;
  });

  const pictures = item.itemPicture.map((itemPicture) => {
    return itemPicture.pictures.url;
  });

  return {
    id: item.id,
    name: item.name,
    price: item.price,
    height: item.height,
    width: item.width,
    length: item.length,
    supplier: {
      id: item.supplier.id,
      name: item.supplier.name,
      phone: item.supplier.phone,
      address: item.supplier.address,
      email: item.supplier.email,
    },
    tags,
    pictures,
  };
}

export function formatManyItems(items: Item[]): FormattedItemResponse[] {
  const formattedItemArray = items.map((item) => formatOneItem(item));

  return formattedItemArray;
}
