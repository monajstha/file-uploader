import { isAuth } from "@middlewares/authMiddleware";
import { Router } from "express";
import { folderFilesGet } from "@controllers/folderController";
import upload from "@middlewares/multer";
import { fileFormPost } from "@controllers/fileController";

const fileRoute = Router();

fileRoute.post("/new", isAuth, upload.single("fileUpload"), fileFormPost);
fileRoute.get("/:folderId", isAuth, folderFilesGet);

export default fileRoute;
