import jwt from "jsonwebtoken";
import faculty from "../models/facultyModel.js"; // Assuming you have a faculty model

const facultyAuthMiddleware = async (req, res, next) => {
  // Check if the token is present in the Authorization header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the faculty from the database using the decoded ID
    const foundFaculty = await faculty.findById(decoded.id);

    if (!foundFaculty) {
      return res.status(404).json({ message: "Access Denied Not a Faculty" });
    }

    // Attach the faculty details to the request object for further use
    req.facultyId = foundFaculty.id;

    
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Token verification failed", error);
    res.status(400).json({ message: "Invalid or expired token." });
  }
};

export default facultyAuthMiddleware;
