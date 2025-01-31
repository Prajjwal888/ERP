
import express from 'express';
import {addAdmin, addBranch, addFaculty, addStudent, addSubject, deleteBranch, deleteFaculty, deleteStudent, deleteSubject, getAdmin, getAllAdmins, getFaculty, getProfile, getStudent, loginHandler, viewBranch, viewSubject} from '../controllers/admin.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';
import { addNotice, deleteNotice, getNotice } from '../controllers/notice.js';
const adminroute = express.Router();

adminroute.post('/login', loginHandler);
adminroute.post('/addAdmin',adminMiddleware,addAdmin);
adminroute.post('/getAdmin',adminMiddleware,getAdmin);
adminroute.get('/getallAdmin',adminMiddleware,getAllAdmins);
adminroute.post("/addStudent",adminMiddleware,addStudent);
adminroute.post("/getStudent",adminMiddleware,getStudent);
adminroute.post("/addFaculty",adminMiddleware,addFaculty)
adminroute.post("/getFaculty",adminMiddleware,getFaculty);
adminroute.delete("/deleteFaculty/:id",adminMiddleware,deleteFaculty);
adminroute.delete("/deleteStudent/:id",adminMiddleware,deleteStudent);
adminroute.post("/addNotice",adminMiddleware,addNotice);
adminroute.delete("/deleteNotice/:id",adminMiddleware,deleteNotice);
adminroute.get("/getNotice",adminMiddleware,getNotice);
adminroute.get("/getProfile",adminMiddleware,getProfile)
adminroute.post("/addBranch",adminMiddleware,addBranch);
adminroute.get("/getBranch",adminMiddleware,viewBranch);
adminroute.delete("/deleteBranch/:id",adminMiddleware,deleteBranch);
adminroute.post("/addSubject",adminMiddleware,addSubject);
adminroute.post("/getSubject",adminMiddleware,viewSubject);
adminroute.delete("/deleteSubject/:id",adminMiddleware,deleteSubject);


export default adminroute;
