export const ALLOWED_PRODUCT_CREATE_FIELDS = [
  "title",
  "description",
  "quantity",
  "price",
  "discountPercentage",
  "variants",
  "imageCover",
  "images",
  "category",
  "subCategories",
  "brand",
];

export const ALLOWED_PRODUCT_UPDATE_FIELDS = [
  "title",
  "description",
  "quantity",
  "price",
  "discountPercentage",
  "imageCover",
  "category",
  "subCategories",
  "brand",
];

export const ALLOWED_PRODUCT_FILTER_FIELDS = [
  "category",
  "subCategories",
  "brand",
  "price",
  "priceAfterDiscount",
  "discountPercentage",
  "avgRatings",
  "variants.color",
  "variants.size",
  "variants.isAvailable",
];

export const ALLOWED_PRODUCT_SORT_FIELDS = [
  "title",
  "price",
  "priceAfterDiscount",
  "discountPercentage",
  "avgRatings",
  "ratingsCount",
  "createdAt",
];

export const ALLOWED_PRODUCT_SELECT_FIELDS = [
  "title",
  "slug",
  "description",
  "price",
  "priceAfterDiscount",
  "discountPercentage",
  "imageCover",
  "images",
  "category",
  "subCategories",
  "brand",
  "variants",
  "avgRatings",
  "ratingsCount",
  "createdAt",
];
