import multer from "multer";
import fs from "fs";
import path from "path";

// Ensure the 'uploads' directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Define storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExt = path.extname(file.originalname); // Extracts file extension
    cb(null, `${file.fieldname}-${uniqueSuffix}${fileExt}`);
  },
});

// File filter function
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/png", "image/jpeg", "application/pdf", "video/mp4"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PNG, JPG, PDF, and MP4 are allowed."), false);
  }
};

// Set up multer upload middleware
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // Max file size 50MB
});

export default upload;