import { isAuth } from "@middlewares/authMiddleware";
import { Router } from "express";
import { folderFormPost } from "@controllers/folderController";

const folderRoute = Router();

folderRoute.post("/new", isAuth, folderFormPost);

export default folderRoute;
