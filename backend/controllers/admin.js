import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import admin from "../models/adminModel.js";
import student from "../models/studentModel.js";
import faculty from "../models/facultyModel.js";

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
    // Find user in the database
    const user = await admin.findOne({ loginid: loginid });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id,
        profile: user.profile,  // Add the profile data here
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

const addAdmin = async (req, res) => {
  const adminSchema = z.object({
    loginid: z.number().int(),
    password: z.string().min(6),
    employeeId: z.number().int(),
    firstName: z.string(),
    middleName: z.string().optional(),
    lastName: z.string(),
    email: z.string().email(),
    phoneNumber: z.number().int(),
    gender: z.enum(["Male", "Female", "Other"])
    
  });

  // Validate input
  const validationResult = adminSchema.safeParse(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      msg: "Invalid inputs",
      errors: validationResult.error.errors, 
    });
  }

  const { loginid, password, ...adminData } = validationResult.data;

  try {
    // Check if the admin already exists
    const existingAdmin = await admin.findOne({ loginid });
    if (existingAdmin) {
      return res.status(400).json({
        msg: "Admin already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new admin
    
    const newAdmin = await admin.create({
      ...adminData,
      loginid,
      password: hashedPassword,
      profile: "Admin"
    });

    return res.status(201).json({
      msg: "Admin created successfully!",
      admin: {
        id: newAdmin._id,
        loginid: newAdmin.loginid,
        employeeId: newAdmin.employeeId,
        firstName: newAdmin.firstName,
        lastName: newAdmin.lastName,
        email: newAdmin.email,
      },
    });
  } 
  catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "An error occurred while creating the admin",
      
    });
  }
};

const getAdmin = async (req, res) => {
  const schema = z.object({ loginid: z.number().int() });
  
  const validationResult = schema.safeParse(req.body);
  
  if (!validationResult.success) {
    return res.status(400).json({
      msg: "Invalid Inputs",
      errors: validationResult.error.errors,
    });
  }

  const { loginid } = validationResult.data;

  try {
    // Select only the required fields and exclude sensitive ones
    const existingAdmin = await admin.findOne({ loginid }).select(
      "-_id -password -createdAt -updatedAt"
    );
    
    if (!existingAdmin) {
      return res.status(404).json({
        msg: "No admin exists for this input",
      });
    }
    
    return res.status(200).json({
      existingAdmin,
    });
  } 
  catch (e) {
    return res.status(500).json({
      msg: "An error occurred while fetching",
      error: e.message,
    });
  }
};


const getAllAdmins = async (req, res) => {
  try {
    // Fetch all admins and exclude sensitive fields
    const admins = await admin.find().select("-_id -password -createdAt -updatedAt");

    if (admins.length === 0) {
      return res.status(404).json({
        msg: "No admins found",
      });
    }

    return res.status(200).json({
      admins,
    });
  } catch (e) {
    return res.status(500).json({
      msg: "An error occurred while fetching admins",
      error: e.message,
    });
  }
};

