import express from 'express';
import {loginHandler,getFaculty,getStudent} from '../controllers/faculty.js';
import facultyAuthMiddleware from '../middleware/facultyMiddleware.js';
import upload from '../middleware/multerMiddleware.js';
import { puttimeTable } from '../controllers/faculty.js';
import { getNotice } from '../controllers/notice.js';

const facultyRouter = express.Router();

facultyRouter.post('/login', loginHandler);
facultyRouter.get('/getFaculty',facultyAuthMiddleware,getFaculty);
facultyRouter.get('/getStudent',facultyAuthMiddleware,getStudent);
facultyRouter.get('/getNotice',facultyAuthMiddleware,getNotice);

facultyRouter.post('/uploadTimetable',facultyAuthMiddleware,upload.single('image'),puttimeTable);

export default facultyRouter;

