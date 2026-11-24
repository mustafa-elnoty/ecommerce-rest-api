import bcrypt from "bcryptjs";

import userModel from "../../models/user-model.js";
import * as factory from "./crud-service.js";
import ApiError from "../../utils/api-error.js";

export const getById = factory.getById({ Model: userModel, modelName: "User" });

export const getDoc = factory.getDoc({
  Model: userModel,
  modelName: "User",
  defaultFields: "-addresses",
});

export const update = factory.update({
  Model: userModel,
  modelName: "User",
});

export const changePassword = async ({ id, reqBody }) => {
  const { currentPassword, newPassword } = reqBody;

  const user = await userModel.findOne({ _id: id }).select("+password");

  if (!user) throw new ApiError(`User not found`, 404);

  const correctPassword = await bcrypt.compare(currentPassword, user.password);

  if (!correctPassword) throw new ApiError("Incorrect current password", 400);

  user.password = newPassword;
  user.refreshTokenHash = undefined;
  user.loggedOutAt = Date.now();

  await user.save();
};

export const deactivateProfile = async ({ id }) => {
  const result = await userModel.updateOne({ _id: id }, { active: false });
  if (!result.matchedCount) throw new ApiError(`User not found`, 404);
};
