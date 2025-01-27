import student from "../models/studentModel.js";
import { z } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const loginHandler = async (req, res) => {
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

// export const signupHandler = async (req, res) => {
//     const signupSchema = z.object({
//       loginid: z.number().int(),
//       password: z.string().min(8),
//       enrollmentNo: z.number().int(),
//       firstName: z.string(),
//       middleName: z.string().optional(), // Optional middle name
//       lastName: z.string(),
//       email: z.string().email(),
//       phoneNumber: z.number().int(),
//       semester: z.number().int(),
//       branch: z.string(),
//       gender: z.string(),
//       profile: z.string(),
//     });
  
//     const validationResult = signupSchema.safeParse(req.body);
  
//     if (!validationResult.success) {
//       return res.status(400).json({
//         message: "Invalid inputs",
//         errors: validationResult.error.errors,
//       });
//     }
  
//     const { password, ...studentData } = validationResult.data;
  
//     try {
//       // Check if the student with this loginid already exists
//       const existingStudent = await student.findOne({ loginid: studentData.loginid });
  
//       if (existingStudent) {
//         return res.status(409).json({
//           message: "Student with this login ID already exists",
//         });
//       }
  
//       // Hash the password
//       const hashedPassword = await bcrypt.hash(password, 10);
  
//       // Create and save the new student
//       const newStudent = new student({
//         ...studentData,
//         password: hashedPassword,
//       });
  
//       await newStudent.save();
  
//       return res.status(201).json({
//         message: "Student registered successfully",
//       });
//     } 
    
//     catch (error) {
//       console.error(error);
//       return res.status(500).json({
//         message: "An error occurred during registration",
//         error: error.message,
//       });
//     }
//   };
  

