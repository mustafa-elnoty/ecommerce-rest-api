import asyncHandler from "express-async-handler";

import * as wishlistService from "../services/database/wishlist-service.js";

export const getWishlist = asyncHandler(async (req, res, next) => {
  const wishlist = await wishlistService.getWishlist({ userId: req.user._id });

  res.status(200).json({ data: wishlist });
});

export const addProduct = asyncHandler(async (req, res, next) => {
  const wishlist = await wishlistService.addProduct({
    userId: req.user._id,
    productId: req.body.productId,
  });

  res.status(200).json({ data: wishlist });
});

export const removeProduct = asyncHandler(async (req, res, next) => {
  await wishlistService.removeProduct({
    userId: req.user._id,
    productId: req.params.productId,
  });

  res.status(204).send();
});
