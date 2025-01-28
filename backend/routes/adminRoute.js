
import express from 'express';
import {addAdmin, addFaculty, addStudent, deleteFaculty, deleteStudent, getAdmin, getAllAdmins, getFaculty, getProfile, getStudent, loginHandler} from '../controllers/admin.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';
import { addNotice, deleteNotice, getNotice } from '../controllers/notice.js';
const adminroute = express.Router();

adminroute.post('/login', loginHandler);
adminroute.post('/addAdmin',adminMiddleware,addAdmin);
adminroute.get('/getAdmin',adminMiddleware,getAdmin);
adminroute.get('/getallAdmin',adminMiddleware,getAllAdmins);
adminroute.post("/addStudent",adminMiddleware,addStudent);
adminroute.post("/getStudent",adminMiddleware,getStudent);
adminroute.post("/addFaculty",adminMiddleware,addFaculty)
adminroute.get("/getFaculty",adminMiddleware,getFaculty);
adminroute.delete("/deleteFaculty",adminMiddleware,deleteFaculty);
adminroute.delete("/deleteStudent",adminMiddleware,deleteStudent);
adminroute.post("/addNotice",adminMiddleware,addNotice);
adminroute.delete("/deleteNotice",adminMiddleware,deleteNotice);
adminroute.get("/getNotice",adminMiddleware,getNotice);
adminroute.get("/getProfile",adminMiddleware,getProfile)


export default adminroute;
