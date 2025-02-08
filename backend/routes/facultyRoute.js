import express from 'express';
import {loginHandler,getFaculty,getStudent, renderStudent, addMarks, getFacultySubjects} from '../controllers/faculty.js';
import facultyAuthMiddleware from '../middleware/facultyMiddleware.js';
// import upload from '../middleware/multerMiddleware.js';
import { puttimeTable } from '../controllers/faculty.js';
import { addNotice, getNotice,deleteNotice } from '../controllers/notice.js';
import { putMaterial } from '../controllers/faculty.js';
import { getBranch,getSubject } from '../controllers/faculty.js';

import { upload } from '../config/cloudinary.js';

const facultyRouter = express.Router();

facultyRouter.post('/login', loginHandler);
facultyRouter.get('/getFaculty',facultyAuthMiddleware,getFaculty);
facultyRouter.post('/getStudent',facultyAuthMiddleware,getStudent);
facultyRouter.get('/getNotice',facultyAuthMiddleware,getNotice);
facultyRouter.post('/uploadTimetable',facultyAuthMiddleware,upload.single('file'),puttimeTable);
facultyRouter.post('/uploadMaterial',facultyAuthMiddleware,upload.single('file'),putMaterial);
facultyRouter.post("/renderStudent",facultyAuthMiddleware,renderStudent);
facultyRouter.post("/addMarks",facultyAuthMiddleware,addMarks);
facultyRouter.get('/getBranch',facultyAuthMiddleware,getBranch);
facultyRouter.post('/getSubject',facultyAuthMiddleware,getSubject);
facultyRouter.post('/addNotice',facultyAuthMiddleware,addNotice);
facultyRouter.delete('/deleteNotice/:id',facultyAuthMiddleware,deleteNotice);
facultyRouter.get('/getFacultySubjects',facultyAuthMiddleware,getFacultySubjects);
export default facultyRouter;
