import { Request, Response, NextFunction } from "express";

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
