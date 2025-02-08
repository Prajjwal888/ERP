import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: async (req, file) => {
    return {
      folder: "ERP",
      format: file.mimetype.split("/")[1],
      resource_type: file.mimetype.startsWith("video") ? "video" : "image",
    };
  },
});

const upload = multer({ storage });
export { cloudinary, storage, upload };
