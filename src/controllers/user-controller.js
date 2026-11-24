import asyncHandler from "express-async-handler";

import * as userService from "../services/database/user-service.js";
import * as factory from "./crud-controller.js";

export const getUsers = factory.getDocs({ service: userService });

export const getUser = factory.getDoc({
  service: userService,
  fieldParamId: "userId",
});

export const updateUserRole = asyncHandler(async (req, res, next) => {
  const doc = await userService.updateRole({
    id: req.params.userId,
    role: req.body.role,
  });

  res.status(200).json({ data: doc });
});

export const updateUserActiveStatus = asyncHandler(async (req, res, next) => {
  await userService.updateUserActiveStatus({
    id: req.params.userId,
    active: req.body.active,
  });

  res.sendStatus(204);
});

export const deleteUser = factory.del({
  service: userService,
  imageFields: ["profileImage"],
  folderName: "users",
});
