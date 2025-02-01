import jwt from "jsonwebtoken";
import student from "../models/studentModel.js"; // Assuming you have a student model

const studentAuthMiddleware = async (req, res, next) => {
  // Check if the token is present in the Authorization header
  const token = req.header("Authorization")?.replace("Bearer ", "");
  // console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }
  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the student from the database using the decoded ID
    const foundStudent = await student.findById(decoded.id);

    if (!foundStudent) {
      return res.status(404).json({ message: "Access Denied. Not a Student" });
    }
    // Attach the student details to the request object for further use
    req.id = foundStudent.id;
    req.profile = foundStudent.profile;
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Token verification failed", error);
    res.status(400).json({ message: "Invalid or expired token." });
  }
};

export {studentAuthMiddleware};