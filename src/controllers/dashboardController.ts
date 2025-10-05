import { Request, Response, NextFunction } from "express";
import * as db from "@db/index";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

export const loginFormGet = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.render("log-in-form", {
    errors: {},
    old: {},
    authError: res.locals.authError,
  });
};

export const signupFormGet = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.render("sign-up-form", {
    errors: {},
    old: {},
  });
};

export const fileUploadFormGet = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.render("new-file-form", {
      errors: {},
      old: {},
    });
  } catch (error) {
    console.log("Error while getting the file upload form: ", error);
  }
};

export const fileUploadPost = () => {
  try {
  } catch (error) {
    console.log("Error while uploading file: ", error);
  }
};

export const signupFormPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const { success } = await db.insertNewUser({
      name,
      email,
      username,
      password: hashedPassword,
    });
    if (success) {
      console.log("Success", name, email, username, password);
      res.status(201).redirect("/log-in");
    }
  } catch (error) {
    console.log("Error on signup form post: ", error);
  }
};
