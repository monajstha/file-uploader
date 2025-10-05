import { Request, Response, NextFunction } from "express";
import { isAuth } from "@middlewares/authMiddleware";
import { postValidation } from "@middlewares/validators/postValidator";
import { Router } from "express";
import { validationResult } from "express-validator";
import { fileUploadFormGet } from "@controllers/dashboardController";

const dashboardRoute = Router();

dashboardRoute.get("/new", isAuth, fileUploadFormGet);
// dashboardRoute.get("/new", isAuth, newPostFormGet);
// dashboardRoute.post(
//   "/new",
//   isAuth,
//   postValidation,
//   (req: Request, res: Response, next: NextFunction) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).render("new-post-form", {
//         errors: errors.mapped(),
//         old: req.body,
//       });
//     }
//     next();
//   },
//   newPostFormPost
// );

export default dashboardRoute;
