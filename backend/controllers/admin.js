import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import admin from "../models/adminModel.js";
import student from "../models/studentModel.js";
import faculty from "../models/facultyModel.js";
import { branch } from "../models/branchModel.js";
import  subject  from "../models/subjectModel.js";

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
      "-password -createdAt -updatedAt"
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
const getProfile = async(req,res)=>{
    
    try{
      const newAdmin = await admin.findOne({_id: req.id});
      if(!newAdmin){
        return res.status(400).json({
          msg : "no admin exist"
        })
      }
      return res.status(200).json({
        msg : "user fetched Successfully!",
        newAdmin
      })
    }
    catch(e){
      return res.status(500).json({
        msg : "error fetching admin",
        error : e.message,      })
    }
}

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
      .select("-password -createdAt -updatedAt"); // Exclude sensitive fields
    
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
    const {id}=req.params;
    const deletedStudent = await student.findOneAndDelete({ loginid : id});
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

  const { loginid, password } = req.body; 

  try {
    // Check if a faculty member with the same loginid already exists
    const existingFaculty = await faculty.findOne({ loginid });
    if (existingFaculty) {
      return res.status(400).json({
        msg: "Faculty already exists",
      });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create a new faculty document with the hashed password
    const newFaculty = await faculty.create({
      ...req.body,
      password: hashedPassword,  // Save the hashed password
    });

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
      return res.status(400).json({
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
    const { loginid } = req.params;


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

const addBranch = async (req, res) => {
  try {
    const { name } = req.body;

    
    const existingBranch = await branch.findOne({ name });
    if (existingBranch) {
      return res.status(400).json({
        msg: "Branch already exists",
      });
    }

    // Create 8 semesters with empty subjects
    const semesters = Array.from({ length: 8 }, (_, i) => ({
      semesterNumber: i + 1, 
      subjects: [],
    }));

    // Create new branch entry
    const newBranch = await branch.create({
      name,
      semesters,
    });

    return res.status(201).json({
      msg: "Branch added successfully!",
      branch: newBranch,
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Error adding branch",
      error: e.message,
    });
  }
};
const viewBranch = async(req,res)=>{
  try{
    const allBranch = await branch.find({});
    return res.status(200).json({
      allBranch,
    })
  }
  catch(e){
    return res.status(500).json({
      msg : "error fetching branch",
      error : e.message
    })
  }
}
const deleteBranch = async (req, res) => {
  try {
    const { id } = req.body;

    // Check if the branch exists
    const branchExists = await branch.findById(id);
    if (!branchExists) {
      return res.status(404).json({
        msg: "Branch not found",
      });
    }

    const deletedBranch = await branch.findByIdAndDelete(id);

    return res.status(200).json({
      msg: "Branch deleted successfully!",
      deletedBranch
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Error deleting branch",
      error: e.message,
    });
  }
};

const addSubject = async (req, res) => {
  try {
    const { branch: branchName, semester, loginid, ...restData } = req.body;

    // Find branch by name
    const findBranch = await branch.findOne({ name: branchName });
    if (!findBranch) {
      return res.status(400).json({
        msg: "No branch exists",
      });
    }

    // Find faculty by loginid
    const findFaculty = await faculty.findOne({ loginid });
    if (!findFaculty) {
      return res.status(400).json({
        msg: "No faculty exists",
      });
    }

    // Add subject to the Subject model
    const addedSubject = await subject.create({
      branch: findBranch._id,
      faculty: findFaculty._id,
      semester,
      ...restData,
    });

    // Add the subject to the correct semester in the branch
    const updatedBranch = await branch.findOneAndUpdate(
      { name: branchName, "semesters.semesterNumber": semester },
      { $push: { "semesters.$.subjects": addedSubject._id } },
      { new: true }
    );

    return res.status(201).json({
      msg: "Subject added successfully!",
      subject: addedSubject,
      updatedBranch,
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Error adding subject",
      error: e.message,
    });
  }
};

const viewSubject = async (req, res) => {
  const { branch: branchName, semester } = req.body;

  try {
    // Find the branch with the given name and semester, and populate subjects
    const foundBranch = await branch.findOne(
      { name: branchName, "semesters.semesterNumber": semester },
      { "semesters.$": 1 } // This ensures we only get the required semester
    ).populate("semesters.subjects"); // Populate subjects with full details

    if (!foundBranch) {
      return res.status(400).json({
        msg: "No subjects found for the given branch and semester",
      });
    }

    return res.status(200).json({
      msg: "Subjects retrieved successfully!",
      subjects: foundBranch.semesters[0].subjects,
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Error retrieving subjects",
      error: e.message,
    });
  }
};



const deleteSubject = async (req, res) => {
  const { id } = req.body; // Get the subject ID from the request body

  try {
    // Step 1: Find the subject by its ID
    const deletedSubject = await subject.findById(id);
    if (!deletedSubject) {
      return res.status(404).json({
        msg: "Subject not found",
      });
    }

    // Step 2: Delete the subject from the subject schema
    await subject.findByIdAndDelete(id);

    // Step 3: Extract the branchId and semester from the deleted subject
    const { branch: branchId, semester } = deletedSubject;

    // Step 4: Update the branch and remove the subject reference from the correct semester
    const updatedBranch = await branch.updateMany(
      { _id: branchId, "semesters.semesterNumber": semester },
      {
        $pull: {
          "semesters.$.subjects": id, // Remove the subject ID from the subjects array
        },
      }
    );

    // Check if any branch was updated
    if (updatedBranch.nModified === 0) {
      return res.status(400).json({
        msg: "No matching branch or semester found, subject not removed",
      });
    }

    // Step 5: Return success response
    return res.status(200).json({
      msg: "Subject deleted successfully and removed from the branch",
      deletedSubject,
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Error deleting subject",
      error: e.message,
    });
  }
};


export { loginHandler , addAdmin, getAdmin, getAllAdmins, addStudent ,getStudent ,addFaculty ,getFaculty ,deleteFaculty , deleteStudent,getProfile,addBranch,viewBranch,deleteBranch,addSubject,viewSubject,deleteSubject};
