import express from 'express';
import {addAdmin, addStudent, getAdmin, getAllAdmins, getStudent, loginHandler} from '../controllers/admin.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';
const adminroute = express.Router();

adminroute.post('/login', loginHandler);
adminroute.post('/addAdmin',adminMiddleware,addAdmin);
adminroute.get('/getAdmin',adminMiddleware,getAdmin);
adminroute.get('/getallAdmin',adminMiddleware,getAllAdmins);
adminroute.post("/addStudent",adminMiddleware,addStudent);
adminroute.get("/getStudent",adminMiddleware,getStudent)

export default adminroute;

