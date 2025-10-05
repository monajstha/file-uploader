import { Request } from "express";
import multer, {
  Multer,
  Field,
  FileFilterCallback,
  DiskStorageOptions,
} from "multer";
import path from "path";

// Storage config
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, path.join(__dirname, "../../public/uploads")); // store inside public/uploads
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter (optional: only allow images)
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"));
  }
};

const upload = multer({
  storage,
  // fileFilter,
  limits: { fileSize: Number(process.env.MAX_FILE_SIZE) || 30 * 1024 * 1024 }, // 30 MB
});

export default upload;
