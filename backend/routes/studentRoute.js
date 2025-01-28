import express from 'express';
import {loginHandler} from '../controllers/student.js';
import {getNotice} from '../controllers/notice.js';
import { studentAuthMiddleware } from '../middleware/studentMiddleware.js';
import { getTimeTable } from '../controllers/student.js';   
const studentRouter = express.Router();

studentRouter.post('/login', loginHandler);
studentRouter.get('/getNotice',studentAuthMiddleware,getNotice);
studentRouter.get('/getTimeTable',studentAuthMiddleware,getTimeTable);

export default studentRouter ;

