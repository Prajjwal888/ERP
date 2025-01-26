import express from 'express';
import {addAdmin, addStudent, getAdmin, getAllAdmins, getStudent, loginHandler} from '../controllers/admin.js';
import { authMiddleware } from '../middleware/middleware.js';
const adminroute = express.Router();

adminroute.post('/login', loginHandler);
adminroute.post('/addAdmin',authMiddleware,addAdmin);
adminroute.get('/getAdmin',authMiddleware,getAdmin);
adminroute.get('/getallAdmin',authMiddleware,getAllAdmins);
adminroute.post("/addStudent",authMiddleware,addStudent);
adminroute.get("/getStudent",authMiddleware,getStudent)

export default adminroute;

