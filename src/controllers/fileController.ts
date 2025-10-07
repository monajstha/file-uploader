import { Request, Response, NextFunction } from "express";
import * as db from "@db/index";
import getDayAndTime from "@utils/helpers/dateAndTime";

export const fileFormPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.file && req.user && req.body) {
      const { folderId } = req.body;
      const file_path = req.file ? `/uploads/${req.file.filename}` : null;
      await db.insertNewFile({
        name: req?.file?.filename,
        userId: req.user?.id,
        folderId,
      });
      res.redirect(`/folders/${folderId}`);
    }
  } catch (error) {
    console.log("Error while submitting folder form: ", error);
  }
};
