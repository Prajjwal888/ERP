import express from 'express';
import {loginHandler} from '../controllers/admin.js';
const adminroute = express.Router();

adminroute.post('/login', loginHandler);

export default adminroute;

