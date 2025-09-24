import { User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(401)
      //   .json({ msg: "You are not authenticated to view this resource" });
      .redirect("/log-in");
  }
};

export const isClubMember = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated() && (req.user as User)) {
    next();
  } else {
    res
      .status(401)
      .json({ msg: "You are not authenticated to view this resource" });
    //   .redirect("/log-in");
  }
};
