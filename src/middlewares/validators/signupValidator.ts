import { checkSchema } from "express-validator";
import * as db from "@db/index";

export const signupValidation = checkSchema({
  name: {
    trim: true,
    notEmpty: {
      errorMessage: "Name is required",
    },
    isLength: {
      options: { min: 2 },
      errorMessage: "Name must be at least 2 characters long",
    },
    escape: true,
  },
  username: {
    trim: true,
    notEmpty: {
      errorMessage: "Username is required",
    },
    isLength: {
      options: { min: 4 },
      errorMessage: "Username must be at least 4 characters long",
    },
    custom: {
      options: async (value: string) => {
        const user = await db.getUserByUsername(value);
        if (user) {
          throw new Error("Username already in use");
        }
        return true;
      },
    },
    escape: true,
  },
  email: {
    trim: true,
    notEmpty: {
      errorMessage: "Email is required",
    },
    isEmail: true,
    isLength: {
      options: { min: 4 },
      errorMessage: "Email must be at least 4 characters long",
    },
    custom: {
      options: async (value: string) => {
        const user = await db.getUserByEmail(value);
        if (user) {
          throw new Error("Email already in use");
        }
        return true;
      },
    },
    escape: true,
  },
  password: {
    notEmpty: {
      errorMessage: "Password is required",
    },
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters long",
    },
  },
  confirm_password: {
    notEmpty: {
      errorMessage: "Password is required",
    },
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match");
        }
        return true;
      },
    },
  },
});