const addStudent = async (req, res) => {
  const studentSchema = z.object({
    loginid: z.number().int(),
    password: z.string().min(8),
    enrollmentNo: z.number().int(),
    firstName: z.string().min(1),
    middleName: z.string().optional(),
    lastName: z.string().min(1),
    email: z.string().email(),
    phoneNumber: z.number().int(),
    semester: z.number().int(),
    branch: z.string().min(1),
    gender: z.enum(["Male", "Female", "Other"]),
    profile: z.string().min(1),
  });

  const validationResult = studentSchema.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(400).json({
      msg: "Invalid inputs",
      errors: validationResult.error.errors,
    });
  }

  const { loginid, password, ...studentData } = validationResult.data;

  try {
    // Check if the student already exists
    const existingStudent = await student.findOne({ loginid });
    if (existingStudent) {
      return res.status(400).json({
        msg: "Student with this login ID already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new student
    const newStudent = await student.create({
      loginid,
      password: hashedPassword,
      ...studentData,
    });

    return res.status(201).json({
      msg: "Student created successfully!",
      student: {
        loginid: newStudent.loginid,
        enrollmentNo: newStudent.enrollmentNo,
        firstName: newStudent.firstName,
        lastName: newStudent.lastName,
        email: newStudent.email,
        semester: newStudent.semester,
        branch: newStudent.branch,
      }, // Returning only the required fields in the response
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Error while creating a new student",
      error: e.message,
    });
  }
};

const getStudent = async (req, res) => {
  const getSchema = z.object({ loginid: z.number().int() }); 
  
  const validationResult = getSchema.safeParse(req.body);
  
  if (!validationResult.success) {
    return res.status(400).json({
      msg: "Invalid inputs",
      errors: validationResult.error.errors, // Include detailed errors for better debugging
    });
  }

  const { loginid } = validationResult.data;

  try {
    const existingStudent = await student
      .findOne({ loginid })
      .select("-_id -password -createdAt -updatedAt"); // Exclude sensitive fields
    
    if (!existingStudent) {
      return res.status(404).json({
        msg: "Student doesn't exist",
      });
    }

    return res.status(200).json({
      student: existingStudent, // Return the student object
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Error while fetching student",
      error: e.message,
    });
  }
};

const deleteStudent = async(req,res)=>{
  try{
    const deletedStudent = await student.findOneAndDelete({ loginid : req.body.loginid });
    if(!deletedStudent){
      return res.status(400).json({
        msg : "student doesn't exist"
      })
    }
    return res.status(200).json({
      msg : "student deleted successfuly!",
      deletedStudent
    })
  }
  catch(e){
    return res.status(500).json({
      msg : "error deleting student",
      error : e.message
    })
  }
}

const addFaculty = async (req, res) => {
  const facultySchema = z.object({
    loginid: z.number().int().min(1),
    password: z.string().min(8),
    employeeId: z.number().int().min(0),
    firstName: z.string().min(1),
    middleName: z.string().optional(),
    lastName: z.string().min(1),
    email: z.string().email(),
    phoneNumber: z.number().int(),
    department: z.string().min(1),
    gender: z.enum(["Male", "Female", "Other"]),
    experience: z.number().min(0),
    post: z.string().min(1),
    profile: z.string(),
  });

  // Validate the request body
  const validationResult = facultySchema.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(400).json({
      msg: "Invalid inputs",
      errors: validationResult.error.errors,
    });
  }

  const { loginid } = req.body; // Extract `loginid` to check for existing faculty

  try {
    // Check if a faculty member with the same loginid already exists
    const existingFaculty = await faculty.findOne({ loginid });
    if (existingFaculty) {
      return res.status(400).json({
        msg: "Faculty already exists",
      });
    }

    // Create a new faculty document
    const newFaculty = await faculty.create(req.body);
    return res.status(201).json({
      msg: "Faculty created successfully!",
      faculty: newFaculty,
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Error creating faculty",
      error: e.message,
    });
  }
};

const getFaculty = async(req,res)=>{

  const schema = z.object({loginid : z.number().int().min(1)});
  const validationResult = schema.safeParse(req.body);
  
  if(!validationResult.success){
    return res.status(400).json({
      msg : "Invalid inputs",
      error :validationResult.error.errors
    })
  }
  try{
  
    const existingFaculty = await faculty.findOne({loginid:validationResult.data.loginid});
    if(!existingFaculty){
      res.status(400).json({
        msg : "Faculty doesn't exist"
      })
    }
    return res.status(200).json({
      existingFaculty
    })

  }
  catch(e){
    res.status(500).json({
      msg : "error fetching faculty",
      error : e.message
    })
  }
}

const deleteFaculty = async (req, res) => {
  try {
    const { loginid } = req.body;


    // Try to find and delete the faculty using the loginid
    const deletedFaculty = await faculty.findOneAndDelete({ loginid });

    if (!deletedFaculty) {
      return res.status(400).json({
        msg: "Faculty doesn't exist"
      });
    }

    return res.status(200).json({
      msg: "Faculty deleted successfully",
      deletedFaculty
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Error deleting faculty",
      error: e.message
    });
  }
};




export { loginHandler , addAdmin, getAdmin, getAllAdmins, addStudent ,getStudent ,addFaculty ,getFaculty ,deleteFaculty , deleteStudent};
