import asyncHandler from "express-async-handler";

import * as profileService from "../services/database/profile-service.js";
import * as factory from "./crud-controller.js";
import PROFILE_FIELDS from "../constants/profile-fields.js";

export const getProfile = factory.getDoc({
  service: profileService,
  getIdFromUser: true,
});

export const updateProfile = factory.update({
  fieldsToUpdate: PROFILE_FIELDS,
  service: profileService,
  imageField: "profileImage",
  folderName: "users",
  getIdFromUser: true,
});

export const updatePassword = asyncHandler(async (req, res, next) => {
  await profileService.changePassword({
    id: req.user._id,
    reqBody: req.body,
  });

  res.sendStatus(204);
});

export const deactivateProfile = asyncHandler(async (req, res, next) => {
  await profileService.deactivateProfile({
    id: req.user._id,
  });

  res.sendStatus(204);
});
