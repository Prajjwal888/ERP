import express from 'express';
import {getMarks, getMaterial, getStudent, loginHandler} from '../controllers/student.js';
import { studentAuthMiddleware } from '../middleware/studentMiddleware.js';
import { getTimeTable } from '../controllers/student.js';   
import { getNotice } from '../controllers/notice.js';
import { getSubject } from '../controllers/student.js';
const studentRouter = express.Router();

studentRouter.post('/login', loginHandler);
studentRouter.get('/getNotice',studentAuthMiddleware,getNotice);
studentRouter.get('/getTimeTable',studentAuthMiddleware,getTimeTable);
studentRouter.get('/getStudent',studentAuthMiddleware,getStudent);
studentRouter.get('/getMarks',studentAuthMiddleware,getMarks);
studentRouter.get('/getSubject',studentAuthMiddleware,getSubject);
studentRouter.get('/getMaterial/:id',studentAuthMiddleware,getMaterial);

export default studentRouter ;

