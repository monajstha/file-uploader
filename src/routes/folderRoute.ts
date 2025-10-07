import { isAuth } from "@middlewares/authMiddleware";
import { Router } from "express";
import { folderFilesGet, folderFormPost } from "@controllers/folderController";

const folderRoute = Router();

folderRoute.post("/new", isAuth, folderFormPost);
folderRoute.get("/:folderId", isAuth, folderFilesGet);

export default folderRoute;
