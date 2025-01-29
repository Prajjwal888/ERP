
import express from 'express';
import {addAdmin, addFaculty, addStudent, deleteFaculty, deleteStudent, getAdmin, getAllAdmins, getFaculty, getProfile, getStudent, loginHandler} from '../controllers/admin.js';
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


export default adminroute;
