import express from 'express';
import {loginHandler} from '../controllers/faculty.js';
const facultyroute = express.Router();

facultyroute.post('/login', loginHandler);

export default facultyroute;

