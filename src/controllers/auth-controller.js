import asyncHandler from "express-async-handler";

import * as authService from "../services/database/auth-service.js";
import REFRESH_TOKEN_COOKIE_OPTIONS from "../constants/cookie-options.js";
import AUTH_RESPONSE_FIELDS from "../constants/auth-fields.js";
import pickAllowedFields from "../helpers/pick-allowed-fields.js";

const sendAuthResponse = (
  res,
  statusCode,
  { user, accessToken, refreshToken },
) => {
  res.cookie("refreshToken", refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);

  res.status(statusCode).json({
    data: pickAllowedFields(AUTH_RESPONSE_FIELDS, user),
    accessToken,
  });
};

export const register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const { user, accessToken, refreshToken } = await authService.registerUser({
    firstName,
    lastName,
    email,
    password,
  });

  sendAuthResponse(res, 201, { user, accessToken, refreshToken });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const { user, accessToken, refreshToken } = await authService.login({
    email,
    password,
  });

  sendAuthResponse(res, 200, { user, accessToken, refreshToken });
});

export const refreshAccessToken = asyncHandler(async (req, res, next) => {
  const { refreshToken } = req.cookies;

  const accessToken = await authService.refreshAccessToken({ refreshToken });

  res.status(200).json({ accessToken });
});

export const logout = asyncHandler(async (req, res, next) => {
  const { refreshToken } = req.cookies;

  await authService.logout({ refreshToken });

  res.clearCookie("refreshToken", REFRESH_TOKEN_COOKIE_OPTIONS);
  res.status(204).send();
});

export const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  await authService.forgotPassword({ email });

  res.status(200).json({
    message: "If an account exists for this email, a reset code has been sent",
  });
});

export const verifyResetCode = asyncHandler(async (req, res, next) => {
  const { email, resetCode } = req.body;

  const resetToken = await authService.verifyResetCode({ email, resetCode });

  res.status(200).json({ resetToken });
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  const { resetToken, newPassword } = req.body;

  await authService.resetPassword({ resetToken, newPassword });

  res.status(200).json({
    message: "Password reset successfully. Please login again",
  });
});
