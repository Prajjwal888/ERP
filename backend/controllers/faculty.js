import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import faculty from "../models/facultyModel.js";
import student from "../models/studentModel.js";
import timeTable from "../models/timeTableModel.js";
import material from "../models/MaterialModel.js";
import subject from "../models/subjectModel.js";
import {branch} from "../models/branchModel.js";
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
      {
        id: existingFaculty._id,
        profile: existingFaculty.profile, // Add the profile data here
      },
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
};

const getFaculty = async (req, res) => {
  try {
    const facultyId = req.id; // Get faculty ID from the request object (set by the middleware)

    // Fetch faculty details from the database using the facultyId
    const facultyData = await faculty
      .findById(facultyId)
      .select("-_id -password -createdAt -updatedAt");

    if (!facultyData) {
      return res.status(404).json({ message: "Faculty not found." });
    }

    // Return the faculty details
    // console.log(facultyData);
    res.status(200).json(facultyData);
  } catch (error) {
    console.error("Error fetching faculty profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getStudent = async (req, res) => {
  try {
    const { loginid } = req.body; // Get loginid from the request body

    if (!loginid) {
      return res.status(400).json({ message: "Login ID is required." });
    }

    // Fetch student details from the database using the loginid
    const studentData = await student
      .findOne({ loginid: loginid })
      .select("-_id -password -createdAt -updatedAt");
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

const puttimeTable = async (req, res) => {
  try {
    const { branch, semester } = req.body;
    const file = req.file ? req.file.filename : null;

    if (!file) {
      return res.status(400).json({ message: "File is required" });
    }

    const newtimetable = new timeTable({
      branch,
      semester,
      file,
    });
    await newtimetable.save();
    res.status(201).json(newtimetable);
  } catch (error) {
    console.error("Error creating timetable:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const putMaterial = async (req, res) => {
  try {
    const { title, subject: subjectName } = req.body;
    const file = req.file ? req.file.filename : null;
    if (!file) {
      return res.status(400).json({ message: "file is required" });
    }

    const facultyId = req.id;
    const subjectDoc = await subject.findOne({
      name: subjectName,
    });
    if (!subjectDoc) {
      return res.status(404).json({ message: "Subject not found." });
    }
    if (subjectDoc.faculty.toString() !== facultyId) {
      return res
        .status(403)
        .json({
          message:
            "You are not authorized to upload material for this subject.",
        });
    }
    const newMaterial = new material({
      title,
      subject: subjectDoc._id,
      file,
    });

    await newMaterial.save();

    res
      .status(201)
      .json({
        message: "Material uploaded successfully!",
        material: newMaterial,
      });
  } catch (error) {
    console.error("Error uploading material:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const renderStudent = async (req, res) => {
  const { branch, semester, subjectName } = req.body;
  console.log(req.body)
  console.log(semester);
  try {
    // Find the subject based on subjectName
    const subjectData = await subject.findOne({ name: subjectName });
    
    if (!subjectData) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // Find students matching branch, semester, and having the subject in their subjects array
    const students = await student
      .find({
        branch,
        semester,
        "subjects.subject": subjectData._id, // Check if subject exists in the subjects array
      })
      .select("-password");
    console.log(students);
    if (students.length === 0) {
      return res.status(404).json({ message: "No students found" });
    }

    return res.status(200).json(students);
  } catch (e) {
    console.error("Error fetching students:", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const addMarks = async (req, res) => {
  const { studentId, subjectName, marks } = req.body;
  console.log(req.body);

  try {
    // Fetch subject ID
    const subjectDoc = await subject.findOne({ name: subjectName });
    
    if (!subjectDoc) {
      return res.status(404).json({ message: "Subject not found" });
    }

    const subjectId = subjectDoc._id; // Correctly extracting _id

    // Fetch student
    const student2 = await student.findById(studentId);
    if (!student2) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Find subject in student's subjects array
    const subjectIndex = student2.subjects.findIndex(
      (sub) => sub.subject.toString() === subjectId.toString() // Convert to string for comparison
    );

    if (subjectIndex !== -1) {
      student2.subjects[subjectIndex].marks = marks;
    } else {
      student2.subjects.push({ subject: subjectId, marks });
    }

    await student2.save();

    return res.status(200).json({ message: "Marks updated successfully", student2 });
  } catch (error) {
    console.error("Error updating marks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getBranch = async (req, res) => {
  try {
    const branches = await branch.find({}, "name"); // Fetch only names
    const branchNames = branches.map(b => b.name); // Extract names into an array

    return res.status(200).json(branchNames);
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};



const getSubject = async (req, res) => {
  try {
    const { branchName, semester } = req.body;

    if (!branchName || !semester) {
      return res.status(400).json({ message: "Branch and semester are required" });
    }

    // Find the branch ObjectId using the branch name
    const branchData = await branch.findOne({ name: branchName });

    if (!branchData) {
      return res.status(404).json({ message: "Branch not found" });
    }

    // Query subjects using the branch ObjectId and semester number
    const subjects = await subject.find({
      branch: branchData._id, 
      semester,
    });

    // Extract only subject names
    const subjectNames = subjects.map((subj) => subj.name);

    return res.status(200).json(subjectNames);
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};
const getFacultySubjects = async (req, res) => {
  const facultyId = req.id;
  try {
    const subjects = await subject.find({ faculty: facultyId }, "name");
    return res.status(200).json(subjects);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}
export {
  loginHandler,
  getFaculty,
  getStudent,
  puttimeTable,
  putMaterial,
  renderStudent,
  addMarks,
  getBranch,
  getSubject,
  getFacultySubjects,
};
