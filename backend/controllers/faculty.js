import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import faculty from "../models/facultyModel.js";
import student from "../models/studentModel.js";

const loginSchema = z.object({
  loginid: z.number().min(1, "Login ID is required"),
  password: z.string().min(1, "Password is required"),
});

const loginHandler = async (req, res) => {
  // Use safeParse for validation
  const validationResult = loginSchema.safeParse(req.body);

  if (!validationResult.success) {
    // Handle validation errors
    return res.status(400).json({
      message: "Invalid Input",
      errors: validationResult.error.errors.map((err) => err.message), // Return detailed validation errors
    });
  }

  const { loginid, password } = validationResult.data;

  try {
    // Find existingFaculty in the database
    const existingFaculty = await faculty.findOne({ loginid: loginid });
    if (!existingFaculty) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, existingFaculty.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: existingFaculty._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    // Send success response
    res.json({
      success: true,
      message: "Login Successful",
      token: token,
    });
  } catch (error) {
    // Handle other errors
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const getFaculty = async (req, res) => {
  try {
    const facultyId = req.facultyId; // Get faculty ID from the request object (set by the middleware)

    // Fetch faculty details from the database using the facultyId
    const facultyData = await faculty.findById(facultyId ).select("-_id -password -createdAt -updatedAt");

    if (!facultyData) {
      return res.status(404).json({ message: "Faculty not found." });
    }

    // Return the faculty details
    res.status(200).json(facultyData);
  } catch (error) {
    console.error("Error fetching faculty profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const getStudent = async (req, res) => {
  try {
    const { loginid } = req.body; // Get loginid from the request body

    if (!loginid) {
      return res.status(400).json({ message: "Login ID is required." });
    }

    // Fetch student details from the database using the loginid
    const studentData = await student.findOne({ loginid: loginid }).select("-_id -password -createdAt -updatedAt");
    if (!studentData) {
      return res.status(404).json({ message: "Student not found." });
    }
res.status(200).json(studentData); 
    // Return the student details
   // Exclude password from the response
  } catch (error) {
    console.error("Error fetching student profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { loginHandler,getFaculty,getStudent};
