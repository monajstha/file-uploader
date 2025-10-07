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
    res.redirect("/");
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
    if (!req.user)
      throw new Error(
        "Unauthenticated user. Please login first to access this page!"
      );
    const folders = await db.getAllFolders(req.user?.id);
    // console.log({ folders });
    res.render("dashboard", {
      folders,
      getDayAndTime,
    });
  } catch (error) {
    console.log("Error while getting folders: ", error);
  }
};

export const folderFilesGet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { folderId } = req.params;
    if (!folderId) return;

    const folder = await db.getAllFilesFromFolder(folderId);
    if (!folder) return;
    const { name, files } = folder;
    res.render("folder-details", {
      name,
      files,
      folderId,
      getDayAndTime,
    });
  } catch (error) {
    console.log("Error while getting files: ", error);
  }
};
