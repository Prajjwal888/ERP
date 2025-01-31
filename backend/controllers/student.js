import student from "../models/studentModel.js";
import { z } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import timeTable from "../models/timeTableModel.js";

const loginHandler = async (req, res) => {
  const signinSchema = z.object({
    loginid: z.number().int(),
    password: z.string().min(8),
  });

  const validationResult = signinSchema.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(400).json({
      message: "Invalid inputs",
    });
  }

  const { loginid, password } = validationResult.data;

  try {
    const existingStudent = await student.findOne({ loginid });
    if (!existingStudent) {
      return res.status(404).json({
        message: "No records found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password,existingStudent.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Password does not match",
      });
    }

    const token = jwt.sign(
        { id: existingStudent._id, 
          profile: existingStudent.profile,  // Add the profile data here
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // Token expires in 1 hour
      );

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } 
  
  catch (error) {
    return res.status(500).json({
      message: "An error occurred during login",
    });
  }
};

  
const getTimeTable = async (req, res) => {
  try {
    const id = req.id; 
    const profile = req.profile;
    const studata = await student.findOne({ _id: id }).select("semester branch");
         if(!studata){
          return res.status(400).json({message:"Student not found"});

         }
          const {branch,semester}= studata;

          const timetable =await timeTable.findOne({branch,semester}).select("image");
          if(!timetable){
            return res.status(400).json("No timetable to show");

          }
    res.status(200).json(timetable);
  } catch (error) {
    console.error("Error fetching timetable:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getStudent = async(req,res)=>{
  const id = req.id;
  try{
    const newStudent = await student.findOne({_id : id});
    if(!newStudent){
      return res.status(400).json({
        msg : "student doesn't exist"
      })
    }
    return res.status(200).json({
      msg : "student retrieved successfully!",
      newStudent
    })
  }
  catch(e){
     return res.status(500).json({
      msg : "erro fetching students",
      error: e.message
     })
  }
}

const getMarks = async (req, res) => {
  try {
    // Extract student ID from the request (set in middleware)
    const studentId = req.id;

    // Get semester from query params
    const { semester } = req.query; 

    if (!semester) {
      return res.status(400).json({ msg: "Semester is required" });
    }

    // Find the student and populate subject details
    const student = await Student.findById(studentId)
      .populate({
        path: "subjects.subject",
        match: { semester: Number(semester) }, // Filter subjects by semester
        select: "name semester" // Select only name and semester fields
      });

    // If student not found, return error
    if (!student) {
      return res.status(404).json({ msg: "Student not found" });
    }

    // Filter out subjects that were not matched (i.e., not from the requested semester)
    const filteredMarks = student.subjects
      .filter((sub) => sub.subject !== null) // Remove unmatched subjects
      .map((sub) => ({
        subject: sub.subject.name, // Subject name from populated data
        marks: sub.marks, // Marks obtained
      }));

    return res.status(200).json({
      msg: `Marks for Semester ${semester} retrieved successfully`,
      marks: filteredMarks,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error fetching marks",
      error: error.message,
    });
  }
};



export { loginHandler, getTimeTable,getStudent,getMarks };