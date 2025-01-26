import express from 'express';
import {loginHandler,getFaculty,getStudent} from '../controllers/faculty.js';
import facultyAuthMiddleware from '../middleware/facultyMiddleware.js';
const facultyRouter = express.Router();

facultyRouter.post('/login', loginHandler);
facultyRouter.get('/getFaculty',facultyAuthMiddleware,getFaculty);
facultyRouter.get('/getStudent',facultyAuthMiddleware,getStudent);

export default facultyRouter;

