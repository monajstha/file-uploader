import { Request, Response, NextFunction } from "express";
import * as db from "@db/index";
import getDayAndTime from "@utils/helpers/dateAndTime";

export const folderFormPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    if (req.user) {
      await db.insertNewFolder({ name, userId: req.user.id });
    }
  } catch (error) {
    console.log("Error while submitting folder form: ", error);
  }
};

export const allFoldersGet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const folders = await db.getAllFolders();
    // console.log({ folders });
    res.render("dashboard", {
      folders,
      getDayAndTime,
    });
  } catch (error) {
    console.log("Error while getting folders and files: ", error);
  }
};
