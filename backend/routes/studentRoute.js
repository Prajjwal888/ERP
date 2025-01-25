import express from 'express';
import {loginHandler} from '../controllers/student.js';
const studentRouter = express.Router();

studentRouter.post('/login', loginHandler);

export default studentRouter ;

