import jwt from "jsonwebtoken";
import faculty from "../models/facultyModel.js"; // Import the faculty model
const facultyAuthMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const foundFaculty = await faculty.findById(decoded.id);

    if (!foundFaculty) {
      return res.status(404).json({ message: "Access Denied Not a Faculty" });
    }
    req.id = foundFaculty.id;
    req.user = foundFaculty.profile;
    next();
  } catch (error) {
    console.error("Token verification failed", error);
    res.status(400).json({ message: "Invalid or expired token." });
  }
};

export default facultyAuthMiddleware;
